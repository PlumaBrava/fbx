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


this.indice= new Array();
this.valoresGlobal;
this.arr={};
this.execute=function(){
     console.log('execute ');
     // this.indice.push(0);
     // this.play(JSON.parse(this.getModelAsJason()),0);
     // this.valoresGlobal=JSON.parse(this.getModelAsJason());
    // this.listaPropiedades(JSON.parse(this.getModelAsJason(),0));
    self.leerJsonToArray(JSON.parse(this.getModelAsJason()));
    self.ejecutar(self.arr[0]);
    // self.ejecutaSiguiente(0);
};

this.leerJsonToArray=function(obj){
     self.arr = Object.keys(obj).map(function(k) { return obj[k] })
};

this.play=function(valores){
     console.log('play');
      console.log(valores);

if(valores==null){
    alert("Sin datos para ejecutar")
}



else{
            switch (valores.type){

            case "tick":
            console.log("case tick");
            this.startTick(valores.intervalo_ms,valores.duracion);


            break;

            case "leer":
            console.log("case leer");
            this.leer(valores.texto);
            break;

            // case "bloque":
            // console.log("case bloque");
            // this.indice.push(0);
            // this.play(valores.A[this.indice[ind]][this.indice[ind+1]].columns,0);
            // break;




            default:
           console.log("default");



        }


        };
};


// this.listaPropiedades=function (obj, level) {
//     console.log('listaPropiedades ');
//     level = level || 0;
//     for(var property in obj) {
//         console.log('  '.repeat(level) + property+" :"+ obj[property]);
//         if(typeof obj[property] === 'object') {
//             self.listaPropiedades(obj[property], ++level);
//         };
//     };
// };

// this.executeArray=[][][][][];
  this.executeArray=[];
// for (let i=0; i <4; i++) {
//    this.executeArray.push([]);
// }
this.indiceNivel=0
this.indiceEjecucion=[0];
this.bloque=[];
this.indiceBloques=[0];


this.paralelos=[];
this.arrBackup=[];

this.ejecutar=function(obj){

 console.log('ejecutar:');
      console.log(obj);
            console.log(this.arr[0]);
      // this.indiceNivel = level || 0;

       console.log("length: "+this.arr[0].length);
      console.log("indiceNivel: "+this.indiceNivel);
       console.log("indiceEjecucion: "+this.indiceEjecucion[this.indiceNivel]);


      if (this.indiceEjecucion[this.indiceNivel]<this.arr[0].length){
            console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
            console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]].type);
        if(  this.arr[0][this.indiceEjecucion[this.indiceNivel]].type=="container"){
          self.arrBackup[this.indiceNivel]=obj;
          self.indiceNivel++;
          self.indiceEjecucion[self.indiceNivel]=0;
          self.ejecutar(obj.columns[0]);
        }else{
        self.play(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
        // self.nextItemRaiz()
        };


    };
};


  this.ejecutaSiguiente=function (level) {
      console.log('ejecutaSiguiente level:'+level);

      console.log(this.arr[0]);
      this.indiceNivel = level || 0;

       console.log("length: "+this.arr[0].length);
       console.log("indiceEjecucion: "+this.indiceEjecucion[this.indiceNivel]);
       console.log("indiceNivel: "+this.indiceNivel);
      if (this.indiceEjecucion[this.indiceNivel]<this.arr[0].length){
            console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
            console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]].type);
        if(  this.arr[0][this.indiceEjecucion[this.indiceNivel]].type=="container"){
          self.indiceNivel++;
          self.indiceEjecucion[self.indiceNivel]=0;
          self.bloque[self.indiceNivel]=self.arr[0][self.indiceEjecucion[self.indiceNivel-1]];
          self.indiceBloques[self.indiceNivel]=0;
          self.leerBloque2(self.bloque[self.indiceNivel]);
        }else{
        self.play(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
        // self.nextItemRaiz()
        };
      }else {
        console.log ("Fin ejecutaSiguiente");
      };
  };

  // this.h=0;

  this.leerBloque2=function(bloque){

      // if(this.h==20){return;}else{
      //   console.log("h:"+this.h);
      //   this.h++;
      // };
      console.log("leerBloque2");
       console.log(self.bloque);
      console.log(bloque.columns);
      console.log(" bloque.columns length: " +bloque.columns.length);
      console.log(" indiceBloques: " +self.indiceBloques[self.indiceNivel]);
      console.log(self.indiceBloques);
      var i=this.indiceEjecucion[this.indiceNivel];
      var j=self.indiceBloques[self.indiceNivel];
      if (i<bloque.columns.length){
        if(j<bloque.columns[i].length){
           console.log(bloque.columns[i][j]);
            console.log("bloque Type: "+bloque.columns[i][j].type);
            if(  bloque.columns[i][j].type=="bloque"){
              console.log("leerBloque call");
              console.log(bloque.columns[i][j]);

              self.indiceNivel++;
              self.indiceEjecucion[self.indiceNivel]=0;
              self.bloque[self.indiceNivel]=bloque.columns[i][j];
              self.indiceBloques[self.indiceNivel]=0;
              self.leerBloque2(bloque.columns[i][j]);
          } else
          {

                // no es un bloque
                console.log("no bloque");
                self.play(bloque.columns[i][j]);
                // self.nextItemDeBloque();

                } ;
        } else{
        // caso de j>=legth
        self.indiceEjecucion[this.indiceNivel]++;
        self.indiceBloques[self.indiceNivel]=0;
        self.leerBloque2(bloque);};
      } else{
        // caso de i>=legth
              self.indiceEjecucion.pop();
              self.bloque.pop();
              self.indiceBloques.pop();

             self.indiceNivel--;

            if (self.indiceNivel==0){
               self.nextItemRaiz();
              }else{
              self.indiceEjecucion[self.indiceNivel]++;
               self.leerBloque2(self.bloque[self.indiceNivel])  ;
      };


        };

    };

