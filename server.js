'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let weatherData = require('./data/weather.json');
// console.log(weatherData);


// app === server - need to call Express to create server
const app = express();

// MIDDLEWARE - allow anyone to hit our server

app.use(cors());


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`yay connecting to server ${PORT}`));

// ENDPOINTS
// 1st arg - endpoint url as a string
//2nd arg - callback - will execute when that endpoint is hit
// 2 params, request, response

app.get('/weather', (request, response, next) => {
  try {
    // const lat = request.query.lat;
    // const lon = request.query.lon;
    let searchQuery = request.query.searchQuery;



    let cityName = weatherData.find(city => city.city_name === searchQuery);

    let dataToSend = cityName.data.map(day => new Forecast(day));

    console.log(dataToSend);

    response.status(200).send(dataToSend);


  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
});

class Forecast {
  constructor(obj) {
    this.date = obj.valid_date;
    this.description = obj.weather.description;
  }
}







//CATCHALL endpoint should be last defined

app.get('*', (request, response) => {
  response.status(404).send('page does not exist');
});


app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
