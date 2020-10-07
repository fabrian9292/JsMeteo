
import './style.css';
import 'bootstrap';
import 'lodash'



const input = document.getElementById('valore');
const spanSectionRight = document.querySelectorAll('p span')
const sectionLeft = document.querySelector('.section-left p')
const objGooglePlaceAutocomplete = new google.maps.places.Autocomplete(input);



let objCordinate = {lat: null, lng: null, città: null, campoCittà: false}
let openWeatherApi = Object.create(objCordinate)
let googleMapsGeocodeApi = Object.create(objCordinate)

openWeatherApi.link = function (){
return `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&units=metric&appid=${process.env.OPENWEATHERAPI}`
}

googleMapsGeocodeApi.cordinate = function (){
return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${objCordinate.lat},${objCordinate.lng}&key=${process.env.APIGOOGLEMAPS}`
}

googleMapsGeocodeApi.città = function (){
return `https://maps.googleapis.com/maps/api/geocode/json?&address=%${objCordinate.città}&key=${process.env.APIGOOGLEMAPS}`;
}

//Qui effetto la geolocalizzazione della posizione

let trovaPosizione =  (function() {
     let navigatore = Object.create(navigator)
     let geoLoc = navigator.geolocation

     geoLoc.getCurrentPosition(successful,error);

    async function successful (p){
       objCordinate.lat = p.coords.latitude;
       objCordinate.lng = p.coords.longitude;
       googleMapsGeocodeApi.cordinate()
       objCordinate.città = await fetch(googleMapsGeocodeApi.cordinate()).then((risp) => {return risp.json()}).then((risp) => {return risp.results[5].address_components[0].long_name})
       sectionLeft.innerText = objCordinate.città
       dammiMeteo(openWeatherApi.link())
     }

       function error (p){}
})()

//Funzione autocomplete per prendere in input le città

function googleAutocomplete(){
   google.maps.event.addListener(objGooglePlaceAutocomplete, 'place_changed', function(){
      let place = objGooglePlaceAutocomplete.getPlace();
      sectionLeft.innerText = place.formatted_address
      objCordinate.città = place.name;
      objCordinate.lat = place.geometry.location.lat();
      objCordinate.lng = place.geometry.location.lng();
      dammiMeteo(openWeatherApi.link())

      })
}

googleAutocomplete();





// Ho le cordinate e apro una richiesta a openWeather

function dammiMeteo(openWeatherApi){
  fetch(openWeatherApi).then((risp) => {
     risp = risp.json()
     return risp

 })
 .then((risp) =>{
        let tempMin = Math.round(risp.daily[0].temp.min,2)
        const tempMax = Math.round(_.get(risp, 'daily[0].temp.max', 0), 2)
        let tempDay = Math.round(risp.daily[0].wind_speed, 2)
        let mainTemp = risp.daily[0].weather[0].main



        spanSectionRight[0].innerText = tempDay
        spanSectionRight[1].innerText = tempMax
        spanSectionRight[2].innerText = tempMin
        spanSectionRight[3].innerText = mainTemp;
 })
}
