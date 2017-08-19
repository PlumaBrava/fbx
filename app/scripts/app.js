'use strict';

/**
 * @ngdoc overview
 * @name fbxApp
 * @description
 * # fbxApp
 *
 * Main module of the application.
 */
// angular
//   .module('fbxApp', []);

  angular
  .module('fbxApp', ['ui.router','firebase'])
  // .module('fbcApp', ['ui.router'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

$urlRouterProvider.otherwise('/');

$stateProvider
.state('login',{
    url:'/login',
    templateUrl:'views/login.html',
    controller:'LoggerCtrl as login'
});

$stateProvider
.state('home',{
    url:'/',
    templateUrl:'views/main.html',
    controller:'MainCtrl as main'
});

$stateProvider
.state('perfiles',{
    url:'/perfiles',
    templateUrl:'views/perfiles.html',
    controller:'PerfilesCtrl as perfiles'
});

  }]);
