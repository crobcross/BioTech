angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Dash) {
    var reproductor = videojs('fm-video', {
      fluid: true
    });
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
  
})
});
