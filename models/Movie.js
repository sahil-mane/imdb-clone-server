const { mongoose } = require("mongoose");

// const MovieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   releaseDate: { type: Date },
//   duration: { type: Number }, // in minutes
//   rating: { type: Number },
// });

const movieSchema = new mongoose.Schema({
    Title: { type: String },
    Year: { type: Number },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Writer: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Language: { type: String },
    Country: { type: String },
    Awards: { type: String },
    Poster: { type: String },
    Ratings: [
      {
        Source: { type: String },
        Value: { type: String }
      }
    ],
    Metascore: { type: Number,default:Math.floor(Math.random() * 100)},
    imdbRating: { type: Number,default:(Math.random()*10).toFixed(1)},
    imdbVotes: { type: String,default:Math.floor(Math.random() * 10000000) + 1 },
    imdbID: { type: String,default:'tt'+Math.floor(Math.random() * 10000000) + 1},
    Type: { type: String },
    DVD: { type: String },
    BoxOffice: { type: String },
    Production: { type: String },
    Response: { type: String,default:false }
  });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
