/* Global Variables */
const API_KEY = '4c78cc8e478223d16b16f9939ae05c6a';
const UNITS = 'metric';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const generateBtn = document.getElementById('generate');
const projectData = {};

/**
 * this function produces today's date in mm-dd-yyyy format
 * @returns today's date in mm-dd-yyyy format
 */
const getTodaysDate = () => {
  let d = new Date();
  let newDate = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
  return newDate;
};

/**
 * this function builds the API endpoint - base + zip + key + untis
 * @param base the base url of the API
 * @param zip zip code entered by user
 * @param key API key
 * @param units units of data received the API
 * @returns custom API endpoint
 */
const getAPIUrl = (base, zip, key, units) => {
  return `${base}zip=${zip},us&appid=${key}&units=${units}`;
};

/**
 * This function collects data from Weather API and user and saves
 * everything in an object (projectData)
 * @param url - API endpoint
 * @returns an object containing API data + user response
 */
const gatherData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    projectData.tempertaure = data.main.temp;
    projectData.date = getTodaysDate();
    projectData.feelings = document.getElementById('feelings').value;
    return projectData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * this function sends the gathered data to the server side
 * @param url post route (/info)
 * @param data gathered data
 */
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

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function fetches data from the app endpoint
 * @param url /info
 * @returns data fetched from the app endpoint
 */
const retrieveData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * this function updates the page with data fetched from app endpoint
 * @param data data fetched from the app endpoint
 */
const updateUI = (data) => {
  document.getElementById('date').textContent = `Date: ${data.date}`;
  document.getElementById(
    'temp'
  ).textContent = `Temperature: ${data.tempertaure}C`;
  document.getElementById('content').textContent = `Feeling: ${data.feelings}`;
};

/**
 * An event handler which is exexuted the "generate" button is clicked
 *
 */
const handleClick = async () => {
  const zipcodeValue = document.getElementById('zip').value;
  const url = getAPIUrl(BASE_URL, zipcodeValue, API_KEY, UNITS);

  // gather all data then posted to the app endpoint
  await gatherData(url).then((response) => {
    postData('/info', response);
  });

  // get the data from the app end point the update the page
  retrieveData('/info').then((data) => {
    updateUI(data);
  });
};

generateBtn.addEventListener('click', handleClick);
