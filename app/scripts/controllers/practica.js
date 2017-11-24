'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:PracticaCtrl
 * @description
 * # PracticaCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('PracticaCtrl', ['$scope', 'p5','$interval','$localStorage','Spotify','$http',function($scope, p5,interval,localStorage,Spotify,$http) {
        console.log("PracticaCtrl");

    var self=this;


const ESTADO_STOP=0, ESTADO_PLAY=1, ESTADO_PAUSA=2;
$scope.estado=ESTADO_STOP;

$scope.pantalla={
    imagen: "images/trashcan.jpg",
    avance: 80,
    texto:"mensaje a mostrar"
};






    this.modelAsJson;
    var access_token;         // Tocken para acceder a Spotify

  this.setModelAsJason=function(model){
         console.log('console-setModelAsJason ');
         console.log(model);
        localStorage.modelAsJson=model;
        self.modelAsJson=model;
    };

      this.getModelAsJason=function(){
        console.log('getModelAsJason');
        console.log(localStorage.modelAsJson);
      return   localStorage.modelAsJson;
    };



 $scope.execute=function(){
     console.log('execute ');

    self.leerJsonToArray(JSON.parse( self.getModelAsJason()));
    $scope.estado=ESTADO_PLAY;
    self.ejecturarSerie(self.arr[0]);

};

 $scope.pausa1=function(){
    $scope.estado=ESTADO_PAUSA;
     console.log('pausa ');
      $scope.pantalla={
    imagen: "images/trashcan.jpg",
    avance: 0,
    texto:"Pausa"
    };

};

 $scope.stop1=function(){
    $scope.estado=ESTADO_STOP;
     console.log('Stop ');
    $scope.pantalla={
    imagen: "images/trashcan.jpg",
    avance: 0,
    texto:"Stop"
    };

    self.stopSpotify();
    self.stopTick();
    self.imagen($scope.pantalla.imagen);



};

this.leerJsonToArray=function(obj){
    console.log('leerJsonToArray');
    console.log(obj);
     self.arr = Object.keys(obj).map(function(k) { return obj[k] })
};





this.ejecturarSerie=function(actividades){

  console.log('ejecturarSerie');
  console.log(actividades);

return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa ejecturarSerie");



  actividades.reduce(
    function (sequence, value) {
       console.log('reduce');
       console.log(value);

        return sequence.then(function() {

            return self.play(value);

        }).then(function(obj) {
            console.log('END execution with value =', obj.value,
                        'and result =', obj.result);
        }).catch(function(obj){
           console.log('END execution with value error =', obj.value,
                        'and result =', obj.result);
        });
    },
    Promise.resolve()
  ).then(function() {
    console.log('COMPLETED ejecucion serie');
       resolve({ value: "fin EjecuionSerie", result: "fin EjecuionSerie"});
    });
  });
};



this.ejecturarParalelo=function(actividades){

  console.log('ejecturarParalelo');
  console.log(actividades);

return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa ejecturarParalelo");

var p = [];
for (var n = 0; n < actividades.length; n++) {
    p.push(self.play(actividades[n]));
}

    console.log(p);
   Promise.all(p)
        .then(function(obj) {
          console.log(obj);
            console.log('END ejecturarParalelo with value =', obj.value,
                        'and result =', obj.result);
            console.log(obj);
            resolve({ value: "fin ejecturarParalelo", result: "fin EjecuionParalelo, se cumpleron tadas"});
        })
        .catch(function(obj){
           console.log('END ejecturarParalelo with value error  =', obj.value,
                        'and result =', obj.result);
          reject({ value: "fin ejecturarParalelo ith value error", result: "fin EjecuionParalelo, fallo alguna promesa"});
        });


});
};



