const apiKEY = "5613eebc7d0463f55490589b65f0b5c9";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";

//Fetch The weather Data
const requestCity = async (city) => {
  const res = await fetch(`${apiURL}?q=${city}&appid=${apiKEY}`);
  const data = await res.json();

  return data;
};

//Convert To Celcius
function converTemperature(kelvin) {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
}

const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search_button");

//Event listener for serach button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchForm.value == "") {
    alert("Please type a City Name");
  }
  const citySearch = searchForm.value.trim();

  requestCity(citySearch).then((data) => {
    if (data.cod == 404) {
      document.getElementById("location").innerText = "UnKnown Location !!!";
    } else {
      document.getElementById("location").innerText = data.name;
      document.getElementById("temperature").innerText = converTemperature(
        data.main.temp
      );
      document.getElementById("celci-icon").innerText = `°C`;
      document.getElementById("lead").innerText = data.weather[0].main;
      document
        .getElementById("icon")
        .setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
      document.getElementById("search-form").value = "";
    }
  });
});
