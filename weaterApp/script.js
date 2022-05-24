const api ={
    key: '28b7fbcfdddcb7db5970246d67fcaacb',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
const searchBox = document.querySelector(".search-box")
searchBox.addEventListener("keypress", setQuery)
function setQuery(e){
    if(e.keyCode === 13){
        getResult(searchBox.value)
        console.log(searchBox.value)
    }
}
function getResult(query){
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(displayResult);
}

function displayResult(weather){
    console.log(weather)
    let city = document.querySelector(".location .city")
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    let now = new Date()
    let date = document.querySelector(".location .date")
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp")
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`
    let weatherEl = document.querySelector(".weather")
    weatherEl.innerHTML = weather.weather[0].main;
    let hiLow = document.querySelector(".high-low")
    hiLow.innerHTML = `${Math.floor(weather.main.temp_min)}°C / ${Math.ceil(weather.main.temp_max)}°C`
}
function dateBuilder(now){
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    return`${day} ${date} ${month} ${year}`;
}