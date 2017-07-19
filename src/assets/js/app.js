$(document).ready(function(){
     $('.carousel.carousel-slider').carousel({fullWidth: true});
   });

$.post('http://localhost:3000/api/registerNumber',{
  "phone": "5543656168",
  "terms": true
}).then(function(response){
  console.log(response)
})
