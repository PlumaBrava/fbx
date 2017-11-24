'use strict';

/**
 * @ngdoc directive
 * @name fbxApp.directive:ngFileSelect
 * @description
 * # ngFileSelect
 */
angular.module('fbxApp')
  .directive('ngFileSelect', function () {

return {
    link: function($scope,el){

      el.bind("change", function(e){
        console.log("ngFileSelect");
        console.log($scope);
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })

    }

  };


  });
