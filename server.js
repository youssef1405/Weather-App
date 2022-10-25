// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(3000, () => {
  console.log('listening on port 3000');
});

// Routes
app.get('/weather', (req, res) => {
  console.log('get');
  res.send(projectData);
});

app.post('/weather', (req, res) => {
  projectData = { ...req.body };
  res.send('post');
});
