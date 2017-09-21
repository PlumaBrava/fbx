'use strict';

/**
 * @ngdoc service
 * @name fbxApp.Items
 * @description
 * # Items
 * Factory in the fbxApp.
 */
angular.module('fbxApp')
  .factory('Items', ['$http',
            function($http) {

                return {
                    getJson: function(url) {
                        var ItemsJson = $http.get(url).then(function(response) {
                            return response.data;
                        });
                        return ItemsJson;
                    }
                }
            }
        ]);



