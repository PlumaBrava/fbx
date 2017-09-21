'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:NestedlistsdemocontrollerCtrl
 * @description
 * # NestedlistsdemocontrollerCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  // .controller('NestedlistsdemocontrollerCtrl', function () {
  //   this.awesomeThings = [
  //     'HTML5 Boilerplate',
  //     'AngularJS',
  //     'Karma'
  //   ];
  // });
  .controller("NestedListsDemoController", function($scope) {

    console.log("NestedListsDemoController");

    $scope.models = {
        selected: null,
        templates: [
            {type: "item", id: 2},
            {type: "container", id: 1, columns: [[], []]},
            {type: "bloque", id: 3, columns: [[], [], [], []]},         // bloque de actividades
            {type: "spotify", id: 4, columns: [[], [], [], []]},        // Dipara musica de Spotify
            {type: "audio", id: 5, columns: [[], [], [], []]},          // Reporduce audio
            {type: "leer", id: 6, columns: [[], [], [], []]},           // Lee un texto
            {type: "imagen", id: 7,link:"url" },                           // Muestra Imagen
            {type: "tick", id: 8, intervalo_ms: 1000, volumen:1},       // activa el cuenta timpo
            {type: "cronometo", id: 9, columns: [[], [], [], []]},      // permite medir mi tiempo.
            {type: "registro", id: 10, columns: [[], [], [], []]}        // permite tomar registo de tiempo o cantidades...
        ],
        dropzones: {
            "A": [
                {
                    "type": "container",
                    "id": 1,
                    "columns": [
                        [
                            {
                                "type": "item",
                                "id": "1"
                            },
                            {
                                "type": "item",
                                "id": "2"
                            }
                        ],
                        [
                            {
                                "type": "item",
                                "id": "3"
                            }
                        ]
                    ]
                },
                {
                    "type": "item",
                    "id": "4"
                },
                {
                    "type": "item",
                    "id": "5"
                },
                {
                    "type": "item",
                    "id": "6"
                }
            ]
            ,
            "B": [
                {
                    "type": "item",
                    "id": 7
                }]
                // ,
            //     {
            //         "type": "item",
            //         "id": "8"
            //     },
            //     {
            //         "type": "container",
            //         "id": "2",
            //         "columns": [
            //             [
            //                 {
            //                     "type": "item",
            //                     "id": "9"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "10"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "11"
            //                 }
            //             ],
            //             [
            //                 {
            //                     "type": "item",
            //                     "id": "12"
            //                 },
            //                 {
            //                     "type": "container",
            //                     "id": "3",
            //                     "columns": [
            //                         [
            //                             {
            //                                 "type": "item",
            //                                 "id": "13"
            //                             }
            //                         ],
            //                         [
            //                             {
            //                                 "type": "item",
            //                                 "id": "14"
            //                             }
            //                         ]
            //                     ]
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "15"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "16"
            //                 }
            //             ]
            //         ]
            //     },
            //     {
            //         "type": "item",
            //         "id": 16
            //     }
            // ],

            // "c": [
            //     {
            //         "type": "item",
            //         "id": 7
            //     },
            //     {
            //         "type": "item",
            //         "id": "8"
            //     }
            //     ]
        }
    };

    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
