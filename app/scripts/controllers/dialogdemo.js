'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:DialogdemoCtrl
 * @description
 * # DialogdemoCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
.controller('DialogDemoCtrl', function ($scope, $timeout, Items) {
console.log('DialogDemoCtrl');
   buildEmptyTree();


    $scope.selectedNode = "";



 function buildEmptyTree() {
console.log('buildEmptyTree');
    Items.getJson('aaa.json').then(function(result) {
               $scope.displayTree = result;
               console.log('aaa.json');
               console.log(result);
            }, function(result) {
                  console.log('aaa.json No data returned"');
           alert("Error: No data returned", result);
            });


    }

});
