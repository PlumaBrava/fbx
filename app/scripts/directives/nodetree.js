'use strict';

/**
 * @ngdoc directive
 * @name fbxApp.directive:nodeTree
 * @description
 * # nodeTree
 */
angular.module('fbxApp')
 .directive('nodeTree', function() {
      return {
        template: '<node ng-repeat="node in tree track by $index"></node>',
        replace: true,
        transclude: true,
        restrict: 'E',
        scope: {
          tree: '=ngModel'
        }
      };
});