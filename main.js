var celsius = true;
var r;

function loadDoc(lat, lon) {
  var weather = new XMLHttpRequest();
  weather.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      r = JSON.parse(this.responseText);
      document.getElementById("location").innerHTML = r.name + ', ' + r.sys.country;
      document.getElementById("temp").innerHTML = r.main.temp;
      document.getElementById("picture").innerHTML = "<img class='img-responsive pic' src=" + r.weather[0].icon + ">";
      document.getElementById("description").innerHTML = r.weather[0].description;
      document.getElementById("symbol").innerHTML = "&#8451";
    }
  };
  weather.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&" + "lon=" + lon, true);
  weather.send();
}

function convertTemp(){
    if(celsius){
      document.getElementById("temp").innerHTML = (r.main.temp * 9/5) + 32;
      document.getElementById("symbol").innerHTML = "&#8457";
      celsius = false;
    }
    else{
      document.getElementById("temp").innerHTML = r.main.temp;
      document.getElementById("symbol").innerHTML = "&#8451";
      celsius = true;
    }
}

$(document).ready(function(){
  var lat;
  var lon;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      loadDoc(lat,lon);
    });
  }
});
