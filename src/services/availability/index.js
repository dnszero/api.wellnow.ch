'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');
const algoliasearch = require('algoliasearch');
const moment = require('moment');
const Immutable = require('immutable');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  // Initialize our service with any options it requires
  app.use('/api/v1/doctors/:doctor_id/availabilities', {
    create(data, params) {
      data.doctor_id = params.doctor_id;

      const algoliaClient = algoliasearch(app.get('algolia_options').app_id, app.get('algolia_options').apikey);
      const index = algoliaClient.initIndex(app.get('algolia_options').indice);

      //return the doctor model
      return models.doctors.findById(data.doctor_id, {
        include: [
          { model: models.categories },
          { model: models.openings },
        ]
      }).then(function(doctor) {
        //Will create an entry in the index for each of the next 30 days
        const doctors = [];
        const startDate = moment().add(1, 'days');
        const endDate = moment().add(31, 'days');
        const cleanDoctor = doctor.dataValues;
        const openings = [];

        //Group openings by date of the day
        cleanDoctor.openings.forEach(function(opening) {
          if (!openings[opening.dataValues.dayOfWeek]) {
            openings[opening.dataValues.dayOfWeek] = [];
          }
          openings[opening.dataValues.dayOfWeek].push(opening.dataValues);
        });

        //Add categories
        if (cleanDoctor.categories) {
          cleanDoctor.categories = cleanDoctor.categories.map(function(cat) {
            return {id: cat.dataValues.id};
          });
        } else {
          cleanDoctor.categories = null;
        }

        //Add availabilities and opening for each day
        let obj, openingStartTime, openingEndTime, availabilityStartTime, availabilityEndTime;
        for(let date = moment(startDate); date.diff(endDate) < 0; date.add(1, 'days')) {
          //If there're openings for the day
          if (openings[date.day()]) {
            obj = cleanDoctor;

            //Define the object ID based on doctor's id and the date of the day
            obj.objectID = obj.id + '_' + moment(date).format('YYYYMMDD');

            //Add the timestamp for the day
            obj.date = moment(date).unix();

            obj.openings = [];
            obj.availabilities = [];
            //Parse each opening and add availabilies in it
            for (let opening of openings[date.day()]) {
              obj.openings.push(opening);

              //Every 15 minutes, create a new availability
              openingEndTime = moment(date.format('YYYY-MM-DD') + ' ' + opening.openingTo);
              availabilityStartTime = moment(date.format('YYYY-MM-DD') + ' ' + opening.openingFrom);
              availabilityEndTime = moment(availabilityStartTime).add(1, 'hours');

              do {
                obj.availabilities.push({
                  startDate: availabilityStartTime.unix(),
                  endDate: availabilityEndTime.unix()
                });

                availabilityStartTime.add(15, 'minutes');
                availabilityEndTime.add(15, 'minutes');

              } while (availabilityEndTime.diff(openingEndTime, 'minutes') < 15);
            }

            doctors.push(Immutable.Map(obj));
          }
        }

        //Add all items to the index
        return index.addObjects(doctors, function(err, content) {
          console.log(content);
        });
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const availabilityService = app.service('/api/v1/doctors/:doctor_id/availabilities');

  // Set up our before hooks
  availabilityService.before(hooks.before);

  // Set up our after hooks
  availabilityService.after(hooks.after);
};
