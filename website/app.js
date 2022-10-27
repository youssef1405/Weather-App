/* Global Variables */
const API_KEY = '4c78cc8e478223d16b16f9939ae05c6a';
const UNITS = 'imperial';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const generateBtn = document.getElementById('generate');
const projectData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();

const getAPIUrl = (base, zip, key, units) => {
  return `${base}zip=${zip},us&appid=${key}&units=${units}`;
};

const gatherData = async (url) => {
  const feelingsInputvalue = document.getElementById('feelings').value;

  const response = await fetch(url);
  const data = await response.json();
  projectData.tempertaure = data.main.temp;
  projectData.date = newDate;
  projectData.feelings = feelingsInputvalue;
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

const updateUI = (data) => {
  // console.log(data);
  const dateHolder = document.getElementById('date');
  const tempHolder = document.getElementById('temp');
  const feelingHolder = document.getElementById('content');

  dateHolder.textContent = `Date: ${data.date}`;
  tempHolder.textContent = `Temperature: ${data.tempertaure}`;
  feelingHolder.textContent = `Feeling: ${data.feelings}`;
};

generateBtn.addEventListener('click', async () => {
  const zipcodeValue = document.getElementById('zip').value;
  const url = getAPIUrl(BASE_URL, zipcodeValue, API_KEY, UNITS);
  await gatherData(url).then((response) => {
    postData('/weather', response);
  });

  getData('/weather').then((data) => {
    updateUI(data);
  });
});
