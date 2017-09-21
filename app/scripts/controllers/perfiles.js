'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:PerfilesCtrl
 * @description
 * # PerfilesCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('PerfilesCtrl' ,['$element', 'recorderService', 'recorderUtils', '$scope', '$timeout', '$interval', 'recorderPlaybackStatus', function ($element, recorderService, recorderUtils, $scope, $timeout, $interval, recorderPlaybackStatus) {
  // // .controller('PerfilesCtrl', ['angularAudioRecorder',function (angularAudioRecorder) {
    console.log('navigator.watchPosition()');

    console.log(navigator);
    // console.log(navigator.getUserMedia());
    console.log(navigator.watchPosition);
    console.log("$scope");
    console.log($scope);
    console.log("this");
    console.log(this);
       console.log("recorderService");
    console.log(recorderService);
          console.log("recorderUtils");
    console.log(recorderUtils);
              console.log("$timeout");
    console.log($timeout);
              console.log("$interval");
    console.log($interval);
              console.log("recorderPlaybackStatus");
    console.log(recorderPlaybackStatus);
    // console.log($scope.recorder.audioModel);

this.f1=function(a){
      console.log('f1');
      console.log(a);
};
  }]
  ).config(function (recorderServiceProvider) {
    recorderServiceProvider
      // .forceSwf(false)
      //.setSwfUrl('/lib/recorder.swf')
      // .withMp3Conversion(true, 128)
    ;
 console.log("recorderServiceProvider: "+recorderServiceProvider);
    console.log(recorderServiceProvider);
// var wavesurfer = WaveSurfer.create({
//     container: '#waveform',
//     waveColor: 'violet',
//     progressColor: 'purple'
// });

// wavesurfer.on('ready', function () {
//     wavesurfer.play();
// });

// wavesurfer.load('/audio/flap.mp3');

  });

