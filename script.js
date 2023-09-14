const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "7309e4a5829fafe809df835ad95f18ea"

const city = document.getElementById("location")
const temperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const wind = document.getElementById("todaysWind")
const icon = document.getElementById("icon")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")
const cityQuery = "Tokyo, Japan"

const fetchWeather = () => {
  fetch(`${BASE_URL}?q=${cityQuery}&units=metric&APPID=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = cityQuery
      temperature.innerHTML = `${data.main.temp} C°`
      calculateSunrise(data)
    })
}

fetchWeather()

const calculateSunrise = (data) => {
  const unixTimestamp = data.sys.sunrise //seconds
  const sunriseTimestamp = unixTimestamp * 1000 //milliseconds
  const sunriseDate = new Date(sunriseTimestamp) //date
  const userTime = sunriseDate.toLocaleTimeString([], { timeStyle: 'short' })


  const timezone = data.timezone
  const offset = new Date().getTimezoneOffset() * 60 //Offset in seconds
  const sunriseInSeconds = unixTimestamp + timezone + offset
  const sunriseInMilliseconds = sunriseInSeconds * 1000
  const sunriseLocalDate = new Date(sunriseInMilliseconds)
  const localTime = sunriseLocalDate.toLocaleTimeString([], { timeStyle: 'short' })

  console.log(localTime)
}