'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
.config(function (SpotifyProvider) {
     console.log("Spotify");
     console.log(SpotifyProvider);


/*
    Configuracion de Spotify para respnder a consultas.

    1) configuración de Console de Spotify

     https://developer.spotify.com/my-applications/  (console de Spotify)

     Website : de donde nos conectamos para solicitar información
          desarrollo:http://localhost:9000/#!/productos
          web: www.mabecar.com

    Redirect URIs: a donde dirige el callback con el token para poder acceder a Spotiy
          desarrollo:http://localhost:9000/#!/spotifycallback/
          web: http://mabecar.com/#!/spotifycallback/

    2) configurar Spotfy provider para hacer las solicitudes a la Spotify

      SetRedirectUri()
         desarrollo: SpotifyProvider.setRedirectUri('http://localhost:9000/#!/spotifycallback/');
         web: SpotifyProvider.setRedirectUri('http://mabecar.com/#!/spotifycallback/');

      SetClientId() Colocar el cliente que se obtiene de console.
      setScope    Se especifica que información estaremos solicitando.

*/



  SpotifyProvider.setClientId('3e2c31f33d594af695b1edcbe39a3e40');
  // SpotifyProvider.setRedirectUri('http://mabecar.com/#!/spotifycallback/');
  SpotifyProvider.setRedirectUri('http://localhost:9000/#!/spotifycallback/');
  // SpotifyProvider.setScope('user-modify-playback-state user-read-private playlist-read-private playlist-modify-private playlist-modify-publicuser-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // SpotifyProvider.setScope('user-modify-playback-state');
  SpotifyProvider.setScope('user-read-email streaming user-modify-playback-state user-read-playback-state user-read-recently-played playlist-read-private user-read-private user-read-email user-read-birthdate');


  // If you already have an auth token
  // SpotifyProvider.setAuthToken('BQAQibVONBSdf0DUumNBDN96x0rnypUGwFs2PMviXcbQYIk_1lAIJq5IhV7pMC1NVTDVhORVXIO_Dc_UbfeAkY5eck0HLHDWVzRhVnd46KaZlYjKlPFeNmGWLXOqt_YXjGCP54Q9i0P1sv-qBN0sgRsY2s6nzkbjX2mZ5yz-CJ-aSi6RdZ9RO_zcsuhemIgViBH5vV1F7w7WXCGnSv8r110cTkEUHCcMkDUGtk3-OmMPX3MZlzBIJu-Aq8c8msvi_3sIjIQwfSKzLkG5UOtQxL');
  // SpotifyProvider.setAuthToken('b8a31ca85006417a824e6c5a2b04552c');
  console.log(SpotifyProvider);
})

     .controller('ProductosCtrl',['$scope','firebase','$state','fb', '$interval','Spotify','$http',function ($scope,firebase,$state,fb,interval, Spotify,$http) {
  console.log("Spotify 0");
  console.log(Spotify);
this.items=[
    {"name":"album 1",  "name1":"pep1"},
    {"name":"album 2",  "name1":"pep2"},
    {"name":"album 3",  "name1":"pepe"}
    ];
    console.log("searchResult items"+this.items);
    var albums={"items":this.items,"extra1":"e1"};
    var data={"albums" :albums,"extra2":"e2"}

this.searchResult= {"data":data};
console.log("searchResult"+this.searchResult);
console.log(this.searchResult.data.albums.x);
console.log("searchResult"+this.searchResult);
var access_token;


//Loggin a Spotify

      Spotify.login().then(function (data) {
        console.log(' log in');
        access_token=data;
        console.log(data);
        alert("You are now logged in");
        Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
        console.log("Spotify getAlbum");
        console.log(data);
});







Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
  console.log("getTrack");
    console.log(data);

});

Spotify.getTrackAudioFeatures('0eGsygTp906u18L0Oimnem').then(function (data) {
  console.log("getTrackAudioFeatures");
    console.log(data);
    console.log(data.data.track_href);

    // var audio = new Audio();
     // audio.src = data.data.track_href;
     // audio.play(data);
     // Spotify.play(data);
});

// var url = 'https://api.github.com/users/brandonclapp';
// $http.get(url).then(function (response) {
//     console.log('all is good', response.data);
// }, function (error) {
//     console.log('an error occurred', error.data);
// });

console.log( "access_token");
console.log( access_token);
var uri = 'https://api.spotify.com/v1/me/player/play';
var track="spotify:track:0eGsygTp906u18L0Oimnem";
var json={
  "header": {
    // "Authorization": "Bearer ",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Accept-Encoding":"gzip, deflate, compress"
  },
  // "data": {
  //   "context_uri": "track"
  // }
 "data": {
  "uris": "spotify:track:0eGsygTp906u18L0Oimnem"
  // "offset": {
  //   "position": 7
  // }
}
};






var reqDevice={
 method: 'get',
 url: 'https://api.spotify.com/v1/me/player/devices',
 headers: {
   "Accept": "application/json",
    "Content-Type": "application/json"

 }};
reqDevice.headers.Authorization="Bearer " +access_token;
$http(reqDevice).then(function (response) {
    console.log('devices', response.data);
}, function (error) {
    console.log('error en divece', error);
});


// json.headers.Authorization="Bearer " + access_token;
json.header.Authorization="Bearer " +access_token;
// json.data.context_uri=track;
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
  "context_uri": "spotify:user:11120731463:playlist:6A5NrDHXZJNQP5ApRlt70k",
  "offset": {
    "position": 0
  }
}
};
req.headers.Authorization="Bearer " +access_token;

