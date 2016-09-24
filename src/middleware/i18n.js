'use strict';

module.exports = function() {
  return function(req, res, next) {
    req.query.languageId = req.headers['accept-language'];
    next();
  };
};
