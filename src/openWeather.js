function dammiMeteo(openWeatherApi){
  fetch(openWeatherApi).then((risp) => {
     risp = risp.json()
     return risp

 })
 .then((risp) =>{
        let tempMin = Math.round(risp.daily[0].temp.min,2)
        let tempMax = Math.round(risp.daily[0].temp.max,2)
        let tempDay = Math.round(risp.daily[0].wind_speed, 2)
        let mainTemp = risp.daily[0].weather[0].main



        spanSectionRight[0].innerText = tempDay
        spanSectionRight[1].innerText = tempMax
        spanSectionRight[2].innerText = tempMin
        spanSectionRight[3].innerText = mainTemp;
 })
}
