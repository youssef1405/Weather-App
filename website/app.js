/* Global Variables */
const API_KEY = '4c78cc8e478223d16b16f9939ae05c6a';
const UNITS = 'imperial';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const url = `${BASE_URL}zip=94040,us&appid=${API_KEY}&units=${UNITS}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeatherData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.main.temp);
};

getWeatherData(url);
