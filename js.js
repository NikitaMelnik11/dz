// npm init -y
// npm install express body-parser


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let movies = [
  { id: 1, title: "The Shawshank Redemption", genre: "Drama", director: "Frank Darabont", year: 1994 },
  { id: 2, title: "The Godfather", genre: "Crime", director: "Francis Ford Coppola", year: 1972 },
  { id: 3, title: "Pulp Fiction", genre: "Crime", director: "Quentin Tarantino", year: 1994 },
  { id: 4, title: "The Dark Knight", genre: "Action", director: "Christopher Nolan", year: 2008 },
  { id: 5, title: "Inception", genre: "Action", director: "Christopher Nolan", year: 2010 }
];

// GET /movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// POST /movies
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length + 1;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT /movies/:id
app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;
  const index = movies.findIndex(m => m.id === movieId);

  if (index !== -1) {
    movies[index] = { id: movieId, ...updatedMovie };
    res.json(movies[index]);
  } else {
    res.status(404).send('Movie not found');
  }
});

// PATCH /movies/:id
app.patch('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedFields = req.body;
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    Object.assign(movie, updatedFields);
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// DELETE /movies/:id
app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = movies.findIndex(m => m.id === movieId);

  if (index !== -1) {
    movies.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Movie not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// node server.js



