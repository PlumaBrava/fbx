'use strict';

/**
 * @ngdoc service
 * @name fbxApp.subirImagenFb
 * @description
 * # subirImagenFb
 * Factory in the fbxApp.
 */
angular.module('fbxApp')
  .factory('subirImagenFb',["$q", "$log",'fb','$firebaseStorage', function ($q,$log,fb,$firebaseStorage) {
     // var $complete = function(uploadTask, deferred, scope) {
     //  console.log( "$complete");
     //  console.log( uploadTask.$complete);
     //        return function () {
     //            scope.$apply(function () {
     //                deferred.resolve(uploadTask.$complete);
     //            });
     //        };
     //    };
     var self=this;
        // var $error = function (uploadTask, deferred, scope) {
        //   console.log( "$error");
        //   console.log( uploadTask.$error);

        //     return function () {
        //         scope.$apply(function () {
        //             deferred.reject(uploadTask.$error);
        //         });
        //     };
        // };



        var getUploadTask=function(deferred, scope){






         var uploadTask=$firebaseStorage;
           uploadTask.$progress=$progress(uploadTask, scope);
           // uploadTask.$complete=$complete(uploadTask, deferred, scope);
           uploadTask.$complete(function(snapshot) {
  console.log("getUploadTask complete");
  console.log(snapshot);
  console.log(snapshot.downloadURL);
});
            uploadTask.$error=$error(uploadTask, deferred, scope);
              return uploadTask;
          };

 this.modal_imagen_scope=null
 this.deferred=null;
        var subirUrl = function (file, scope,path) {
          // fb.getRefFB
            self.deferred = $q.defer();
            // var uploadTask = getUploadTask(deferred, scope);

            // var storageRef = firebase.storage().ref("practica/"+file.name);
            // uploadTask(storageRef).$put(file);

            // return deferred.promise;

 self.modal_imagen_scope=scope;
  // create a Storage reference for the $firebaseStorage binding
  console.log("path+'/'+fb.getUserKey+'/'+file.name");
  console.log(path+'/'+fb.getUserKey()+'/'+file.name);
  var storageRef = firebase.storage().ref(path+'/'+fb.getUserKey()+'/'+file.name);
  var storage = $firebaseStorage(storageRef);

//   storage.$getDownloadURL().then(function(url) {
//     console.log(url);
//      self.modal_imagen_scope.setURL(url);
//   // $scope.setURL(url);
// });
  var uploadTask = storage.$put(file);
  uploadTask.$progress(function(snapshot) {
   // self.onProgress(snapshot,self.modal_imagen_scope);
   self.modal_imagen_scope.$broadcast("fileProgress",
                    {
                        total: snapshot.totalBytes,
                        loaded: snapshot.bytesTransferred
                    });
  var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log(percentUploaded);
});
uploadTask.$complete(function(snapshot) {
 console.log("complete");
 console.log(snapshot);
  self.modal_imagen_scope.$evalAsync(function () {
                    self.deferred.resolve(snapshot);
                });

});
uploadTask.$error(function(error) {
  console.log("error");
  console.log(error);
   self.modal_imagen_scope.$evalAsync(function () {
                    self.deferred.reject(error);
});
 });

return self.deferred.promise;


        };

        return {
            subirUrl: subirUrl
        };




  }]);
