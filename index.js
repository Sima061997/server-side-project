const express = require('express');
 
 morgan = require('morgan');
const bodyParser = require('body-parser'),
 uuid = require('uuid');
const res = require('express/lib/response');

app = express();

app.use(bodyParser.json());

app.use(morgan('common'));
app.use(express.static('public'));

  let users = [
    {
      "id": 1,
      "name": "Nemo",
      "favoriteMovies": []
    },
    {
      "id": 2,
      "name": "Frudo",
      "favoriteMovies": []
    },
    {
      "id": 3,
      "name": "Dom",
      "favoriteMovies": []
    }
  ]

 let movies = [
{ 
    "Title": "Harry Potter and the Philosopher's Stone",
    "Description": "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
    "Genre": {
      "Name": "Fantasy",
      "Description": "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama."
    },
    "Director": {
      "Name": "Chris Columbus",
      "Bio": "",
      "Birth": "September 10, 1958"
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7aHarry_Potter_and_the_Philosopher%27s_Stone_banner.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg"
},

  {
    "Title": "The Lord of the Rings",
    "Description": "The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and steps into legend. A daunting task lies ahead for Frodo when he becomes the Ringbearer - to destroy the One Ring in the fires of Mount Doom where it was forged.",
    "Genre": {
      "Name": "Fantasy",
      "Description": "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama."
    },
    "Director": {
      "Name": "Sir Peter Robert Jackson",
      "Bio": "",
      "Birth": "October 31 1961" 
    },
    "ImageURL": "https://twinfinite.net/wp-content/uploads/2021/05/Lord-of-the-Rings-quiz-28.jpeg"
  },
  {
    "Title": "Interstellar",
    "Description": "In 2067, crop blights and dust storms threaten humanity's survival. Cooper, a widowed engineer and former NASA pilot turned farmer, lives with his father-in-law, Donald, his 15-year-old son, Tom, and 10-year-old daughter, Murphy \"Murph\". After a dust storm, patterns inexplicably appear in the dust covering Murphy's bedroom, which she thinks is the work of a ghost. Cooper deduces the patterns were caused by gravity variations and they represent geographic coordinates in binary code. Cooper follows the coordinates to a secret NASA facility headed by Professor John Brand.",
    "Genre": {
      "Name": "Science Fiction",
      "Description": "fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets."
    }, 
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "",
      "Birth": "30 July 1970"
    },
    "ImageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBS2-0Bjcho-DttjJ2O57uG_QQ66a61BKtdA&usqp=CAU"
  },
  {
    "Title": "Inception",
    "Description": "Dominick \"Dom\" Cobb and Arthur are \"extractors\"; they perform corporate espionage using experimental military technology to infiltrate their targets' subconscious and extract information through a shared dream world. Their latest target, Saito, reveals he arranged their mission to test Cobb for a seemingly impossible job: implanting an idea in a person's subconscious, or \"inception\". Saito wants Cobb to convince Robert, the son of Saito's competitor Maurice Fischer, to dissolve his father's company. Saito promises to clear Cobb's criminal status, which prevents him from returning home to his children.",
    "Genre": {
      "Name": "Science Fiction, Adventure",
      "Description": "Science fiction: fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets. Adventure: Adventure stories feature physical action and courageous heroes who save others from danger or impending doom. The adventure genre of fiction is fast-paced and usually centers on a protagonist in a dangerous or risky situation",
    },
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "",
      "Birth": "30 July 1970"
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
  },
  {
    "Title": "The Imitation Game",
    "Description": "In 1951, two policemen, Nock and Staehl, investigate the mathematician Alan Turing after an apparent break-in at his home. During his interrogation by Nock, Turing tells of his time working at Bletchley Park during the Second World War. In 1928, the young Turing is unhappy and bullied at boarding school. He develops a friendship with Christopher Morcom, who sparks his interest in cryptography. Turing develops romantic feelings for him, but Christopher soon dies from bovine tuberculosis.",
    "Genre": {
      "Name": "Historical drama",
      "Description": "A historical drama is a work set in a past time period, usually used in the context of film and television. A period piece may be set in a vague or general era such as the Middle Ages or a specific period such as the Roaring Twenties."
    },
    "Director": {
      "Name": "Morten Tyldum",
      "Bio": "",
      "Birth": "19 May 1967" 
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/8/87/The_Imitation_Game_%282014%29.png"
  },
  {
    "Title": "The Theory of Everything",
    "Description": "University of Cambridge astrophysics student Stephen Hawking begins a relationship with literature student Jane Wilde. Although Stephen is intelligent, his friends and professors are concerned over his lack of a thesis topic. After he and his professor Dennis Sciama attend a lecture on black holes, Stephen speculates that black holes may have been part of the creation of the universe, and decides to write his thesis on them. He learns he has motor neurone disease. The doctor assures Stephen that his brain will not be affected, so his thoughts and intelligence will remain intact, but eventually he will be unable to communicate them. As Stephen becomes reclusive, focusing on his work, Jane confesses she loves him. She tells his father she intends to stay with Stephen even as his condition worsens. They marry and have their first son, Robert.",
    "Genre": {
      "Name": "Biographical romantic drama",
      "Description": "A biographical film, or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used."
    },
    "Director": {
      "Name": "James Marsh",
      "Bio": "",
      "Birth": "30 April 1963" 
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/6/67/The_Theory_of_Everything_%282014%29.jpg"
  },
  {
    "Title": "The Fault in Our Stars",
    "Description": "Hazel Grace Lancaster is a teenager, living in the suburbs of Indianapolis, who has thyroid cancer that has spread to her lungs. Believing she is depressed, her mother Frannie urges her to attend a weekly cancer patient support group. There Hazel meets Augustus \"Gus\" Waters, who lost a leg to bone cancer but has since apparently been in remission. The two bond over their hobbies and agree to read each other's favorite books. Gus gives Hazel Counter Insurgence, while Hazel recommends An Imperial Affliction, a novel about a cancer-stricken girl named Anna that parallels her own experience, but has an abrupt ending. Its author, Peter Van Houten, retreated to Amsterdam following the novel's publication and has not been heard from since.",
    "Genre": {
      "Name": "Drama" ,
      "Description": "The drama genre features stories with high stakes and a lot of conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters."
    },
    "Director": {
      "Name": "Josh Boone",
      "Bio": "",
      "Birth": "April 5, 1979"
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/The_Fault_in_Our_Stars_%28Official_Film_Poster%29.png/220px-The_Fault_in_Our_Stars_%28Official_Film_Poster%29.png"
  },
  {
    "Title": "Shutter Island",
    "Description": "In 1954, U.S. Marshal Edward \"Teddy\" Daniels and his new partner Chuck Aule travel to Ashecliffe Hospital for the criminally insane on Shutter Island, Boston Harbor. They are investigating the disappearance of patient Rachel Solando, incarcerated for drowning her three children. Their only clue is a cryptic note found hidden in Solando's room: \"The law of 4; who is 67?\" The two men arrive just before a massive storm, preventing their return to the mainland for a few days.",
    "Genre": {
      "Name": "Psychological thriller",
      "Description": "Psychological thriller is a genre combining the thriller and psychological fiction genres. It is commonly used to describe literature or films that deal with psychological narratives in a thriller or thrilling setting."
    },
    "Director": {
      "Name": "Martin Scorsese",
      "Bio": "",
      "Birth": "November 17, 1942"
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg"
  },
  {
    "Title": "Finding Nemo",
    "Description": "Marlin (Albert Brooks), a clown fish, is overly cautious with his son, Nemo (Alexander Gould), who has a foreshortened fin. When Nemo swims too close to the surface to prove himself, he is caught by a diver, and horrified Marlin must set out to find him. A blue reef fish named Dory (Ellen DeGeneres) -- who has a really short memory -- joins Marlin and complicates the encounters with sharks, jellyfish, and a host of ocean dangers. Meanwhile, Nemo plots his escape from a dentist's fish tank.",
    "Genre": {
      "Name": "Animation",
      "Description": "Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame. Animations are not a strictly-defined genre category, but rather a film technique, although they often contain genre-like elements."
    },
    "Director": {
      "Name": "Andrew Stanton",
      "Bio": "",
      "Birth": "December 3, 1965" 
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Finding_Nemo.jpg/220px-Finding_Nemo.jpg"
  },
  {
    "Title": "The Intouchables",
    "Description": "In Paris, the aristocratic and intellectual Philippe is a quadriplegic millionaire who is interviewing candidates for the position of his carer, with his red-haired secretary Magalie. Out of the blue, Driss cuts the line of candidates and brings a document from the Social Security and asks Phillipe to sign it to prove that he is seeking a job position so he can receive his unemployment benefit. Philippe challenges Driss, offering him a trial period of one month to gain experience helping him. Then Driss can decide whether he would like to stay with him or not. Driss accepts the challenge and moves to the mansion, changing the boring life of Phillipe and his employees.",
    "Genre": {
      "Name": "Comedy drama ",
      "Description": "Comedy-drama, or dramedy, is a genre of dramatic works that combines elements of comedy and drama."
    },
    "Director": 
      {
      "Name": "Olivier Nakache", 
      "Bio": "",
      "Birth": "15 April 1973"
      },
      /*
      {
      "Name": "Éric Toledano" ,
      "Bio": "",
      "Birth": "3 July 1971"
      }
      */
  
    "ImageURL": "https://upload.wikimedia.org/wikipedia/en/9/93/The_Intouchables.jpg"
  }
];

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
