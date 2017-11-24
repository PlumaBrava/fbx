'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('LogoutCtrl',['$localStorage','$state', function (localStorage,$state) {


  this.logOut=function(){

console.log("userKey");
console.log(localStorage.userKey);
console.log(localStorage.user);

console.log("empresa");
console.log(localStorage.empresaKey);
console.log(localStorage.empresa);

delete localStorage.userKey;
delete localStorage.user;
delete localStorage.empresaKey;
delete localStorage.empresa;

console.log("userKey");
console.log(localStorage.userKey);
console.log(localStorage.user);

console.log("empresa");
console.log(localStorage.empresaKey);
console.log(localStorage.empresa);
$state.go('login');
};
  }]);
