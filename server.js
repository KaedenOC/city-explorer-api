'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require ('./modules/movies');


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

app.get('/weather', getWeather) ;


app.get('/movies', getMovies);



//CATCHALL endpoint should be last defined

app.get('*', (request, response) => {
  response.status(404).send('page does not exist');
});


app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