this.play=function(valores){
     console.log('play');
      console.log(valores);

      return new Promise(function (fulfill, reject){

      if(valores==null){
          alert("Sin datos para ejecutar")
      }
      else{
            switch (valores.type){

            case "tick":
            console.log("case tick");
            self.startTick(valores.intervalo_ms,valores.duracion).then(function(obj){
              console.log("Play-Retorno Promesa Tick");
              console.log(obj);
            fulfill({ value: "Retorno Promesa Tick", result: "Retorno Promesa Tick result" });

            }).catch(function(error){
              console.log("Play-error tick");
              console.log(error);
            });
            break;

             case "audio":
            console.log("case audio");
            self.playAudio(valores.link).then(function(obj){
              console.log("Play-Retorno Promesa audio");
              console.log(obj);
            fulfill({ value: "Retorno Promesa audio", result: "Retorno Promesa audio result" });

            }).catch(function(error){
              console.log("Play-error audio");
              console.log(error);
            });
            break;

            case "leer":
            console.log("case leer");
            self.leer(valores.texto).then(function(obj){
              console.log("Play-Retorno Promesa leer");
              console.log(obj);
            fulfill({ value: "Retorno Promesa Tick", result: "Retorno Promesa Tick result" });

            }).catch(function(error){
              console.log("Play-error leer");
              console.log(error);
            });
            break;

             case "imagen":
            console.log("case imagen");
            self.imagen(valores.link).then(function(obj){
              console.log("Play-Retorno Promesa imagen");
              console.log(obj);
            fulfill({ value: "Retorno Promesa imagen", result: "Retorno Promesa imagen result" });

            }).catch(function(error){
              console.log("Play-error imagen");
              console.log(error);
            });
            break;

            case "spotify":
            console.log("case Spotify");
            // self.playSong(valores.tracks[0].uri).then(function(obj){
            self.playSongArray(valores.tracks).then(function(obj){
              console.log("Play -Retorno Promesa Spotify");
              console.log(obj);
            fulfill({ value: "Retorno Promesa Spotify", result: "Retorno Promesa Spotify result" });

            }).catch(function(error){
              console.log("Play- error Spotify");
              console.log(error);
            reject({ value: "Retorno Promesa Spotify Errror", result: "Retorno Promesa Spotify error" });

            });
            break;

            case "bloque":
            console.log("case bloque");

               self.ejecturarParalelo(valores.columns[0]).then(function(obj){
                console.log("Retorno Promesa bloque");
                console.log(obj);
                 fulfill({ value: "Retorno Promesa bloque", result: "Retorno Promesa bloque result ok" });

            }).catch(function(error){
              console.log("Retorno promesa de bloque");
              console.log(error);
              reject({ value: "Retorno Promesa bloque error", result: "Retorno Promesa bloque result error" });
            });
            break;

            case "container":
            console.log("case container");
            console.log(valores);
            self.ejecturarSerie(valores.columns[0]).then(function(obj){
                console.log("Retorno Promesa container");
                console.log(obj);
                 fulfill({ value: "Retorno Promesa container", result: "Retorno Promesa container result" });

            }).catch(function(error){
              console.log("error container");
              console.log(error);
            }
              );
            break;


            default:
           console.log("default");
                 fulfill({ value: "Retorno Promesa default", result: "Retorno Promesa default result" });

        };//fin del switch


        };//fin del else
        });// fin del return de la promesa
};






// Tick

this.startTick=function(timeMs,duracion){
  console.log("startTick: "+timeMs);
  self.tick=interval( self.playTick,timeMs);
  console.log(self.tick);
return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa Tick");
    setTimeout(function() {
            self.stopTick();
            console.log("Resolve ok Tick: "+ duracion);
            resolve({ value: "fin tick", result: duracion});
        }, duracion);
    });

};

this.stopTick=function(){
  console.log("stopTick");

  // console.log("angular.isDefined(self.StopTick):"+angular.isDefined(self.StopTick));
  // if (angular.isDefined(self.tick) && angular.isDefined(self.StopTick)) {
  if (angular.isDefined(self.tick) ) {
     console.log("Tick angular.isDefined(self.tick): "+angular.isDefined(self.tick));
            interval.cancel(self.tick);
            self.tick=undefined;
            console.log("Tick angular.isDefined(self.tick): "+angular.isDefined(self.tick));
            // interval.cancel(self.stopTick);
            // stop = undefined;
          }

};

this.playTick=function(){
 console.log("playTick: "+$scope.estado);
    if($scope.estado==ESTADO_STOP){
        self.stopTick();
    }
    else{
   // console.log("tick-HOWL6");
   // console.log("mp3 codecs ogg: "+  Howler.codecs("mp3"));

   Howler.mobileAutoEnable = true;

    var sound = new Howl({
      src: ['/audio/flap.mp3'],
      format: ['mp3'],
      html5: true

    });



    // Clear listener after first call.
  sound.once('load', function(){
        // console.log("once..load");
        // console.log(sound);
    sound.play();
  });

// Fires when the sound finishes playing.
    sound.on('end', function(){
      console.log('Finished!');
      sound.unload();
    });

}

};



// Play Audio

this.playAudio=function(link){
  console.log("playAudio: "+link);
  // self.tick=interval( self.playTick,timeMs);
  // console.log(self.tick);
return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa playAudio");
     console.log("$scope.estado: "+$scope.estado);
    if($scope.estado==ESTADO_STOP){
             console.log("$scope.estado: ESTADO_STOP"+$scope.estado);
        // self.stopTick();
    }
    else{

   Howler.mobileAutoEnable = true;

    var sound = new Howl({
      src: [link],
      format: ['mp3'],
      html5: true

    });



    // Clear listener after first call.
  sound.once('load', function(){
        console.log("playAudio..load");
        console.log(sound);
    sound.play();
  });

// Fires when the sound finishes playing.
    sound.on('end', function(){


            console.log("playAudio end: ");
            resolve({ value: "playAudio", result: "end playAudio"});
      sound.unload();
    });

    }});


};

