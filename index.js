const express = require('express');
morgan = require('morgan');

const app = express();

const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

let favouriteMovies = [
  {
    movie: 'Harry Potter',
    actor: 'Daniel Radcliffe'
  },
  {
    movie: 'The Lord of the Rings',
    actor: 'Elijah Wood'
  },
  {
    movie: 'Interstellar',
    actor: 'Matthew McConaughey'
  },
  {
    movie: 'Inception',
    actor: 'Leonardo DiCaprio'
  },
  {
    movie: 'The Imitation Game',
    actor: 'Benedict Cumberbatch'
  },
  {
    movie: 'The Theory of Everything',
    actor: 'Eddie Redmayne'
  },
  {
    movie: 'The Fault in Our Stars',
    actor: 'Ansel Elgort'
  },
  {
    movie: 'Shutter Island',
    actor:  'Leonardo DiCaprio'
  },
  {
    movie: 'Finding Nemo',
    actor: 'Andrew Stanton'
  },
  {
    movie: 'The Intouchables',
    actor: 'Omar Sy'
  }
];

app.use(morgan('common'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());


app.get('/', (req, res) => {
res.send('Welcome to my favourite MovieList');
});

app.get('/movies', (req, res) => {
res.json(favouriteMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});


app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});
