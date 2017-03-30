'use strict';

// src/services/doctor/hooks/userToUserId.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    //console.log('hook userId');
    //console.log(hook.app);
    console.log(hook.result.doctor.dataValues.id);

    const availabilitiesService = hook.app.service('/api/v1/doctors/:doctor_id/availabilities');
    availabilitiesService.create({}, {
      doctor_id: hook.result.doctor.dataValues.id
    });

    hook.updateAvailabilies = true;
  };
};