this.next=function(){
   if (self.indiceNivel==0){
         self.nextItemRaiz();
      }else{
         self.nextItemDeBloque();
      };
};

this.nextItemRaiz=function(){
   console.log('nextItemRaiz');
  ++this.indiceEjecucion[this.indiceNivel];
    self.ejecutaSiguiente(this.indiceNivel);

};

this.nextItemDeBloque=function(){
     console.log('nextItemDeBloque');
  self.indiceBloques[self.indiceNivel]++;
  self.leerBloque2(self.bloque[self.indiceNivel]);
};
this.listaPropiedades=function (obj, level) {
    console.log('listaPropiedades level:'+level);
    var arr = Object.keys(obj).map(function(k) { return obj[k] })
    console.log(arr);
    level = level || 0;
    // for(var property in obj) {
    //     if(property=="A"){
    //       console.log('property A');
    //       self.listaPropiedades(obj[property], ++level);
    //     } else{
    //       console.log('  '.repeat(level) + property+" :"+ obj[property]);

    //       if(typeof obj[property] === 'object') {
    //       self.executeArray[self.indiceRaiz]=obj[property]
    //       ++self.indiceRaiz;
    //       console.log("executeArray:  "+self.executeArray);
    //       console.log(self.executeArray);

    //       self.listaPropiedades(obj[property], ++level);
    //        break;
    //       };
    //     };
    // };
     console.log("length: "+arr[0].length);
    for (var i=0;i<arr[0].length;i++){
         console.log(arr[0][i]);
      console.log(arr[0][i].type);
      if(  arr[0][i].type=="bloque"){
        self.leerBloque(arr[0][i]);
      };
    };
};


this.leerBloque=function(bloque){
    console.log("leerBloque");
    console.log(bloque.columns);
    console.log("length: " +bloque.columns.length);
    for (var i=0;i<bloque.columns.length;i++){
      for (var j=0;j<bloque.columns[i].length;j++){
      console.log(bloque.columns[i][j]);
      console.log("bloque Type: "+bloque.columns[i][j].type);
    if(  bloque.columns[i][j].type=="bloque"){
          console.log("leerBloque call");
          console.log(bloque.columns[i][j]);
        self.leerBloque(bloque.columns[i][j]);
      };
    };

    };

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
          self.next();
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
        self.next();
        // window.setTimeout(() => {
        //     speak(list.slice(1));
        });

};

  }]);
