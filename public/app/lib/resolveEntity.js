'use strict';

(function() {
  var app = angular.module('app');

  app.factory('resolveEntity', [resolveEntity]);

  /**
   * Helper, gets category names from the categoryID
   * Is used in the 'keywordCategoryGridCell' partial to display
   * keyword category names based on the keyword categoryID.
   */
  function resolveEntity() {
    return function(queryParams) {
      for (var i = 0; i < queryParams.from.length; i++) {
        if (queryParams.from[i][queryParams.where] === queryParams.is) {
          return queryParams.from[i][queryParams.what];
        }
      }
      return false;
    };
  }

})();
