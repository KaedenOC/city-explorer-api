'use strict';
const axios = require('axios');



async function getMovies(request, response, next) {
  try {
    // TODO: ACCEPT OR DEFINE MY QUERIES -> /weather?city=VALUE
    let myCity = request.query.city;

    // TODO: BUILD OUT MY URL TO PASS TO AXIOS -> REQUIRE AXIOS AT TOP
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${myCity}`;

    // TODO: STORE AXIOS DATA IN A VARIABLE
    let moviesFromAxios = await axios.get(movieUrl);

    // TODO: TAKE RESULT FROM AXIOS AND GROOM IT WITH MY CLASS
    let dataToSend = moviesFromAxios.data.results.map(obj => new Movie(obj));

    // TODO: GROOMED DATA AND SEND IT IN THE RESPONSE
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
}

// TODO: BUILD MOVIE CLASS

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.imgURL = movieObj.poster_path;
    this.overView = movieObj.overview;
  }
}

module.exports = getMovies;
