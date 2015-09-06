'use strict';

// detect current environment

(function() {
  var env = (process.env.KW_ENV ? process.env.KW_ENV : 'test');

  if (!(env === 'test' || env === 'dev' || env === 'production')) {
    throw new Error('"' + env + '" is not an allowed environment');
  }

  module.exports = env;
})();
