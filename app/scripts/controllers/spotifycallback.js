'use strict';

/*
Recibe el callback de spotify.
La información llega en el Url la revisa y extrae el tocken que se necesita para consultar spotify
Si hay un error lo muestra, de lo contrario cierra la ventana y graba localmente ek tocken.
*/

angular.module('fbxApp')
  .controller('SpotifycallbackCtrl',['$stateParams', '$state','$location', function (stateParams, state,location) {
    console.log(" potify callback");
    console.log(" stateParams");
    console.log(stateParams);
    console.log(" state");
    console.log(state.current.name);
    console.log("location");
    console.log(location.path());
     this.tockenvar="ceron var";
    this.tocken="ceron This";
    this.error="cero";
    var self=this;
 console.log("tockenvar "+this.tockenvar);
 console.log("tocken "+this.tocken);

    window.onload = function () {
      var hash = window.location.hash;
      if (window.location.search.substring(1).indexOf("error") !== -1) {
        console.log("ERROR en Sotify callback");
        $.allbackId.append('<p>'+error+'</p>');
        self.error="err";
        self.tockenvar="err var";
    self.tocken="err This";
 console.log("tockenvar "+self.tockenvar);
 console.log("tocken "+self.tocken);
        window.close();
      } else if (hash) {
        // login success
        self.tocken = window.location.hash.split('&')[0].split('=')[1];
        // $.callbackId.append('<p>'+tocken+'</p>');

        self.tockenvar="xx var";
        self.error="xx error";

     console.log("tockenvar "+self.tockenvar);
     console.log("this.error "+self.error);
 console.log("tocken "+self.tocken);
          console.log("OK Sotify callback " + self.tocken);
        // localStorage.setItem('spotify-token', "");
        localStorage.setItem('spotify-token', self.tocken);
      }
    }
  }]);
