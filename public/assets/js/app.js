(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var cargarPagina = function(){
   $('.carousel.carousel-slider').carousel({fullWidth: true});
   validatePhoneNumber();
}

var $phoneForm = $('#phone-form'); //toma el formulario
var $phoneNumberInput = $('#phone-number-input'); //toma el valor del input del telefono
var $termsNconditionsCheckbox = $('#termsNconditions-checkbox'); //toma el checkboxTel
var $continueBtn = $('#continue-btn'); //toma el boton continuar

$phoneNumberInput.keyup(validatePhoneNumber);

var validatePhoneNumber = function(){
  var $phoneOk = $phoneNumberInput.val().length;
  if ($phoneOk == 10){
    $termsNconditionsCheckbox.attr("checked", true);
    $continueBtn.removeAttr('disabled');
  }else {
    $termsNconditionsCheckbox.removeAttr('checked')
    $continueBtn.attr("disabled", true);
  }
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