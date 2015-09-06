'use strict';

var Percolator = require('percolator').Percolator;
var dbSession  = require('./dbSessions.js');

module.exports = function(port) {
  var server = new Percolator( {'port': port, 'autoLink': false} );

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

  return server;
};
