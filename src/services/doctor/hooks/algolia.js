'use strict';

// src/services/doctor/hooks/algolia.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const algoliasearch = require('algoliasearch');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    console.log(hook.result);

    const algoliaClient = algoliasearch(hook.app.get('algolia_options').app_id, hook.app.get('algolia_options').apikey);
    const index = algoliaClient.initIndex(hook.app.get('algolia_options').indice);
    const objects = [];
    const cleanDoctor = hook.result.dataValues.data.attributes;

    //Geoloc for each doctor

    cleanDoctor.objectID = hook.result.dataValues.data.id;
    objects.push(cleanDoctor);

    index.addObjects(objects, function(err, content) {
      console.log(content);
    });
    hook.algolia = true;
  };
};