this.stopPlayAudio=function(){
  console.log("stopTick");

  // console.log("angular.isDefined(self.StopTick):"+angular.isDefined(self.StopTick));
  // if (angular.isDefined(self.tick) && angular.isDefined(self.StopTick)) {
  if (angular.isDefined(self.tick) ) {
     console.log("Tick angular.isDefined(self.tick): "+angular.isDefined(self.tick));
            interval.cancel(self.tick);
            self.tick=undefined;
            console.log("Tick angular.isDefined(self.tick): "+angular.isDefined(self.tick));
            // interval.cancel(self.stopTick);
            // stop = undefined;
          }

};







// Leer


this.leer=function(texto){

if ('speechSynthesis' in window) {
 // Synthesis support. Make your web apps talk!
 console.log("Synthesis support. Make your web apps talk!");
}

if ('SpeechRecognition' in window) {
  // Speech recognition support. Talk to your apps!
  console.log(" Speech recognition support. Talk to your apps!");
}

 var msg = new SpeechSynthesisUtterance(texto);
// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
    console.log("voices");
    console.log(voices);


  msg.voice= voices.filter(function(voice) { return voice.name == 'Google español'; })[0];;

  console.log("texto: "+texto);

  console.log(msg);
  console.log(window.speechSynthesis);


};

 window.speechSynthesis.speak(msg);



  return new Promise(function (resolve, reject){
     console.log("Construccion de la promesa");
        msg.addEventListener('end', function(e) {
        console.log("lectura completa: evento"+e.toString());
        resolve({ value: "fin Leer ok", result: texto});

    });
            msg.addEventListener('offline', function(e) {
        console.log("lectura offline: evento"+e.toString());
      reject({ value: "Leer offline", result: texto});

    });
                // msg.addEventListener('error', function(e)
msg.onError=function(e)
                 {
        console.log("Lectura error: "+e.toString());
        reject({ value: "fin Leer error", result: e});

    };
  });

  // msg.addEventListener('end', function(e) {
  //       console.log("voices end:"+e.toString());
  //       self.next();
  //       // window.setTimeout(() => {
  //       //     speak(list.slice(1));
  //       });

};


//Imagen

this.imagen=function(link){


  return new Promise(function (resolve, reject){

      console.log("Construccion de la promesa Imagen");
      if(link){
        $scope.pantalla.imagen=link;

          console.log("imagen link no nulo");
          resolve({ value: "fin Leer ok", result: link});
      }else {
        console.log("imagen link  nulo")
        reject({ value: "imagen link nulo", result: link});

      };
    });
  };




// Spotify
this.playSongArray=function(array){

  console.log("playSongArray");
  console.log(array);
  return new Promise(function (res, rej){
    console.log("Construccion de la promesa playSongArray");
  //   setTimeout(function() {
  //           self.stopTick();
  //           resolve({ value: "fin tick", result: duracion});
  //       }, duracion);


  array.reduce(
    function (sequence, value) {
       console.log('playSongArray reduce');
       console.log(value);

        return sequence.then(function() {

            return self.playSong(value);

        }).then(function(obj) {
            console.log('playSongArray END  execution ok with value =', obj.value,
                        'and result =', obj.result);
        }).catch(function(obj){
           console.log('playSongArray END  error execution with value error =', obj.value,
                        'and result =', obj.result);
          console.log(obj);
        });
    },
    Promise.resolve()
  ).then(function() {
    console.log('playSongArray res COMPLETED ejecucion serie');
       res({ value: "playSongArray fin EjecuionSerie", result: "fin EjecuionSerie"});
    }).catch(function(obj){
           console.log('playSongArray END  error execution with value error =', obj.value+
                        'and result =', obj.result);
      rej({ value: "playSongArray fin EjecuionSerie", result: "fin EjecuionSerie"});
      });
  });
   };






this.playSong=function(song){
  console.log("playSong");
  console.log(song);

  return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa playSong");
    self.getAccessTocken().then(function(data){
      console.log("playSong retorno de getAccessTocken");
      console.log(data);
      self.access_token=data.result;
      console.log("playSong access_token");

      console.log(self.access_token);

      var req = {
        method: 'put',
        // url: 'https://api.spotify.com/v1/me/player/play&device_id=c565f68c8ac24d000809da8f41c839cf68003510',
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
            // "Accept-Encoding":"gzip, deflate, compress"
          },
        data: {
        // "context_uri": songUri,
        "uris":[song.uri],
        "offset": {
        "position": 0
        }}
      };
      req.headers.Authorization="Bearer " +self.access_token;
      console.log("playSong construye http req");
      $http(req).then(function (response) {
        console.log('PlaySong Respuesta', response.data);
        console.log(response);

        console.log("PlaySong name: "+song.name);
        console.log("PlaySong duration: "+song.duration_ms);

        setTimeout(function() {
        console.log('PlaySong  setTimeout: ' + song.duration_ms);
            resolve({ value: "PlaySong tiempo cumplido", result:song.duration_ms});

        }, song.duration_ms);



        }).catch( function (error) {
          console.log('PlaySong  http(req) an error occurred', error.data);
          reject({ value: "PlaySong Respuesta de la Promesa error", result: error.data});
      });

}).catch(function(error){
  console.log("Playa Song catch retorno de getAccessTocken con error");
  console.log(error);
  reject({ value: "PlaySong Respuesta de la Promesa error", result: error.data});
  });




  });

};


