"use strict"

angular.module('imaginationKick', [
    'tagFolders',
    'imgUtils',
    'ngResource',
  //'ngRoute'
]).controller('mainController', [
    'ImageFactory', '$scope', function(ImageFactory, $scope) {
        $scope.imageList = ImageFactory.query();
    }
]);

