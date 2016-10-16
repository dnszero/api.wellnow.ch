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
		if (!hook.data.latitude && !hook.data.longitude) {
			const _this = this;
			const geocoder = NodeGeocoder(hook.app.get('geocode_options'));
			console.log(hook.result);

			const id = hook.result.dataValues.data.id;
			const doctor = hook.result.dataValues.data.attributes;

			
			if (doctor.address || doctor.zipcode || doctor.locality) {
				//Genereate the whole address
				let fullAddress = '';
				if (doctor.zipcode || doctor.locality) {
					fullAddress = doctor.zipcode + ' ' + doctor.locality;
				}
				
				if (doctor.address2) {
					fullAddress = doctor.address2 + ', ' + fullAddress;
				}

				if (doctor.address) {
					fullAddress = doctor.address + ', ' + fullAddress;
				}

				console.log(fullAddress);
				
				//Geocode and get the first result
				return geocoder.geocode(fullAddress).then(function(res) {
					return _this.patch(id, {latitude: res[0].latitude, longitude: res[0].longitude});
				})
				.catch(function(err) {
					console.log(err);
				});
			}
		} else {
			return true;
		}
	};
};
