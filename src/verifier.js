const { Verifier } = require('feathers-authentication-local');
const bcryptjs = require('bcryptjs');

class WellnowVerifier extends Verifier {
  _comparePassword(entity, password) {
    //var hash = entity[this.options.passwordField];
    //LR - Change hash to work with JSONApi
    var hash = entity.attributes.password;
    if (!hash) {
      return Promise.reject(new Error('\'' + this.options.entity + '\' record in the database is missing a \'' + this.options.passwordField + '\''));
    }

    return new Promise(function (resolve, reject) {
      bcryptjs.compare(password, hash, function (error, result) {
        // Handle 500 server error.
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(false);
        }

        return resolve(entity);
      });
    });
  }

  // The verify function has the exact same inputs and
  // return values as a vanilla passport strategy
  verify(req, username, password, done) {
    const _this = this;
    // do your custom stuff. You can call internal Verifier methods
    // and reference this.app and this.options. This method must be implemented.
    this.app.service('/api/v1/users').find({query: {email: username, '$limit': 1}}).then(function(user) {
      return _this._comparePassword(user.data[0], password);
    }).then(function (user) {
      const id = user.id;
      const payload = {userId: id};
      done(null, user, payload);
    }).catch(function (error) {
      return error ? done(error) : done(null, error);
    });
  }
}

module.exports = WellnowVerifier;
