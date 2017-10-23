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
  .controller("NestedListsDemoController", ['$scope','comandos','$uibModal',function($scope,comandos,$uibModal) {

    console.log("NestedListsDemoController");


    var self=this;

    $scope.models = {
        selected: null,
        templates: [
            {type: "item", id: 2},
            {type: "container", id: 1, columns: [[], []]},
            {type: "bloque", id: 3, columns: [[],[],[]]},         // bloque de actividades
            {type: "spotify", id: 4, columns: [[], [], [], []]},        // Dipara musica de Spotify
            {type: "audio", id: 5, link:"",volumen:1,name:"" , columns: [[], [], [], []]},          // Reporduce audio
            {type: "leer", id: 6, texto:"Texto de prueba"},           // Lee un texto
            {type: "imagen", id: 7,link:"",name:""  },                           // Muestra Imagen
            {type: "tick", id: 8, intervalo_ms: 1000, volumen:1,duracion:6000},       // activa el cuenta timpo
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



var load=function(){
    console.log("load");
      console.log(comandos.getModelAsJason());
if (!comandos.getModelAsJason){
    console.log("load undefined");

}
    else{
    console.log("load no null");
    console.log(comandos.getModelAsJason);
    $scope.models.dropzones=    angular.fromJson(comandos.getModelAsJason());
};
};


load();

    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

$scope.save=function(){
    console.log("save");
    comandos.setModelAsJason($scope.modelAsJson);
};

  this.items = ['item1', 'item2', 'item3'];
  this.selected ={
    item: this.items[2]
  };
  this.animationsEnabled = true;



 $scope.open = function (size, parentSelector,item) {

    var parentElem = undefined;
    // var parentElem = parentSelector ?
    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      // bindToController:true,
      templateUrl: 'views/modal_leer.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return   self.items;
        },
        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);

        item.texto=returnedItem;

    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openTickModal = function (size, item) {

    var parentElem = undefined;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_tick.html',
      controller: 'ModalInstanceTick',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.intervalo_ms = returnedItem.intervalo_ms,
        item.volumen = returnedItem.volumen,
        item.duracion = returnedItem.duracion


    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openImagenModal = function (size, item) {

    var parentElem = undefined;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_imagen.html',
      controller: 'ModalInstanceImagen',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {

        item.link  = returnedItem.link;
        item.name  = returnedItem.name;


    }, function () {

        console.log("return dismissed:");

    });
  };

$scope.openAudioModal = function (size, item) {

    var parentElem = undefined;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_audio.html',
      controller: 'ModalInstanceAudio',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.link = returnedItem.link,
        item.name = returnedItem.name
        // item.duracion = returnedItem.duracion


    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

}])



.controller('ModalInstanceCtrl', function ($uibModalInstance, items, item) {
  var $ctrl = this;
  $ctrl.itemq = item.texto;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };
console.log("$uibModalInstance" );
console.log(items );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('ModalInstanceTick', function ($uibModalInstance,  item) {
  var $ctrl = this;
     // {type: "tick", id: 8, intervalo_ms: 1000, volumen:1,duracion:6000},       // activa el cuenta timpo

  $ctrl.itemq = {

    intervalo_ms : item.intervalo_ms,
    volumen : item.volumen,
    duracion : item.duracion
  };
console.log("$uibModalInstance" );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  }
})

  .controller('ModalInstanceImagen',["$scope","$uibModalInstance","item", "subirImagenFb", function ($scope, $uibModalInstance,  item,subirImagenFb) {

 console.log("ModalInstanceImagen");
  var $ctrl = this;
 $scope.imageSrc=item.link;
 $scope.name=item.name;
 $scope.okdisponible=false;

 $ctrl.itemq = {

    link : item.link,
    name: item.name

  };

    $scope.getFile = function () {
        $scope.progress = 0;


        subirImagenFb.subirUrl($scope.file, $scope,"practica")
                      .then(function(result) {
                        console.log("result Imagen");
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });
    };

    $scope.$on("fileProgress", function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });


  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  };

 $ctrl.fileToUpload = null;
   $ctrl.onChange = function onChange(fileList) {
    $ctrl.fileToUpload = fileList[0];};

}])
 .controller('ModalInstanceAudio',["$scope","$uibModalInstance","item", "subirImagenFb", function ($scope, $uibModalInstance,  item,subirImagenFb) {
  // .controller('PerfilesCtrl' ,['$element', 'recorderService', 'recorderUtils', '$scope', '$timeout', '$interval', 'recorderPlaybackStatus', function ($element, recorderService, recorderUtils, $scope, $timeout, $interval, recorderPlaybackStatus) {

  // .controller(, function ($uibModalInstance,  item) {
  var $ctrl = this;


  $ctrl.itemq = {

    intervalo_ms : item.intervalo_ms,
    volumen : item.volumen,
    duracion : item.duracion
  };
console.log("ModalInstanceAudio" );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  }


    $scope.getFile = function () {
        $scope.progress = 0;


        subirImagenFb.subirUrl($scope.file, $scope,"audio")
                      .then(function(result) {
                        console.log("result Imagen");
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });
    };

    $scope.$on("fileProgress", function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });

$ctrl.f1=function(a){
      console.log('f1');
      console.log(a);

    subirImagenFb.subirUrl(a, $scope,"audio")
                      .then(function(result) {
                        console.log("result Imagen");
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });


    };

}]);

