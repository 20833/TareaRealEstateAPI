//Variables Publicas
var long, lat;
//Obtener Coordenadas - Based on W3 Code.
$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(savePosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
//Guardar el resultado de obtener posiciones
function savePosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

//Group of variable to writte into the TABLE -> https://youtu.be/jwaV_YZMIqY 
var vars;
var city;
var humidity;
var temp;
var wind;
var iconcode;
var iconurl;


//Call al presionar en cualquier zona de la tabla
$(document).ready(function(){
  $("#tiempo").click(function(){
//Ajax & API Call
    $.ajax({
   type: "GET",
   url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=35c8a067d419bd9647db144bc5e892bb",
   dataType: "json",
   success: function (data) {
      vars = data;
      city = vars.name;
      temp = vars.main.temp;
      humidity = vars.main.humidity;
      wind = vars.wind.speed;
      iconcode = vars.weather[0].icon;
      iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
   },
   error: function (jqXHR, textStatus, errorThrown) {
      alert("Se ha producido un error ");
   }
});
    $("#cityname").text("" + city);
    $("#temp").text("" + temp);
    $("#humid").text("" + humidity + "%");
    $("#wind").text("" + wind);
    //Image
    $('#wicon').attr('src', iconurl);
  });
});