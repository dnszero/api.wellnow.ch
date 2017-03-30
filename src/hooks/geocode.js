'use strict';

// src/services/objectToGeoloc/hooks/geocode.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};
const NodeGeocoder = require('node-geocoder');

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {

		if (hook.data.zipcode && hook.data.locality) {

			const _this = this;
			const geocoder = NodeGeocoder(hook.app.get('geocode_options'));
			let address, address2, zipcode, locality;

			console.log(hook.id);

			if (hook.id) {
				return _this.get(hook.id).then(function(obj) {

					console.log(obj);

					const objectToGeoloc = obj.dataValues.data.attributes;

					if (hook.data.address || hook.data.address === '') {
						address = hook.data.address;
					} else if (objectToGeoloc.address) {
						address = objectToGeoloc.address;
					} else {
						address = '';
					}

					console.log('Address: ' + address);

					if (hook.data.address2 || hook.data.address2 === '') {
						address2 = hook.data.address2;
					} else if (objectToGeoloc.address2) {
						address2 = objectToGeoloc.address2;
					} else {
						address2 = '';
					}

					if (hook.data.zipcode) {
						zipcode = hook.data.zipcode;
					} else if (objectToGeoloc.zipcode) {
						zipcode = objectToGeoloc.zipcode;
					} else {
						zipcode = '';
					}

					if (hook.data.locality) {
						locality = hook.data.locality;
					} else if (objectToGeoloc.locality) {
						locality = objectToGeoloc.locality;
					} else {
						locality = '';
					}

					if (address !== '' || zipcode !== '' || locality !== '') {
						//Genereate the whole address
						let fullAddress = '';
						if (zipcode !== '' || locality !== '') {
							fullAddress = zipcode + ' ' + locality;
						}

						if (address2 !== '') {
							fullAddress = address2 + ', ' + fullAddress;
						}

						if (address !== '') {
							fullAddress = address + ', ' + fullAddress;
						}

						console.log(fullAddress);

						//Geocode and get the first result
						return geocoder.geocode(fullAddress).then(function(res) {
							hook.data.latitude = res[0].latitude;
							hook.data.longitude = res[0].longitude;
							return hook;
						})
						.catch(function(err) {
							console.log(err);
						});
					}
				});
			} else {

				if (hook.data.address || hook.data.address === '') {
					address = hook.data.address;
				} else {
					address = '';
				}

				console.log('Address: ' + address);

				if (hook.data.address2 || hook.data.address2 === '') {
					address2 = hook.data.address2;
				} else {
					address2 = '';
				}

				if (hook.data.zipcode) {
					zipcode = hook.data.zipcode;
				} else {
					zipcode = '';
				}

				if (hook.data.locality) {
					locality = hook.data.locality;
				} else {
					locality = '';
				}

				if (address !== '' || zipcode !== '' || locality !== '') {
					//Genereate the whole address
					let fullAddress = '';
					if (zipcode !== '' || locality !== '') {
						fullAddress = zipcode + ' ' + locality;
					}

					if (address2 !== '') {
						fullAddress = address2 + ', ' + fullAddress;
					}

					if (address !== '') {
						fullAddress = address + ', ' + fullAddress;
					}

					console.log(fullAddress);

					//Geocode and get the first result
					return geocoder.geocode(fullAddress).then(function(res) {
						hook.data.latitude = res[0].latitude;
						hook.data.longitude = res[0].longitude;
						return hook;
					})
					.catch(function(err) {
						console.log(err);
					});
				}
			}
		} else {
			return hook;
		}
	};
};
