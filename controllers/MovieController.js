const Movie = require("../models/Movie");

const AddMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "movie delete Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateMovie = async (req,res) =>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({success:true,message:"movie details update successfully"});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

const getAllMovies = async (req, res) => {
  try {
    const MovieData = await Movie.find();
    res.json(MovieData);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// const AddMovie = async (req, res) => {
//     try {
//         const { title, description, releaseDate, duration, rating } = req.body;

//         // Parse and validate inputs
//         const releaseDateParsed = new Date(releaseDate);
//         if (isNaN(releaseDateParsed)) {
//             return res.status(400).json({ success: false, error: "Invalid releaseDate format. Use a valid date format." });
//         }

//         const durationParts = duration.split(':');
//         if (durationParts.length !== 3) {
//             return res.status(400).json({ success: false, error: "Invalid duration format. Use HH:MM:SS format." });
//         }
//         const durationInMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

//         const NewMovie = await Movie.create({
//             title,
//             description,
//             releaseDate: releaseDateParsed,
//             duration: durationInMinutes,
//             rating,
//         });

//         if (NewMovie) {
//             res.status(201).json({ message: "Movie Added Successfully" });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

const getSearchMovie = async (req, res) => {
  try {
    const { Title } = req.query;
    if (!Title) {
      return res.status(400).json({ message: "Please provide a search query" });
    }
    
    if(Title)
    {
      var movies = await Movie.find({Title: { $regex: Title, $options: "i" }});
    }
    

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found matching the query" });
    }

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Sort movies by name, rating, release date, or duration
const getsortedMovie = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const validSortFields = ["Title", "imdbRating", "Released", "Runtime"];
    if (!validSortFields.includes(sortBy)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid sort field. Choose from Title, imdbRating, Released, or Runtime.",
        });
    }

    const sortOrder = order === "desc" ? -1 : 1;
    const movies = await Movie.find().sort({ [sortBy]: sortOrder });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMovies,
  AddMovie,
  getSearchMovie,
  getsortedMovie,
  deleteMovie,
  UpdateMovie
};
