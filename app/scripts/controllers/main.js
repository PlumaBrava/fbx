'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('MainCtrl', ['$stateParams', '$state', function ($stateParams, $state) {

var msg = new SpeechSynthesisUtterance('Hola Juan');
window.speechSynthesis.speak(msg);


console.log($stateParams);
console.log('$state');
console.log($state);
 console.log('$state.current');
 console.log($state.current);
// $state.go('login');
  }]);
