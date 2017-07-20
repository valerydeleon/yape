
var cargarPagina = function(){
   $('.carousel.carousel-slider').carousel({fullWidth: true});
   validatePhoneNumber();
   $(document).on("keypress","#phone-number-input",validatePhoneNumber);
   $('#continue-btn').click(goToCodigoHtml);
}

var $phoneForm = $('#phone-form'); //toma el formulario
var $phoneNumberInput = $('#phone-number-input'); //toma el valor del input del telefono
var $termsNconditionsCheckbox = $('#termsNconditions-checkbox'); //toma el checkboxTel
var $continueBtn = $('#continue-btn'); //toma el boton continuar

var goToCodigoHtml = function(){
  location.href="views/../codigo.html";
}

var validatePhoneNumber = function(){
  var $phoneOk = $phoneNumberInput.val().length;
  if ($phoneOk === 10 && $termsNconditionsCheckbox.is(':checked')){
    console.log('checked')
    $continueBtn.removeClass('disabled');
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
