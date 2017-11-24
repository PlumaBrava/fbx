'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:LoggerCtrl
 * @description
 * # LoggerCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')

  .controller('LoggerCtrl',['firebase','$state','fb','$localStorage','$scope',function (firebase,$state,fb,localStorage,$scope) {

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
    $scope.err=null;
    var self=this;

  // var config = {
  //   apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
  //   authDomain: "logistica-144918.firebaseapp.com",
  //   databaseURL: "https://logistica-144918.firebaseio.com",
  //   projectId: "logistica-144918",
  //   storageBucket: "logistica-144918.appspot.com",
  //   messagingSenderId: "378485183737"
  // };
  // this.ref=firebase.initializeApp(config);

 console.log(this.ref);

console.log("userKey");
console.log(localStorage.userKey);
console.log(localStorage.user);

console.log("empresa");
console.log(localStorage.empresaKey);
console.log(localStorage.empresa);





 // console.log($state.current);

this.passwordLogin=function(email, password){

    console.log("passwordLogin");
    console.log("email "+ email);
    console.log("password "+ password);
   if (fb.isUserLog()){
       $state.go('practica');
    }else {

      if( !email) {

        $scope.err = 'Please enter a email';

      }
      else if( !password) {

        $scope.err = 'Passwords nullo';

          };
    fb.getRefFB().auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
   $scope.$apply(function () {
  console.log("error: "+errorMessage);
   $scope.err=errorMessage;
  });
  })
    .then(function(CallBackuser){
          console.log(CallBackuser);
          if(CallBackuser){
        var user = firebase.auth().currentUser;
    console.log("CallBackuser: "+CallBackuser.email);
    console.log("user mail: "+user.email);
    console.log("user uid: "+user.uid);
    console.log(user);
    // console.log(user);

      fb.setUserKey(user.uid);
        fb.setUser(user.email);
        self.readUser(user.uid);
        self.readPerfil(user.uid);
  }
    });
  };
};


this.createAccount=function(email, password,confirm){
 console.log("createAccount");
     console.log("email "+ email);
    console.log("password "+ password);
    console.log("confirm "+ confirm);
// $scope.err = null;
$scope.err = "crear cuenta";
      if( !password) {
           $scope.$apply(function () {
        $scope.err = 'Please enter a password';
       } );
      }
      else if( password !== confirm ) {
        $scope.$apply(function () {
        $scope.err = 'Passwords do not match';
       } );
      }
      else {
    fb.getRefFB().auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("error: "+errorMessage);
          $scope.err="error: "+errorMessage;
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
       if (fb.isUserLog()){

       $state.go('practica');
    }else {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
          'display': 'popup'
        });
        fb.getRefFB().auth().signInWithPopup(provider).then(function(result) {
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
            $scope.err="error: "+errorMessage+"-"+email+credential;
          // ...
        });
      };
};


this.loginGoogle=function(){
    console.log("login Google ");
    if (fb.isUserLog()){
       $state.go('practica');
    }else {

    var provider =new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
        });


      fb.getRefFB().auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user: "+user.uid);
        console.log(user);
        fb.setUserKey(user.uid);
        fb.setUser(user.displayName);

        self.readUser(user.uid);


        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
          console.log("error: "+errorMessage+"-"+email+credential);
      $scope.err="error: "+errorMessage+"-"+email+credential;
        // ...
      });
    };
};



this.readUser=function(userID){
  console.log("readUser");
  // Get a reference to the database service
var database = firebase.database();
var ref = database.ref('users/'+userID);
ref.on('value', function(snapshot) {
  console.log("User");
  var u=snapshot.val()
  console.log(u);
  // fb.setUserKey(userID);
  // fb.setUser(u);
$state.go('mispracticas');
  // self.readUserEmpresa(userID);

  // updateStarCount(postElement, snapshot.val());
});
};

this.readPerfil=function(userID){
  console.log("readPerfil");
  // Get a reference to the database service
  var database = firebase.database();
  var ref = database.ref('user-perfil/'+userID);
  ref.on('value', function(snapshot) {
  console.log("Perfil");
  console.log(snapshot.val());
  // updateStarCount(postElement, snapshot.val());
    });
};

this.readUserEmpresa=function(userID){
  console.log("readUserEmpresa");
  // Get a reference to the database service
  var database = firebase.database();
  var ref = database.ref('user-empresa/'+userID);
  ref.on('value', function(snapshot) {
     console.log(snapshot.val());
     snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      fb.setEmpresaKey(childKey);
      fb.setEmpresa(childData);
          $state.go('practica');
    });
 });
}; //end readUserEmpresa



  }])
;

