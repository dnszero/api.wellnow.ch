'use strict';

const JSONAPISerializer = require('jsonapi-serializer').Serializer;

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.jsonapiSerialize = function (opts) {
  return function(hook) {
    //console.log(hook.result.data[25].$options.include);

    let modelName, attributes;

    //Define attributes
    if (opts && opts.attributes) {
      attributes = opts.attributes;
    } else {
      if (hook.result.data) {
        attributes = hook.result.data[0].$options.attributes;
      } else {
        attributes = hook.result.$options.attributes;
      }
    }

    //console.log(hook.result.data);
    if (opts && opts.modelName) {
      modelName = opts.modelName;
    } else if (hook.result.data) {
      modelName = hook.result.data[0].$modelOptions.name.plural;
    } else if (hook.result.$modelOptions) {
      modelName = hook.result.$modelOptions.name.plural;
    } else {
      modelName = hook.result[0].$modelOptions.name.plural;
    }

    const dataSerializer = new JSONAPISerializer(modelName, {
      attributes: attributes
    });

    /*if (hook.result.data) {
      hook.result = dataSerializer.serialize(hook.result.data);
    } else {
      hook.result.dataValues = dataSerializer.serialize(hook.result.dataValues);
    }*/

    if (hook.result.data) {
      //console.log(attributes);
      //console.log(hook.result.data);
      hook.result = dataSerializer.serialize(hook.result.data);
    } else if (hook.result.dataValues) {
      console.log(2);
      hook.result.dataValues = dataSerializer.serialize(hook.result.dataValues);
    } else {
      console.log(3);
      hook.result = dataSerializer.serialize(hook.result);
    }



    //console.log(serializedData);
  };
};
