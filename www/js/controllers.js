angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Dash) {

})

.controller('ChatsCtrl', function($scope, Chats) {

(function(){
  
  // rotation via mousemove
  var cont = document.querySelector('.dna');
  document.addEventListener('mousemove', updRotation, false);
  function updRotation(e){
    cont.style.webkitTransform = 'rotateY(' + e.x / 5 + 'deg) rotateZ(-' + e.y / 5 + 'deg)';   
    cont.style.transform = 'rotateY(' + e.x / 5 + 'deg) rotateZ(-' + e.y / 5 + 'deg)';   
  }

  // light fx via Photon.js
  light = new Photon.Light();
    shadeAmount = .6;
    tintAmount = .7;
    coverflowFaces = [];
    cubeFaces = [];
    diamondFaces = [];
    dna = new Photon.FaceGroup($('.dna')[0], $('.dna .protein'), 1.5, .2, true);
  dna.render(light, true);
  
})();
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
var boton = document.getElementById('boton');
var texto = document.getElementById('texto');

boton.addEventListener('click', function(){
  
  if(texto.classList.contains('oculto')){
    texto.classList.remove('oculto');
    boton.innerHTML = 'Ocultar';
  } 
  else{
    texto.classList.add('oculto');
    boton.innerHTML = 'Metodos Anticonceptivos';
  }
  
});
$(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2014/03/condonesc.jpg",
"https://www.infobae.com/new-resizer/lRDnhgRG6mC6T59qAPSTmY5yqjc=/750x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/12/06143221/Pastillas-anticonceptivas-1920-2.jpg",
"http://www.balneariais.com/adminbal/assets/images/noticias/anticonceptivos.jpg",
"https://cdne.ojo.pe/thumbs/mujer/uploads/img/2017/03/31/wow-5-metodos-anticonceptiv-jpg_800x0-jpg_700x0.jpg",
"https://www.aeinoticias.com/wp-content/uploads/cNTX170501010.jpg",
"http://www.palmajove.es/portal/PALMAJOVE/RecursosWeb/IMAGENES/4/0_4660_1.gif",
"https://balphin.com/1326-large_default/diu-t-kupfer.jpg",
"https://i.blogs.es/558d94/istock-622767176-1-/450_1000.jpg",
"https://media.metrolatam.com/2017/05/08/metodosanticonceptivos-600x400.jpg",
"https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2014/03/condonesc.jpg",
"https://www.infobae.com/new-resizer/lRDnhgRG6mC6T59qAPSTmY5yqjc=/750x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/12/06143221/Pastillas-anticonceptivas-1920-2.jpg",
"http://www.balneariais.com/adminbal/assets/images/noticias/anticonceptivos.jpg",
"https://cdne.ojo.pe/thumbs/mujer/uploads/img/2017/03/31/wow-5-metodos-anticonceptiv-jpg_800x0-jpg_700x0.jpg",
"https://www.aeinoticias.com/wp-content/uploads/cNTX170501010.jpg",
"http://www.palmajove.es/portal/PALMAJOVE/RecursosWeb/IMAGENES/4/0_4660_1.gif",
"https://balphin.com/1326-large_default/diu-t-kupfer.jpg",
"https://i.blogs.es/558d94/istock-622767176-1-/450_1000.jpg",
"https://media.metrolatam.com/2017/05/08/metodosanticonceptivos-600x400.jpg"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});


});
