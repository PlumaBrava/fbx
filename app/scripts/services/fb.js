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

// <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk",
//     authDomain: "practicas-5bd5b.firebaseapp.com",
//     databaseURL: "https://practicas-5bd5b.firebaseio.com",
//     projectId: "practicas-5bd5b",
//     storageBucket: "",
//     messagingSenderId: "796645806481"
//   };
//   firebase.initializeApp(config);
// </script>




  //   var config = {
  //   apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
  //   authDomain: "logistica-144918.firebaseapp.com",
  //   databaseURL: "https://logistica-144918.firebaseio.com",
  //   projectId: "logistica-144918",
  //   storageBucket: "logistica-144918.appspot.com",
  //   messagingSenderId: "378485183737"
  // };

  var config = {
    apiKey: "AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk",
    authDomain: "practicas-5bd5b.firebaseapp.com",
    databaseURL: "https://practicas-5bd5b.firebaseio.com",
    projectId: "practicas-5bd5b",
    storageBucket: "",
    messagingSenderId: "796645806481"
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
        console.log(self.user);
          if(this.isUserLog){
                    return localStorage.user;
                  }
                  else{

                return   self.user;
          };
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


//  Firebase



this.writePractica=function(userKey, model,propiedades) {
  console.log('writePractica');
  console.log(userKey);
  // console.log(model);
  console.log(propiedades);
  // Get a key for a new Post.

var misPracticasRef = firebase.database().ref('Mispracticas/' + userKey+"/lista");
misPracticasRef.once('value', function(snapshotMisPracticas) {
  console.log("snapshotMisPracticas");
  console.log(snapshotMisPracticas);
  var newPracticaKey = firebase.database().ref().child('practicas').push().key;
  var a={practica:JSON.parse( model),Propiedades:propiedades};
  firebase.database().ref('practicas/' + userKey+'/'+newPracticaKey). set(a).then(function(ret){

    console.log("PromesaPractica");
    console.log(ret);
    console.log(snapshotMisPracticas)
    var listaPracticas=[];
    propiedades.userKey=userKey;
    propiedades.practicasKey=newPracticaKey;
    if(snapshotMisPracticas.hasChildren()){

    console.log("snapshotMisPracticas tiene hijos ");
    console.log(snapshotMisPracticas.val());
    listaPracticas=snapshotMisPracticas.val().concat(propiedades);
    }
    else{
      listaPracticas.push(propiedades);
      console.log("snapshotMisPracticas sin hijos ");
    }

    console.log("listaPracticas");
    console.log(listaPracticas);
    firebase.database().ref('Mispracticas/' + userKey). set({lista:listaPracticas}).then(
      function(a){
        console.log("Escritura Mis Practicas");
        console.log(a);
      }
      ).catch(function(error){
        console.log("Error Escritura Mis Practicas");
        console.log(error);
      });
  });

});
};

// lleer Mis Practicas

this.leerMisPracticas=function(userKey) {
  console.log('leerMisPractica');
  console.log(userKey);

var misPracticasRef = firebase.database().ref('Mispracticas/' + userKey+"/lista");

return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa leerMisPracticas");






misPracticasRef.once('value', function(snapshotMisPracticas) {
  console.log("snapshotMisPracticas");
  console.log(snapshotMisPracticas);

    if(snapshotMisPracticas.hasChildren()){

    console.log("snapshotMisPracticas tiene hijos ");
    console.log(snapshotMisPracticas.val());
    resolve({ value: "fin leerMisPracticas con hijos", result: snapshotMisPracticas.val()});

    }
    else{
    console.log("snapshotMisPracticas sin hijos ");

     reject({ value: "fin leerMisPracticas sin hijos", result: null});

    }
});

});
};

// lleer Mis Practicas

this.leerUnaPractica=function(datosPractica) {
  console.log('leerUnaPractica');
  console.log(datosPractica);
  var userKey=datosPractica.userKey;
  var practicaKey=datosPractica.practicasKey;

var practicasRef = firebase.database().ref('practicas/' + userKey+"/"+practicaKey+"/practica");

return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa leerUNAPracticas");


practicasRef.once('value', function(snapshotUnaPracticas) {
  console.log("snapshotUnaPracticas");
  console.log(snapshotUnaPracticas);

    if(snapshotUnaPracticas.hasChildren()){

    console.log("snapshotUnaPracticas tiene hijos ");
    console.log(snapshotUnaPracticas.val());
    resolve({ value: "fin leerUnaPracticas con hijos", result: snapshotUnaPracticas.val()});

    }
    else{
    console.log("snapshotUnaPracticas sin hijos ");

     reject({ value: "fin leerUnaPracticas sin hijos", result: null});

    }
});

});
};


////

  }]);
