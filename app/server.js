'use strict';

var path       = require('path');
var Percolator = require('percolator').Percolator;
var dbSession  = require('./dbSession.js');

module.exports = function(port) {
  var server = new Percolator({
    'port': port,
    'autoLink': false,
    'staticDir': path.resolve(path.join(__dirname, '..', 'public'))
  });

  // get all the keywords
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
    },

    /* jshint shadow:true */

    // create a new keyword object
    POST: function(req, res) {
      req.onJson(function(err, newKeyword) {
        if (err) {
          console.log(err);
          res.status.internalServerError(err);
        } else {
          dbSession.query(
            'INSERT INTO keyword (value, categoryID) VALUES (?, ?);',
            [newKeyword.value, newKeyword.categoryID],
            function(err, result) {
              if (err) {
                console.log(err);
                res.status.internalServerError(err);
              } else {
                res.object({
                  'status': 'ok',
                  'id': result.insertId
                }).send();
              }
            }
          );
        }
      });
    }
  });

  server.route('/api/keywords/categories', {
    // get all the keyword-categories
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

  // This route needs to come after route for '/api/keywords/categories'.
  // Otherwise, the 'categories' would be interpreted as ':id'

  server.route('/api/keywords/:id', {
    // update a keyword record
    POST: function(req, res) {

      var keywordId = req.uri.child();

      req.onJson(function(err, keyword) {
        if (err) {
          console.log(err);
          res.status.internalServerError(err);
        } else {
          dbSession.query(
            'UPDATE keyword SET value = ?, categoryID = ? WHERE keyword.id = ?;',
            [keyword.value, keyword.categoryID, keywordId],
            function(err, result) {
              if (err) {
                console.log(err);
                res.status.internalServerError(err);
              } else {
                res.object({ 'status': 'ok' }).send();
              }
            }
          );
        }
      });
    },

    // remove a keyword record
    DELETE: function(req, res) {

      var keywordId = req.uri.child();

      dbSession.query(
        'DELETE FROM keyword WHERE keyword.id = ?;',
        [keywordId],
        function(err, result) {
          if (err) {
            console.log(err);
            res.status.internalServerError(err);
          } else {
            res.object({ 'status': 'ok' }).send();
          }
        }
      );
    }
  });

  return server;

};
