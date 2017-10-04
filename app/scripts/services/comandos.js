'use strict';

/**
 * @ngdoc service
 * @name fbxApp.comandos
 * @description
 * # comandos
 * Service in the fbxApp.
 */
angular.module('fbxApp')
  .service('comandos',['$localStorage', '$interval','Spotify','$http',function (localStorage,interval, Spotify,$http)  {


    var self=this;
    this.modelAsJson;
    // this.user;
    // this.empresaKey;
    // this.empresa;

  this.setModelAsJason=function(model){
         console.log('console-setModelAsJason ');
         console.log(model);
        localStorage.modelAsJson=model;
        self.modelAsJson=model;
    };

      this.getModelAsJason=function(){
        // console.log('getModelAsJason');
        // console.log(localStorage.modelAsJson);
      return   localStorage.modelAsJson;
    };


this.indice= new ArrayList();
 this.play=function(valores){
     console.log('play');
      console.log(valores);

if(valores==null){
    alert("Sin datos para ejecutar")
}
else{

// var valores = JSON.parse(model);
     for (var a in  valores) {
        console.log("a: "+a);
        console.log("valores[a]:");
        console.log(valores[a]);
        for(var b in valores[a]){
             console.log("b: "+b );
        console.log("valores[a][b]: " +a+"-"+b);
            console.log(valores[a][b]);
            console.log("type: "+valores[a][b].type);


            switch (valores[a][b].type){

            case "tick":
            console.log("case tick");
            this.startTick(valores[a][b].intervalo_ms,valores[a][b].duracion);


            break;

            case "leer":
            console.log("case leer");
            this.leer(valores[a][b].texto);
            break;

            case "bloque":
            console.log("case bloque");
            this.play(valores[a][b].columns);
            break;


            default:
           console.log("default");



        }


        };
     };

}
    };

this.listaPropiedades=function (obj, level) {
    console.log('listaPropiedades ');
    level = level || 0;
    for(var property in obj) {
        console.log('  '.repeat(level) + property+" :"+ obj[property]);
        if(typeof obj[property] === 'object') {
            self.listaPropiedades(obj[property], ++level);
        };
    };
};


this.execute=function(){
     console.log('execute ');
    this.play(JSON.parse(this.getModelAsJason()));
    // var valores = JSON.parse(self.modelAsJson);
    // this.listaPropiedades(valores, 0) ;
};



// Tick

this.tick=undefined;
this.stopTick=undefined;
this.startTick=function(timeMs,duracion){
  console.log("startTick: "+timeMs);
  self.tick=interval(this.playTick,timeMs);
  self.stopTick=interval( this.stopTick, duracion);
};

this.stopTick=function(){
  console.log("stopTick");
  console.log("angular.isDefined(self.tick): "+angular.isDefined(self.tick));
  console.log("angular.isDefined(self.StopTick):"+angular.isDefined(self.StopTick));
  // if (angular.isDefined(self.tick) && angular.isDefined(self.StopTick)) {
  if (angular.isDefined(self.tick) ) {
            interval.cancel(self.tick);
            interval.cancel(self.stopTick);
            stop = undefined;
          }
};

this.playTick=function(){

   console.log("tick-HOWL6");
   console.log("mp3 codecs ogg: "+  Howler.codecs("mp3"));

   Howler.mobileAutoEnable = true;

    var sound = new Howl({
      src: ['/audio/flap.mp3'],
      format: ['mp3'],
      html5: true

    });



    // Clear listener after first call.
  sound.once('load', function(){
        console.log("once..load");
        console.log(sound);
    sound.play();
  });

// Fires when the sound finishes playing.
    sound.on('end', function(){
      console.log('Finished!');
      sound.unload();
    });



};


// Leer


this.leer=function(texto){
  var msg = new SpeechSynthesisUtterance(texto);
  var voices = window.speechSynthesis.getVoices();
  console.log("voices");
  console.log(voices);
  window.speechSynthesis.speak(msg);
  msg.addEventListener('end', function(e) {
        console.log("voices end:"+e.toString());
        // window.setTimeout(() => {
        //     speak(list.slice(1));
        });

};

  }]);
