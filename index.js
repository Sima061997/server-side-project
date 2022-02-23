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
  

//Add a new user 
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
  
  

/*
const express = require('express');
 
 morgan = require('morgan');
const bodyParser = require('body-parser'),
 uuid = require('uuid');
const res = require('express/lib/response');

app = express();

app.use(bodyParser.json());

app.use(morgan('common'));
app.use(express.static('public'));

  
 s

app.use((err, req, res,next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
res.send('Welcome to my favourite MovieList!!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

//CREATE new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  if(newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }
  else {
    res.status(400).send('users need name')
  }
})

//UPDATE the name of user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  }
  else {
    req.status(400).send('no such user');
  }
})

//CREATE favorite movie to the user according to id
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
   user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  }
  else {
    req.status(400).send('no such user');
  }
})

//DELETE delete the favoritemovie according to id
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
   user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  }
  else {
    req.status(400).send('no such user');
  }
})

//DELETE the user according to id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id);
   //res.json(users);
    res.status(200).send(`${id} has been deleted`);;
  }
  else {
    req.status(400).send('no such user');
  }
})

//READ the list of all movies with it's details
app.get('/movies', (req, res) => {
   res.status(200).json(movies);
});

//READ the detail of the movie according to it's title
app.get('/movies/:Title', (req, res) => {
const { Title } = req.params;
const movie = movies.find( movie => movie.Title === Title);

if (movie) {
  res.status(200).json(movie);
}
else{
  res.status(400).send('no such movie');
}
});
 
//READ the genre of a movie according to genre name
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( genre => genre.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  }
  else{
   console.log('No User Found');
   //res.status(400).send('no such Genre');
  }
  });

//READ the name of director of a movie by director name
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( director => director.Director.Name === directorName).Director;
  
  if (director) {
    res.status(200).json(director);
  }
  else{
    res.status(400).send('no such director');
  }
  });

app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});
*/
