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
  // .module('fbxApp', ['ui.router','firebase', 'ngStorage','spotify', 'angularAudioRecorder', 'ui.bootstrap', 'dndLists'])
  .module('fbxApp', ['ui.router','firebase', 'ngStorage','spotify', 'angularAudioRecorder', 'dndLists'])
  // .config(['recorderServiceProvider', function(recorderServiceProvider){
  //       //configure here
  //     }]);
  // .module('fbcApp', ['ui.router'])
  .config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider,$urlRouterProvider,$locationProvider ){
// recorderServiceProvider
//       .forceSwf(false)
//       //.setSwfUrl('/lib/recorder.swf')
//       .withMp3Conversion(true)
//     ;

// $urlRouterProvider.otherwise('/');
// $urlRouterProvider.otherwise('/spotifycallback/');

$urlRouterProvider.rule(function ($injector, $location) {

       //what this function returns will be set as the $location.url
        var path = $location.path(), normalized = path.toLowerCase();
        console.log("$urlRouterProvider");
        console.log($location);
        console.log($location.url());
         // $location.url("/spotifycallback/"+$location.url().replace("#","?"));


          console.log($location.url().indexOf("access_token")); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf("token_type")); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf("expires_in")); // -1 si no le encuenta, de lo contrario da el lugar en el array

          if($location.url().indexOf("access_token")!=-1 && $location.url().indexOf("token_type")!=-1 && $location.url().indexOf("expires_in"))
            { $location.url("/spotifycallback/"+$location.url().replace("#","?"));};

        console.log(normalized);
        if (path != normalized) {
            //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
            // $location.replace().path(normalized);
        }
        // because we've returned nothing, no state change occurs
    });


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
    controller:'PerfilesCtrl as recordedInputa'
});

$stateProvider
.state('productos',{
    url:'/productos',
    templateUrl:'views/productos.html',
    controller:'ProductosCtrl as productos'
});

$stateProvider
.state('logout',{
    url:'/logout',
    templateUrl:'views/logout.html',
    controller:'LoggerCtrl as login'
});

$stateProvider
.state('timeline',{
    url:'/timeline',
    templateUrl:'views/timeline.html',
    controller:'DialogDemoCtrl'
});

$stateProvider
.state('tree',{
    url:'/tree',
    templateUrl:'views/tree.html'
    // controller:'LoggerCtrl as login'
});

$stateProvider
.state('dialogdemo',{
    url:'/dialogdemo',
    templateUrl:'views/dialogdemo.html'
    // controller:'LoggerCtrl as login'
});

$stateProvider
.state('dadlist',{
    url:'/dadlist',
    templateUrl:'views/dadlist.html',
    controller:'NestedListsDemoController'
});

$stateProvider
.state('spotifycallback',{
    // url:'/spotifycallback/',
    // url:'/spotifycallback/?access_token&token_type&expires_in',
    url:'/spotifycallback/?access_token&token_type&expires_in',
    templateUrl:'views/spotifycallback.html',
    resolve: {
    'urlFix': ['$location', function($location){
      console.log(" resolve");
      console.log($location.url());
        $location.url($location.url().replace("#","?"));
     }]
   }
    // ,
    // controller:'SpotifycallbackCtrl as sp'
});
//  console.log(" resolve location");
// console.log($location.url());

// // $locationProvider.html5Mode(true);
// $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: false
// });


$stateProvider
.state('practica',{
    url:'/practica',
    templateUrl:'views/practica.html',
    controller:'PracticaCtrl as practica'
});


  }])

  ;