console.log( "json");
console.log( json.header.Authorization);
console.log( json.data.context_uri);
console.log( json);
// $http.put(uri, json).then(function (response) {
//     console.log('all is good', response.data);
// }, function (error) {
//     console.log('an error occurred', error.data);
// });

// $http(req).then(function (response) {
//     console.log('play all is good', response.data);
// }, function (error) {
//     console.log('play an error occurred', error.data);
// });



      }, function () {
        Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
  console.log("Spotify");
  console.log(data);
});
        console.log('didn\'t log in');
      });


// Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
//   console.log("Spotify");
//   console.log(data);
// });
// .catch(function(error) {
//           // Handle Errors here.
//           console.log("Spotify error");
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // The email of the user's account used.



//             console.log("error: "+errorCode+" - "+errorMessage );
//           // ...
//         });

        console.log("ProductosCtrl ");
        // this.userKey="a";
        // this.user="b";
        // this.empresaKey="c";
        // this.empresa="d";
        var self=this;

        this.userKey=fb.getUserKey();
        this.user=fb.getUser();
        this.empresaKey=fb.getEmpresaKey();
        this.empresa=fb.getEmpresa();

        // this.ListaProductos;

        if(this.empresaKey){
      // this.getProductos=function(enmpresaKey){
            console.log("getProductos");
            // Get a reference to the database service
            var database = firebase.database();
            var ref = database.ref('empresa-productos/'+this.empresaKey);
            ref.on('value', function(snapshot) {
                   console.log(snapshot.val());
                   self.ListaProductos=snapshot.val();
                     console.log(self.ListaProductos);
                     snapshot.forEach(function(childSnapshot) {
                      var childKey = childSnapshot.key;
                         var childData = childSnapshot.val();
                         console.log(childData);
                          $state.go('productos');
      // fb.setEmpresaKey(childKey);
      // fb.setEmpresa(childData);
      //     $state.go('productos');
                });
            })
        // }; //end getProductos
        };

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


this.time= "fffdddff";
this.vol=1;
console.log(this.time);
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


this.playTick1=function(){
   console.log("playTick1");
    var audio = new Audio('/audio/flap.ogg');
   //  // self.vol=self.vol-0.1
    audio.volume=1;
    // audio.autoplay = true;

        audio.setAttribute('controls', '');
        audio.setAttribute('preload', 'metadata');
        // playerWrapper.appendChild(audio);

        // var source = document.createElement('source');
        // source.setAttribute('src', PVaudioSources[i]);
        // audio.appendChild(source);

        audio.load();
        audio.onloadedmetadata = function() {
           console.log("playTick1 onloadedmetadata");
            // audio.currentTime = PVstartTimes[i];
            audio.play();

        };

}
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




this.tick=undefined;
this.startTick=function(timeMs){
  console.log("startTick: "+timeMs);
  this.tick=interval(this.playTick,timeMs);
};

this.stopTick=function(){
  if (angular.isDefined(this.tick)) {
            interval.cancel(this.tick);
            stop = undefined;
          }
};

this.startTime=interval(this.setTime,2000);

this.setResult=function(data){
 console.log("setResult"+ data);
 console.log(data);
 // self.items=data.albums.items[0];
// $scope.$apply(function(){

// });
// self.searchResult=data.albums.items;
//Albums
// this.items=data.data.albums.items;
// Playlist
// this.items=data.data.playlists.items;
// Artist



this.items=data.data.artists.items;
// traks- no tienen imagenes... se podrian utilizar las de su album.
// this.items=data.data.tracks.items;
}

this.playAlbum=function(albumUri){
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
  "context_uri": albumUri,
  "offset": {
    "position": 0
  }
}
};
req.headers.Authorization="Bearer " +access_token;




$http(req).then(function (response) {
    console.log('playAlbum', response.data);
}, function (error) {
    console.log('playAlbum an error occurred', error.data);
});

};


this.buscar=function(buscarTexto){
   // search: function (q, type, options) {
    // Spotify.search(buscarTexto,"album,artist,track,playlist",{"limit":10}).then(function(data){
    Spotify.search(buscarTexto,"artist",{"limit":50}).then(function(data){
  console.log("search ok");
  var dataObj= angular.fromJson(data);
    // console.log("href "+dataObj.data.albums.items[0].name);
    console.log(dataObj);
    self.setResult(angular.fromJson(data));
    }, function (error) {
    console.log('search an error occurred', error.data);
});
};


this.leer=function(texto){
  var msg = new SpeechSynthesisUtterance(texto);
  var voices = window.speechSynthesis.getVoices();
  console.log("voices");
  console.log(voices);
  window.speechSynthesis.speak(msg);

};

  }]);//endo controller
