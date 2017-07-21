
var cargarPagina = function(){
   $('.carousel.carousel-slider').carousel({fullWidth: true});
   $phoneNumberInput.keyup(validatePhoneNumber); //valida el numero
   $('#continue-regiter-btn').click(validatePhoneForm, goToCodigoHtml); //al dar click valida el formulario y redirige a codigo.html
   $phoneForm.submit(validatePhoneForm); //al mandar formulario valida formulario
   $('#codeInLocal').append('<p>' + localStorage.userPhoneNumber + '</p>'); //
   $verificationCodeInput.keyup(validatingCode); //valida el codigo
   timer();
};

var url = "http://localhost:3000/api/registerNumber"; //url de api
var codeUrl = "views/../codigo.html"
var $phoneForm = $('#phone-form'); //toma el formulario
var $phoneNumberInput = $('#phone-number-input'); //toma el input del telefono
var $termsNconditionsCheckbox = $('#termsNconditions-checkbox'); //toma el checkboxTel
var $continueBtn = $('#continue-regiter-btn'); //toma el boton continuar

// variables codigo
var urlCode = "http://localhost:3000/api/resendCode"; //url de api
var $verificationCodeInput = $('#user-verification-code'); // toma el input del codigo
var getUserPhoneNumber = localStorage.userPhoneNumber; //obtenemos la data guardada del usuario
$('#phone-number-input').text(localStorage.phone);

//////////////// REGISTRO USUARIO ///////////////
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
var registerNumberApi = function($phoneNumber){
  $.post(url,{
    "phone": $phoneNumber,
    "terms": true,
  }, function(response){
    validatePhoneNumberOK(response) // valida la respuesta con el numero
  });
};

// valida que sea un dato correcto y manda llamar la funcion del codigo del usuario en codigo.htlm
var validatePhoneNumberOK = function(response){
  if (response.message != "Usuario válido") {
    alert('Teléfono registrado')
  }else {
    userCodeValidation(response);
    alert("Codigo de verificación: " + localStorage.getItem("userCodeToVerification"));
    location.href = "codigo.html";
  };
};

// funcion que gusrada el telefono y codigo de usuario
var userCodeValidation = function (response){
  console.log(response.data.code);
  localStorage.setItem("userCodeToVerification", response.data.code); //guarda el codigo de verificacion de la api
  localStorage.setItem("algoNumber", response.data.phone); //guarda el numero telefonico ingresado por el usuario a la api
  return response;
};


// obtencion del api
var getNewUserCode = function(){
  $.post(url,{
    "phone": $phoneNumberInput.val(),
    "terms": true,
  }, function(response){
    console.log(response)
    if (response.message === "Usuario válido") {
      localStorage.setItem('code', response.data.code); //guarda el codigo de verificacion de la api accediendo al objeto
      localStorage.setItem('phone', response.data.phone); //guarda el telefono de la api accediendo al objeto
      alert(response.data.code)
    }//else {
    //   alert(response.message);
    // }
  });
};

// funcion que valida el codigo de la api con el ingresado y para los 21 seg
var validatingCode = function(){
  var $userCode = localStorage.getItem('code'); // obtine el codigo de la api
  if ($verificationCodeInput.val() === $userCode) { //iguala los valores
    clearInterval(timer); //para el contador de tiempo de la funcion timer
    location.href="views/../user.html"; // redirige a la pantalla de user
  };
};

// funcion que establese los 21 segundos
var timer = function(){
  setInterval(function(){ // inicia el intervalo de tiempo
    getNewUserCode()}, // llama a la funcion que obtiene el codigo de la api
    21000); // 21 seg
};

// funcion que muestra mediante alert el nuevo codigo al usuario
var showUserNewVerificationCode = function (code){
  localStorage.userCodeToVerification = code.data; // retorna el valor gurdado en el localStorage
  var $newUserCode = localStorage.userCodeToVerification;  // se guarda e un avariable la info
  alert('Este es tu nuevo código: ' + $newUserCode); // se muestra el codigo con un alert
  $verificationCodeInput.val(""); //deja vacio el input
};


// var userData = function(data){
//   localStorage.phone = data.phone;
//   localStorage.code = data.code;
// }

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
