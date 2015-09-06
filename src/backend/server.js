'use strict';

var path       = require('path');
var Percolator = require('percolator').Percolator;
var dbSession  = require('./dbSession.js');

module.exports = function(port) {
  var server = new Percolator({
    'port': port,
    'autoLink': false,
    'staticDir': path.resolve(path.join(__dirname, '../../', 'public'))
  });

  server.route('/api/keywords', {
    GET: function(req, res) {
      dbSession.fetchAll(
        'SELECT id, value, categoryID FROM keyword ORDER BY id',
        function(err, rows) {
          if (err) {
            console.log(err);
            res.status.internalServerError(err);
          } else {
            res.collection(rows).send();
          }
        }
      );
    }
  });

  server.route('/api/keywords/categories', {
    GET: function(req, res) {
      dbSession.fetchAll(
        'SELECT id, name FROM category ORDER BY id',
        function(err, rows) {
          if (err) {
            console.log(err);
            res.status.internalServerError(err);
          } else {
            res.collection(rows).send();
          }
        }
      );
    }
  });

  return server;
};
