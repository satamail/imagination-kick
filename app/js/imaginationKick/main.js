"use strict"

angular.module('imaginationKick', [
    'tagFolders',
    'imgUtils',
    'ngResource',
  //'ngRoute'
]).controller('mainController', [
    'CardFactory', '$scope', function(CardFactory, $scope) {
        $scope.CardList = CardFactory.query();
    }
]);

