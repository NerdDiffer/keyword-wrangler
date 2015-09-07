'use strict';

(function() {
  var app = angular.module('app');

  app.controller('KeywordsController', function($scope, RepositoryFactory, resolveEntity) {
    /* Initialize Front End */

    // This happens immediately upon page load
    $scope.resolveEntity = resolveEntity;

    // Connect controller to back-end APIs for keyword-categories & keywords
    var KeywordCategoriesRepo = new RepositoryFactory({
      endpoint: 'keywords/categories',
      retrieveItems: function(data) {
        return data._items;
      }
    });

    var KeywordsRepo = new RepositoryFactory({
      endpoint: 'keywords',
      retrieveItems: function(data) {
        return data._items;
      }
    });

    // Immediately load all keyword-categories & categories from API
    // upon page load
    KeywordCategoriesRepo.readAll()
      .then(function(keywordCategories) {
        $scope.keywordCategories = keywordCategories;
        KeywordsRepo.readAll()
          .then(function(keywords) {
            $scope.keywords = keywords;
          });
      });

    // The grid
    $scope.keywordsGridOptions = {
      // use the data from `$scope.keywords`
      data: 'keywords',
      // if true, break cell edits with the 'select' element
      enableCellSelection: false,
      enableCellEdit: true,
      keepLastSelected: false,
      enableRowSelection: false,
      multiSelect: false,
      enableSorting: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      showFilter: false,
      rowHeight: '40',
      columnDefs: [
        {
          field: 'id',
          displayName: 'ID',
          enableCellEdit: false,
          width: '80px'
        },
        {
          field: 'value',
          displayName: 'Value'
        },
        {
          field: 'keywordCategoryID',
          displayName: 'Category',
          cellTemplate: 'app/keywords/partials/keywordCategoryGridCell.html',
          editableCellTemplate: 'app/keywords/partials/keywordCategoryGridCellEditor.html'
        },
        {
          field: '',
          displayName: 'Operations',
          cellTemplate: 'app/keywords/partials/operationsGridCell.html',
          enableCellEdit: false,
          sortable: false
        }
      ]
    };

    /* Front-end Operations & Interactions */

    $scope.createKeyword = function(newKeyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');

      if (newKeyword.value.length > 0) {
        KeywordsRepo.createOne(newKeyword)
          .then(function() {
            KeywordsRepo.readAll()
              .then(function(keywords) {
                $scope.keywords = keywords;
              });
          });
      }
    };

    $scope.updateKeyword = function(keyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepo.updateOne(keyword);
    };

    $scope.deleteKeyword = function(keyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepo.deleteOne(keyword)
        .then(function() {
          KeywordsRepo.readAll()
            .then(function(keywords) {
              $scope.keywords = keywords;
            });
        });
    };

    $scope.stopEditingKeywordCategory = function() {
      $scope.$broadcast('ngGridEventEndCellEdit');
    };

    $scope.$on('ngGridEventRows', function(newRows) {
      $scope.$broadcast('ngGridEventEndCellEdit');
    });

  });

})();
