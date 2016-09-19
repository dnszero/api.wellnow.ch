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

exports.jsonapiSerialize = function (type, opts) {
  return function(hook) {
    //console.log(hook.result);

    let modelName, attributes;

    if (hook.result.data) {
      modelName = hook.result.data[0].$modelOptions.name.plural;
      attributes = hook.result.data[0].$options.attributes;
    } else {
      modelName = hook.result.$modelOptions.name.plural;
      attributes = hook.result.$options.attributes;
    }

    const dataSerializer = new JSONAPISerializer(modelName, {
      attributes: attributes
    });

    if (hook.result.data) {
      hook.result = dataSerializer.serialize(hook.result.data);
    } else {
      hook.result.dataValues = dataSerializer.serialize(hook.result.dataValues);
    }



    //console.log(serializedData);
  };
};
