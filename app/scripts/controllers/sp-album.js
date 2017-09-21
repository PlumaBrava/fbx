var req = {
 method: 'put',
 url: 'https://api.spotify.com/v1/me/player/play',
 headers: {
   "Accept": "application/json",
    "Content-Type": "application/json"
    // "Accept-Encoding":"gzip, deflate, compress"
 },
 data: {
  "context_uri": "spotify:album:36dIKhMkqy75snxjLS6MaS",
  "offset": {
    "position": 0
  }
}
};
req.headers.Authorization="Bearer " +access_token;


$http(req).then(function (response) {
    console.log('all is good', response.data);
}, function (error) {
    console.log('an error occurred', error.data);
});

// Esto funciona para ejecutar listas

 // "context_uri": "spotify:user:11120731463:playlist:6A5NrDHXZJNQP5ApRlt70k",
 //  "offset": {
 // "position": 0
 //  }


//// est es el caso para un tema en particular. No logre que funcione.

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
  "uris":
["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]
  // ,
  // "offset": {
  //   "position": 0
  // }
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

$http(req).then(function (response) {
    console.log('all is good', response.data);
}, function (error) {
    console.log('an error occurred', error.data);
});





<!--  -->
<div id="myCarousel" class="carousel slide row" data-ride="carousel" >
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <!-- <li data-target="#myCarousel" data-slide-to="0" class="active"></li> -->
    <li ng-repeat="searchItem in productos.searchResult.data.albumms.items" data-target="#myCarousel" data-slide-to="{{$index}}"  ng-class="{active :  $index == 0 }"></li>
    <!-- <li data-target="#myCarousel" data-slide-to="2"></li> -->
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
 <!--    <div class="item active">
      <img src="la.jpg" alt="Chania">
      <div class="carousel-caption">
        <h3>Los Angeles</h3>
        <p>LA is always so much fun!</p>
      </div>
    </div> -->

    <div ng-class="{item, $index == 0 ?  active: }">
      <img ng-src="{{searchItem.images[0].url}}" alt="{{searchItem.images[0].url}}">
      <div class="carousel-caption">
        <h3>{{searchItem.name}}</h3>
        <p>{{searchItem.artists.name}}</p>
      </div>
    </div>

   <!--  <div class="item">
      <img src="ny.jpg" alt="New York">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div> -->
  </div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
