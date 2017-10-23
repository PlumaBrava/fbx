'use strict';

/**
 * @ngdoc service
 * @name fbxApp.fb
 * @description
 * # fb
 * Service in the fbxApp.
 */
angular.module('fbxApp')
  .service('fb',['$localStorage','firebase','$firebaseStorage', function (localStorage,firebase,$firebaseStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self=this;
    this.userKey;
    this.user;
    this.empresaKey;
    this.empresa;


    var config = {
    apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
    authDomain: "logistica-144918.firebaseapp.com",
    databaseURL: "https://logistica-144918.firebaseio.com",
    projectId: "logistica-144918",
    storageBucket: "logistica-144918.appspot.com",
    messagingSenderId: "378485183737"
  };

  this.ref=firebase.initializeApp(config);

  this.getRefFB=function(){
    return self.ref;
  };

this.modal_imagen_scope=null;
  this.getStorageRef= function (s,img) {
    self.modal_imagen_scope=s;
  // create a Storage reference for the $firebaseStorage binding
  var storageRef = firebase.storage().ref("practica/"+img.name);
  console.log("getStorageRef");

  // Child references can also take paths delimited by '/'
  // var spaceRef = storageRef.child(img.name);
  var storage = $firebaseStorage(storageRef);
  console.log(storageRef);
  console.log(storage.$getDownloadURL());
  // var file = // get a file from the template (see Retrieving files from template section below)
  storage.$getDownloadURL().then(function(url) {
    console.log(url);
     self.modal_imagen_scope.setURL(url);
  // $scope.setURL(url);
});
  var uploadTask = storage.$put(img);
  uploadTask.$progress(function(snapshot) {
  var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log(percentUploaded);
});
uploadTask.$complete(function(snapshot) {
  console.log(snapshot.downloadURL);
});
uploadTask.$error(function(error) {
  console.error(error);
});
return storage.$getDownloadURL();
};
// https://firebasestorage.googleapis.com/v0/b/logistica-144918.appspot.com/o/practica%2Fyeoman.png?alt=media&token=8ebc2253-0947-498c-adbb-6d468d037f34

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
         console.log('gettUserKey:'+self.userKey);
            if(this.isUserLog){
          return localStorage.userKey;
        }
        else{
       return self.userKey;
        };
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
