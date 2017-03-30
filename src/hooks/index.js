'use strict';

const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

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

exports.jsonapiSerialize = function (modelName, opts) {
  return function(hook) {

    const dataSerializer = new JSONAPISerializer(modelName, opts);

    if (hook.result && hook.result.data) {
      hook.result = dataSerializer.serialize(hook.result.data);
    } else if (hook.result && hook.result.dataValues) {
      hook.result.dataValues = dataSerializer.serialize(hook.result.dataValues);
      //hook.result.dataValues = dataSerializer.serialize(hook.result.dataValues);
    } else if (hook.result) {
      hook.result = dataSerializer.serialize(hook.result);
    }
  };
};

exports.jsonapiDeserialize = function (opts) {
  return function(hook) {
    return new Promise(function(resolve, reject) {
      console.log(hook.data);
      return new JSONAPIDeserializer(opts).deserialize(hook.data, function (err, data) {
        console.log(data);
        hook.data = data;
        resolve(hook);
      });
    });
  };
};

exports.addUserIdToQueryParams = function (opts) {
  return function(hook) {
    return new Promise(function(resolve, reject) {
      console.log('Extract User Id');
      console.log(hook.params);
      hook.params.query.userId = hook.params.payload.userId;
      resolve(hook);
      /*return new JSONAPIDeserializer(opts).deserialize(hook.data, function (err, data) {
        console.log(data);
        hook.data = data;
        resolve(hook);
      });*/
    });
  };
};
