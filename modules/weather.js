'use strict';
const axios = require('axios');

let cache = {};

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = `lat:${lat}-lon:${lon}`;


    if (cache[key] && (Date.now() - cache[key].timeStamp) < 8.64e+7) {
      
      response.status(200).send(cache[key].data);
      console.log('hit cache', cache);


    } else {
      let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

      let weatherData = await axios.get(weatherUrl);

      let dataToSend = weatherData.data.data.map(day => new Forecast(day));

      cache[key] = {
        data: dataToSend,
        timeStamp: Date.now(),
      };
      response.status(200).send(dataToSend);
    }
    // console.log(dataToSend);



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
