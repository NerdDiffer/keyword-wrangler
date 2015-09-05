'use strict';

var async = require('async');

module.exports = function(dbSession, callback) {
  async.series([
    // TODO: refactor the two following methods
    function(callback) {
      dbSession.remove('keyword', '1', function(err) {
        callback(err);
      });
    },
    function(callback) {
      dbSession.remove('category', '1', function(err) {
        callback(err);
      });
    },
  ], function(err, results) {
    callback(err);
  });
};
