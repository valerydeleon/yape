(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var cargarPagina = function(){
  //  $('.carousel.carousel-slider').carousel({fullWidth: true});
   $phoneNumberInput.keyup(validatePhoneNumber); //valida el numero
   $('#continue-regiter-btn').click(validatePhoneForm, goToCodigoHtml); //al dar click valida el formulario y redirige a codigo.html
   $phoneForm.submit(validatePhoneForm); //al mandar formulario valida formulario
   $('#codeInLocal').append('<p>' + localStorage.userPhoneNumber + '</p>'); //
}
var url = "http://localhost:3000/api/registerNumber"; //url de api
var codeUrl = "views/../codigo.html"
var $phoneForm = $('#phone-form'); //toma el formulario
var $phoneNumberInput = $('#phone-number-input'); //toma el valor del input del telefono
var $termsNconditionsCheckbox = $('#termsNconditions-checkbox'); //toma el checkboxTel
var $continueBtn = $('#continue-regiter-btn'); //toma el boton continuar

//funcion que redirige a la url de api
var goToCodigoHtml = function(){
  location.href="views/../codigo.html"
};

//valida formulario
var validatePhoneForm = function(event){
  event.preventDefault()
  var $phoneOk = $phoneNumberInput.val();
  if ($phoneOk.length == 10 && $termsNconditionsCheckbox.is(':checked')){
    var response = registerNumberApi($phoneOk);
  }//else {
  //   alert('¡Error!, Acepte los Términos y Condiciones o verifique el número telefónico')
  // }
};

//valida numero telefonico
//codigo acii 0=48 -> 9=57
var validatePhoneNumber = function(event){
  var asciiCode = event.keyCode; //obtiene el codigo de teclado
  if (asciiCode != 13) {
    if ($phoneNumberInput.val().length > 9 || asciiCode <= 48 || asciiCode >= 57) {
      // si el valor del input es mayor a 9, asciiCode es del 48 al 57 (0 al 9)
      return false;
    }else if (isNaN(event.key)) {
      // si no es un numero
      return false;
    }else if ($phoneNumberInput.val().length == 9) {
      $continueBtn.removeClass('disabled');
      // si el codigo ingresado es igual a 9 caracteres remover la clase de desabiltado
      return true;
    };
  };
};

// obtencion del api
var registerNumberApi = function(phoneNumber){
  $.post(url,{
    "phone": phoneNumber,
    "terms": true
  }, function(response){
    validatePhoneNumberOK(response) // valida la respuesta con el numero
  });
};

// valida que sea un dato correcto y manda llamar la funcion del codigo del usuario en codigo.htlm
var validatePhoneNumberOK = function(response){
  if (response.message != "Valid User") {
    alert('Teléfono registrado')
  }else {
    userCodeValidation(response);
    alert("Codigo de verificación: " + localStorage.getItem("userCodeToVerification"));
    location.href = "codigo.html";
  };
};

// funcion que gusrada el telefono y codigo de usuario
var userCodeValidation = function (){
  // console.log(response.data.code);
  localStorage.setItem("userCodeToVerification", response.data.code); //guarda el codigo de verificacion de la api
  localStorage.setItem("userPhoneNumber", response.data.phone); //guarda el numero telefonico ingresado por el usuario a la api
  return response;
};

$(document).ready(cargarPagina);

//   $('#phoneForm').submit(function(){
//     if($('#phoneNumber').val().length < 1){
//       alert("Ingrese número telefónico");
//       return false;
//     }
//     else if (isNAn($('#phoneNumber').val())) {
//       alert("Escriba sólo números");
//       return false;
//     }
//     else if ($('#phoneNumber').val().length < 10) {
//       alert("Escriba su número a 10 dígitos. ejemplo: 55 12 34 56 78")
//       return false;
//     }
//     return false;
//   });
// });
// }
//
// $.post('http://localhost:3000/api/registerNumber',{
//   "phone": "5543656168",
//   "terms": true
// }).then(function(response){
//   console.log(response)
// })

},{}]},{},[1])