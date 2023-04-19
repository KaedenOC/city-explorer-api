'use strict';

const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let weatherData = require('./data/weather.json');
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

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let searchQuery = request.query.searchQuery;

    let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    let weatherData = await axios.get(weatherUrl);


    let dataToSend = weatherData.data.data.map(day => new Forecast(day));

    // console.log(dataToSend);

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

// TODO: BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API

// TODO: ACCEPT OR DEFINE MY QUERIES -> /weather?searchQuery=cityName

// TODO: BUILD OUT MY URL TO PASS TO AXIOS -> REQUIRE AXIOS AT TOP

// TODO: STORE AXIOS DATA IN A VARIABLE

// TODO: TAKE RESULT FROM AXIOS AND GROOM IT WITH MY CLASS

// TODO: GROOMED DATA AND SEND IT IN THE RESPONSE

// TODO: BUILD MOVIE CLASS





//CATCHALL endpoint should be last defined

app.get('*', (request, response) => {
  response.status(404).send('page does not exist');
});


app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
