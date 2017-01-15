'use strict';

const hooks = require('./hooks');
const algoliasearch = require('algoliasearch');
const service = require('feathers-sequelize');
const moment = require('moment');

module.exports = function(){
  const app = this;
  const models = app.get('models');
  const algoliaClient = algoliasearch(app.get('algolia_options').app_id, app.get('algolia_options').apikey);
  const index = algoliaClient.initIndex(app.get('algolia_options').indice);

  // Initialize our service with any options it requires
  app.use('/api/v1/search', {

    find(params) {
      return Promise.resolve([]);
    },

    get(id, params) {
      return Promise.resolve({
        id, text: `A new message with ID: ${id}!`
      });
    },

    create(data, params) {

      console.log(data.datefrom);
      console.log(data.dateto);
      console.log(moment.unix(data.datefrom).format('YYYY-MM-DD'));
      console.log(moment.unix(data.dateto).format('YYYY-MM-DD'));

      return models.searches.create({
        location: data.location,
        lat: data.lat,
        lng: data.lng,
        dateFrom: moment.unix(data.datefrom).format('YYYY-MM-DD'),
        dateTo: moment.unix(data.dateto).format('YYYY-MM-DD'),
        categoryId: data.category
      }).then(function(search) {
        return index.search('', {
          aroundLatLng: data.lat + ', ' + data.lng,
          getRankingInfo: true,
          filters: 'doctor.categories.id=' + data.category + ' AND date>=' + data.datefrom + ' AND date<' + data.dateto,
          hitsPerPage: 20
        })
        .then(function searchSuccess(content) {
          content.id = search.id;
          console.log(content);
          content.hits = content.hits.map(function(hit) {
            const rObj = hit;
            rObj.rankingInfo = rObj._rankingInfo;
            return rObj;
          });
          return content;
        })
        .catch(function searchFailure(err) {
          console.error(err);
        });
      });
    },

    update(id, data, params) {
      return Promise.resolve(data);
    },

    patch(id, data, params) {
      return Promise.resolve(data);
    },

    remove(id, params) {
      return Promise.resolve({ id });
    }
  });

  // Get our initialize service to that we can bind hooks
  const searchService = app.service('/api/v1/search');

  // Set up our before hooks
  searchService.before(hooks.before);

  // Set up our after hooks
  searchService.after(hooks.after);
};
