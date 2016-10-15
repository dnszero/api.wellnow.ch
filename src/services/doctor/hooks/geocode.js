'use strict';

// src/services/doctor/hooks/geocode.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};
const NodeGeocoder = require('node-geocoder');

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const geocoder = NodeGeocoder(hook.app.get('geocode_options'));
    console.log(hook.data);

    
    if (hook.data.address || hook.data.zipcode || hook.data.locality) {
    	//Genereate the whole address
		let fullAddress = '';
      	if (hook.data.zipcode || hook.data.locality) {
			fullAddress = hook.data.zipcode + ' ' + hook.data.locality;
      	}
		
		if (hook.data.address2) {
			fullAddress = hook.data.address2 + ', ' + fullAddress;
		}

		if (hook.data.address) {
			fullAddress = hook.data.address + ', ' + fullAddress;
		}
		
		//Geocode and get the first result
		return geocoder.geocode(fullAddress).then(function(res) {
			hook.data.latitude = res[0].latitude;
			hook.data.longitude = res[0].longitude;
		})
		.catch(function(err) {
			console.log(err);
		});
    }
  };
};
