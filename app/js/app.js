'use strict';

/* App Module */

angular.module('imaginationKick', [
    'tagFolders'
  //'ngRoute'
]).controller('mainController', [
    '$http', '$scope', function($http, $scope) {
        $scope.imageList = [];
        $http.get('/app/image/get').
          success(function(data, status, headers, config) {
            $scope.imageList = data;
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });
    }
]);

