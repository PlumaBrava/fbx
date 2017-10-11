'use strict';

/**
 * @ngdoc directive
 * @name fbxApp.directive:fileUpload
 * @description
 * # fileUpload
 */
angular.module('fbxApp')
  .directive('fileUpload', function () {
    // return {
    //   template: '<div></div>',
    //   restrict: 'E',
    //   link: function postLink(scope, element, attrs) {
    //     element.text('this is the fileUpload directive');
    //   }
    // };

    return {
    restrict: "E",
    transclude: true,
    scope: {
      onChange: "="
    },
    template: '<input type="file" name="file" /><label><ng-transclude></ng-transclude></label>',
    link: function (scope, element, attrs) {
      element.bind("change", function () {
        scope.onChange(element.children()[0].files);
      });
    }
  };
  });
