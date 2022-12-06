var searchInput = document.querySelector('#app .search input')
var searchBtn = document.querySelector('#app .search button')
var setTemp= document.querySelector('article .temp-cnt .temp .deg')
var setSunset = document.getElementById('sunset')
var setHumidity = document.getElementById('humidity')
var setPressure = document.getElementById('pressure')
var setWind = document.getElementById('wind')
var setCity = document.getElementById('city')
var setCountry = document.getElementById('country')
var setCon = document.getElementById('con')
var body = document.querySelector('body')

dateFunction();

searchBtn.addEventListener( 'click', function(e){
    e.preventDefault()
    getData()
} )

// ===[ Fetch Data Function ]===
function getData(){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=d982efa98b33c091c1485aecd3251071`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, humidity, pressure } = data.main;
          const { name } = data;
          const { speed } = data.wind;
          const { main: weatherhood } = data.weather[0];
          const { country, sunset } = data.sys;
  
          const newWeatherInfo = {
            temp,
            humidity,
            pressure,
            name,
            speed,
            weatherhood,
            country,
            sunset,
          };

          let sec = newWeatherInfo.sunset;
          let date = new Date(sec * 1000);
          let timeStr = `${date.getHours()}:${date.getMinutes()}`;

          setTemp.innerHTML = newWeatherInfo.temp+"&#176;";
          setSunset.innerHTML = timeStr;
          setHumidity.innerHTML = newWeatherInfo.humidity;
          setPressure.innerHTML = newWeatherInfo.pressure;
          setWind.innerHTML = newWeatherInfo.speed;
          setCity.innerHTML = newWeatherInfo.name+",";
          setCountry.innerHTML = newWeatherInfo.country;
          setCon.innerHTML = newWeatherInfo.weatherhood;
          
      if (newWeatherInfo.temp <= 5) {
          body.style.backgroundImage= 'url("images/Snow.jpg")';
        }else if(newWeatherInfo.temp >= 6 & newWeatherInfo.temp <= 28) {
          body.style.backgroundImage= 'url("images/Haze.jpg")';
        }else if(newWeatherInfo.temp >= 29 & newWeatherInfo.temp <= 40) {
          body.style.backgroundImage= 'url("images/Clear.jpg")';
        }else{
          body.style.backgroundImage= 'url("images/Cloud.jpg")';
        }
        });
}

//===[ Set Date Funtion ]===
function dateFunction() {
    var dateTime = new Date().toLocaleString()
    var setDateTime=document.getElementById('date');
    setDateTime.innerHTML=dateTime
}


