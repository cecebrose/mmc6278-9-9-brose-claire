let form = document.querySelector("form");
let section = document.getElementById("weather");
let input = document.getElementById("weather-search");
let api_key = "5375209b9131baec10badd8a3dc57e54";
form.onsubmit = async(e) => {
    console.log("submitting");
    e.preventDefault();
    let query = input.value;
    console.log(query);
    input.value = "";
    section.innerHTML = "";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${api_key}&q=${query}`;
let response= await fetch (apiUrl)
let data= await response.json();
if ((data.cod && data.cod !== 200) || data.data) {
locationNotFound();
return;
};

   renderCity(data)
};

const locationNotFound=() => {
    console.log("calling not found");
    let h2 = document.createElement("h2");
    h2.textContent = "Location Not Found";
    section.replaceChildren(h2);
};
const renderCity=({
    name, sys:{country}, coord:{lat, lon}, weather, main:{temp, feels_like}, dt
}) =>{
const {icon, description}= weather[0];
    console.log("rendering: ", section);
    let cityName = document.createElement("h2");
    cityName.innerHTML = `${name}, ${country}`;

 let mapLink = document.createElement("a");
 mapLink.textContent = "Click to view map";
 mapLink.target ="__BLANK";
 mapLink.href =`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

 let conditionIcon = document.createElement("img");
 conditionIcon.src =
   `https://openweathermap.org/img/wn/${icon}@2x.png`;

 let condition = document.createElement("p");
 condition.innerHTML = description;
 let currentTemp = document.createElement("p");
 currentTemp.innerHTML = `Current temp: ${temp}&deg; F`;

 let feelsLike = document.createElement("p");
 feelsLike.innerHTML = `Feels like: ${feels_like}&deg; F`;

 let date = new Date(dt * 1000);
 let timeString = date.toLocaleString("en-US", {
     hour: "numeric",
     minute: "2-digit",
 });

 let currentTime = document.createElement("p");
 currentTime.innerHTML = timeString;
 section.replaceChildren(
     cityName,
     mapLink,
     conditionIcon,
     condition,
     currentTemp,
     feelsLike,
     currentTime,
 )};

 



