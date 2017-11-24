'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:MispracticasCtrl
 * @description
 * # MispracticasCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('MispracticasCtrl', ['$scope','firebase','$state','fb','comandos',function ($scope,firebase,$state,fb,comandos) {

    self=this;
    // $scope.lista={nombre:"Juan"};


    var setData=function(){
        console.log("MispracticasCtrl getUserKey()");
        console.log(fb.getUserKey());
    fb.leerMisPracticas(fb.getUserKey()).then(function(data){
        console.log("MispracticasCtrl leerMisPracticas them");
        console.log(data);
         $scope.$apply(function () {
            $scope.lista=data.result;
            console.log($scope.lista);
     });
    }).catch(function(data){
        console.log("MispracticasCtrl leerMisPracticas catch");
        console.log(data);
    });
};


$scope.configurar=function(datosPractica){

    console.log(datosPractica);
    fb.leerUnaPractica(datosPractica).then(function(res){
        console.log(res);
        comandos.setModelAsJason(res.result);
        $state.go('dadlist');
    });

    //
};
$scope.crearPractiva=function(){
    $state.go('nuevapractica');
};

    setData();



  }]);
