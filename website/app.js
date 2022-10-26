/* Global Variables */
const API_KEY = '4c78cc8e478223d16b16f9939ae05c6a';
const UNITS = 'imperial';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const url = `${BASE_URL}zip=94040,us&appid=${API_KEY}&units=${UNITS}`;
const feelings = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
const projectData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const gatherData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  projectData.tempertaure = data.main.temp;
  projectData.date = newDate;
  projectData.feelings = feelings.value;
  console.log(projectData);
  return projectData;
};

const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      tempertaure: data.tempertaure,
      date: data.date,
      feelings: data.feelings,
    }),
  });
};

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log('from getData', data);
  return data;
};

generateBtn.addEventListener('click', async () => {
  await gatherData(url).then((response) => {
    postData('/weather', response);
  });
  getData('/weather');
});
