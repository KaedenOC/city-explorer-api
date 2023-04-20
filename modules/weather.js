'use strict';
const axios = require('axios');


async function getWeather (request, response, next) {
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
}

class Forecast {
  constructor(obj) {
    this.date = obj.valid_date;
    this.description = obj.weather.description;
  }
}


module.exports = getWeather;
