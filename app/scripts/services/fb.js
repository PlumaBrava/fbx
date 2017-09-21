'use strict';

/**
 * @ngdoc service
 * @name fbxApp.fb
 * @description
 * # fb
 * Service in the fbxApp.
 */
angular.module('fbxApp')
  .service('fb',['$localStorage', function (localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self=this;
    this.userKey;
    this.user;
    this.empresaKey;
    this.empresa;

    this.setUserKey=function(key){
         console.log('fb-user key');
         console.log(key);
       self.userKey=key;
         localStorage.userKey=key;

    };

    this.setUser=function(user){
         console.log('fb-user ');
         console.log(user);
        localStorage.user=user;
        self.user=user;
    };

    this.setEmpresaKey=function(key){
        console.log('fb-empresa key ');
         console.log(key);
        localStorage.empresaKey=key;
        self.empresaKey=key;
    };

    this.setEmpresa=function(empresa){
        console.log('fb-empresa ');
        console.log(empresa);
        localStorage.empresa=empresa;
        self.empresa=empresa;
        console.log(self.empresa['ciudad']);
        console.log(self.empresa['codigoPostal']);

    };

////


  this.getUserKey=function(){
         console.log('gettUserKey'+self.userKey);
       return self.userKey;
    };

    this.getUser=function(){
        console.log('getUser');
      return   self.user;
    };

    this.getEmpresaKey=function(){
        console.log('getEmpresaKey');
       return self.empresaKey;
    };

    this.getEmpresa=function(){
        console.log('getEmpresa');
        return   self.empresa;

    };

////
this.isUserLog=function(){
if(localStorage.userKey&&localStorage.empresaKey)
  { console.log('log');
    return true;
  }
    else{
       console.log('Is not log');
      return false;};
};

////

  }]);
