const express = require('express'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const res = require('express/lib/response');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
 const Models = require('./models.js');
const req = require('express/lib/request');
const app = express();
const { check, validationResult } = require('express-validator');
require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const cors = require('cors');
app.use(cors());

const passport = require('passport');
require('./application/passport');
// Morgan middleware library in use to log all requests to the terminal
app.use(morgan('common'));
// Function to serve all static files inside one folder
app.use(express.static('public'));


  mongoose.connect(process.env.CONNECTION_URI , { useNewUrlParser: true, useUnifiedTopology: true }, console.log(" Connected to DB "));


const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;


app.get('/', (req, res) => {
res.send('Welcome to MyFlix');
});

//Get all movies on list
app.get('/movies', passport.authenticate('jwt', { session: false}), (req, res) => {
  Movies.find()
  .then((movies) => { 
  res.status(201).json(movies);
})
.catch((err) => {
  console.error(err);
  res.status(500).send("Error:" + err);
});
})

//Get all the users in list
app.get('/users', passport.authenticate('jwt', { session: false}), (req, res) => {
Users.find()
.then((users) => {
res.status(201).json(users);
})
.catch((err) => {
console.error(err);
res.status(500).send("Error:" + err);
});
})

// Get a user by username
app.get('/users/:Name', (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get a data about a movie by Title
app.get('/movies/:Title', (req, res) =>{
Movies.findOne({ Title: req.params.Title }) 
 .then((movies) => {
   res.json(movies);
 }) 
 .catch((error) => {
   console.error(err);
   res.status(500).send('Error:' + err);
 });
  
})

//Get description of a genre by name 
app.get('/movies/genre/:Name', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name }) 
   .then((movie) => {
     res.json(movie.Genre.Description);
   }) 
   .catch((err) => {
     console.error(err);
     res.status(500).send('Error:' + err);
   });
    
  })
//Get data about a director by name 
  app.get('/movies/director/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name }) 
     .then((movie) => {
       res.json(movie.Director);
     }) 
     .catch((err) => {
       console.error(err);
       res.status(500).send('Error:' + err);
     });
      
    })
  
//Add a new user if the user doesn't exist in list 
app.post('/users',
// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 3 characters are only allowed
[
  check('Name', 'Name is required').isLength({min: 3}),
  check('Name', 'Name contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
],

(req, res) => {
// check the validation object for errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Name: req.body.Name })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Name + ' already exists');
    }
    else {
      Users
      .create ({
        Name: req.body.Name,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) => {
        res.status(201).json(user) })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      })
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

//Add a movie to a user's list of favorites
app.post('/users/:Name/movies/:MovieID', (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);

  Users.findOneAndUpdate({ Name: req.params.Name }, {
    $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
  (err, updateUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    }
    else { 
      res.json(updateUser);
    }
  }
  );
})
//Update the Email Address of the user

app.put('/users/:Name', (req, res) => {
  Users.findOneAndUpdate({ Email: req.params.Email }, {$set:
  {
    Name: req.body.Name,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
  }, { new: true}, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error:' + err);
    }
    else{
      res.json(updatedUser);
    }
  }
  );
  })

//Delete a movie to a user's list of favorites
app.delete('/users/:Name/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name}, {
    $pull: {FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updateUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else{
      res.json(updateUser);
    }

  }
  )
})
//Delete a user by username
app.delete('/users/:Name', (req, res) => {
Users.findOneAndRemove({ Name: req.params.Name })
.then((user) => {
  if (!user) {
    res.status(400).send(req.params.Name + ' was not found');
  }
  else {
    res.status(200).send(req.params.Name + ' was deleted.');
  }
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
})

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
console.log('Listening on Port ' + port);
});
  

