const express = require('express'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const res = require('express/lib/response');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
 const Models = require('./models.js');
const req = require('express/lib/request');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Morgan middleware library in use to log all requests to the terminal
app.use(morgan('common'));
// Function to serve all static files inside one folder
app.use(express.static('public'));


 mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;


app.get('/', (req, res) => {
res.send('Welcome to MyFlix');
});

//Get all movies on list
app.get('/movies', (req, res) => {
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
app.get('/users', (req, res) => {
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
  Movies.findOne({'Genre.Name': req.params.Name }) 
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
app.post('/users', (req, res) => {
  Users.findOne({ Name: req.body.Name })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Name + ' already exists');
    }
    else {
      Users
      .create ({
        Name: req.body.Name,
        Password: req.body.Password,
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

//Add a movie to a user's list of favorites
app.post('/users/:Name/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, {
    $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
  (err, updateUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else { 
      res.json(updateUser);
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

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
  });
  
  

