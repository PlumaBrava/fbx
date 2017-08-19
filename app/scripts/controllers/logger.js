'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:LoggerCtrl
 * @description
 * # LoggerCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')

  .controller('LoggerCtrl',['firebase', function (firebase) {

// var ref = new Firebase("https://logistica-144918.firebaseio.com");
// this.data = $firebaseObject(ref);
// this waits for the data to load and then logs the output. Therefore,
// data from the server will now appear in the logged output. Use this with care!
// var t=this;
// this.data.$loaded()
//   .then(function() {
//     console.log(t.data);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

    // console.log(" firebaseOject: "+ $firebaseOject);
    // console.log(" firebaseArray: "+ $firebaseArray);
    // console.log(" firebaseAuth: "+ $firebaseAuth);
    var err="";
    var self=this;

  var config = {
    apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
    authDomain: "logistica-144918.firebaseapp.com",
    databaseURL: "https://logistica-144918.firebaseio.com",
    projectId: "logistica-144918",
    storageBucket: "logistica-144918.appspot.com",
    messagingSenderId: "378485183737"
  };
  this.ref=firebase.initializeApp(config);

 console.log(this.ref);

this.passwordLogin=function(email, password){
    console.log("passwordLogin");
    console.log("email "+ email);
    console.log("password "+ password);
// var email="pepe@gm2ail.com";
// var password="12341234aa";



    this.ref.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log("error: "+errorMessage);
   self.err=errorMessage;
  })
    .then(function(CallBackuser){
          console.log(CallBackuser);
          if(CallBackuser){
        var user = firebase.auth().currentUser;
    console.log("CallBackuser: "+CallBackuser.email);
    console.log("user mail: "+user.email);
    console.log("user uid: "+user.uid);
    // console.log(user);
        self.readUser(user.uid);
            self.readPerfil(user.uid);
  }
    });
};


this.createAccount=function(email, password,confirm){
 console.log("createAccount");
     console.log("email "+ email);
    console.log("password "+ password);
    console.log("confirm "+ confirm);
self.err = null;
      if( !password) {
        self.err = 'Please enter a password';
      }
      else if( password !== confirm ) {
        self.err = 'Passwords do not match';
      }
      else {
    this.ref.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("error: "+errorMessage);
          self.err=errorMessage;
          })
            .then(function(CallBackuser){
            console.log(CallBackuser);
            if(CallBackuser){
            var user = firebase.auth().currentUser;
            console.log("CallBackuser: "+CallBackuser.email);
            console.log("user mail: "+user.email);
  //          console.log(user);

            }
            });
      };


        // Auth.$createUser({email: email, password: pass})
        //   .then(function () {
        //     // authenticate so we have permission to wruite to Firebase
        //     return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
        //   })
        //   .then(createProfile)
        //   .then(redirect, showError);
      };




this.loginFacebook=function(){
    console.log("clickFacebook ");
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
          'display': 'popup'
        });

this.ref.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  console.log("token: "+token);
  // The signed-in user info.
  var user = result.user;
  console.log("user: "+user);
  // ...
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

    console.log("error: "+errorMessage+"-"+email+credential);
  // ...
});


};



this.readUser=function(userID){
  console.log("User function");
  // Get a reference to the database service
var database = firebase.database();
var ref = database.ref('users/');
ref.on('value', function(snapshot) {
  console.log("User");
  console.log(snapshot.val());
  // updateStarCount(postElement, snapshot.val());
});
};

this.readPerfil=function(userID){
  console.log("Perfil function");
  // Get a reference to the database service
  var database = firebase.database();
  var ref = database.ref('user-perfil/'+userID);
  ref.on('value', function(snapshot) {
  console.log("Perfil");
  console.log(snapshot.val());
  // updateStarCount(postElement, snapshot.val());
    });
};

  }]);
