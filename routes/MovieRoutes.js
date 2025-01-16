const express = require('express');
const { getAllMovies, AddMovie, getSearchMovie, getsortedMovie, deleteMovie, UpdateMovie } = require('../controllers/MovieController');
const VerifyToken = require('../middleware/VerifyToken');
const checkAdmin = require('../middleware/checkAdmin');
const MovieRouter = express.Router();


MovieRouter.get('/',getAllMovies);
MovieRouter.get('/search',getSearchMovie);
MovieRouter.get('/sorted',getsortedMovie);
//admin permission route
MovieRouter.post("/",VerifyToken,checkAdmin,AddMovie);
MovieRouter.delete("/:id",VerifyToken,checkAdmin,deleteMovie);
MovieRouter.patch("/:id",VerifyToken,checkAdmin,UpdateMovie);

module.exports = MovieRouter;