this.stopSpotify=function(){
  console.log("stopSpotify");



  return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa stopSpotify");
    self.getAccessTocken().then(function(data){
      console.log("stopSpotify retorno de getAccessTocken");
      console.log(data);
      self.access_token=data.result;
      console.log("stopSpotifyaccess_token");

      console.log(self.access_token);

      var req = {
        method: 'put',

        url: 'https://api.spotify.com/v1/me/player/pause',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
            // "Accept-Encoding":"gzip, deflate, compress"
          }
          // ,
        // data: {
        // "context_uri": songUri,
        // "uris":[song.uri],
        // "offset": {
        // "position": 0
        // }
        // }
      };
      req.headers.Authorization="Bearer " +self.access_token;
      console.log("stopSpotify construye http req");
      $http(req).then(function (response) {
        console.log('stopSpotify Respuesta', response.data);
        console.log(response);

            resolve({ value: "stopSpotify ", result:"fin stopSpotify"});





        }).catch( function (error) {
          console.log('PlaySong  http(req) an error occurred', error.data);
          reject({ value: "PlaySong Respuesta de la Promesa error", result: error.data});
      });

}).catch(function(error){
  console.log("Playa Song catch retorno de getAccessTocken con error");
  console.log(error);
  reject({ value: "PlaySong Respuesta de la Promesa error", result: error.data});
  });




  });

};



//Loggin a Spotify

this.getAccessTocken=function(){
   console.log("getAccessTocken");
   console.log(self.access_token);

return new Promise(function (resolve, reject){
    console.log("getAccessTocken Construccion Promesa");
    console.log(self.access_token);
      if (self.access_token){
         console.log("getAccessTocken Tocekn existe");
        resolve({ value: "getAccessTocken Respuesta de la Promesa correcto tocken existente", result: self.access_token});
      } else{
        console.log("getAccessTocken else: access_token no existe");
        console.log(Spotify);
        Spotify.login().then(function (data) {
              console.log("getAccessTocken exitoso");
              self.access_token=data;
              console.log(data);
              resolve({ value: "getAccessTocken Respuesta de la Promesa correcto consigue tocken", result: self.access_token});
          }).catch(function(error){
              console.log("getAccessTocken Tocekn error");
              reject({ value: "getAccessTocken Respuesta de la Promesa error", result: error});
          });
      };

    });//fin de la promesa
}; // fin de la funcion get AccessTocken




// Set del volumen de Spotify

this.setVolumen=function(){
var reqVolumen = {
 method: 'put',
 url: 'https://api.spotify.com/v1/me/player/volume?volume_percent=100',
 headers: {
   "Accept": "application/json",
    "Content-Type": "application/json"
    }
};

reqVolumen.headers.Authorization="Bearer " +access_token;
  $http(reqVolumen).then(function (response) {
    console.log('all is good', response.data);
}, function (error) {
    console.log('an error occurred', error.data);
});
};



// Define la hora del sistema


this.setTime=function () {
    // console.log("startTime1"+ this.time);

    self.time="tocado";
     // console.log("startTime2"+ this.time);
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('txt').innerHTML =
    // h + ":" + m + ":" + s;
    self.time=h + ":" + m + ":" + s;
    // console.log(self.time);
    // // var t = setTimeout(this.startTime, 2500);
    var audio = new Audio('audio/flap.mp3');
    self.vol=self.vol-0.1
    // audio.volume=self.vol;
    // console.log(audio.volume);
        // audio.play();
};


function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};







///   P5


this.x=100;
interval(function() {
    if(self.x>100){
        self.x=0;
    }
        else{
    self.x= self.x+5;
    }
},1000);



var sketch = function(p) {
    p.setup = function(){
      p.createCanvas(200, 200);
      p.background(0);
    }
p.draw = function() {
      if (p.mouseIsPressed) {
        p.fill(0);
      } else {
        p.fill(255);
      }
      p.ellipse(self.x,self.x, 80, 80);
    };

  };
  new p5(sketch, 'myContainer');













  }]);

