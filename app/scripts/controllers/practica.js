'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:PracticaCtrl
 * @description
 * # PracticaCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('PracticaCtrl', ['$scope','comandos',function($scope,comandos) {
        console.log("PracticaCtrl");

    $scope.execute=function(){
        console.log("PracticaCtrl-execute");
        comandos.execute();

    };


  }]);
