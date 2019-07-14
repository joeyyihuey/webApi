//https://server-joei.herokuapp.com/

const express = require('express');
const app = express();
const axios = require('axios');
const Character = require('./Character');
const cors = require('cors');
const port = process.env.PORT || 2000;

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const character_img_url = {
 'Aemon Targaryen':
  'https://docs.google.com/uc?id=1zB17-SshWlL_LmjZzLhBrCH3mBoGJ8Ez',

  'Aerys I':
  'https://docs.google.com/uc?id=1pulJ-Dk8YLL9IhUboXxVFnMpwhdbVMAK',

  'Aerys II':
  'https://docs.google.com/uc?id=1YpLjbhJJ5p_258X_VdeC5KRkqCY96rUH',

  'Alyn Estermont':
  'https://docs.google.com/uc?id=149nkFDODr9PpuQCVLdWA5a2DXXhpxFd-',

  'Aron Santagar':
  'https://docs.google.com/uc?id=1kuF6Qbu9tABVbpM5_W--dLkZQYHthCA6',

  'Balon Greyjoy':
  'https://docs.google.com/uc?id=1I7VjgFplPiRUjIVGaJRd7HrDSRUovdmq',

  'Brienne of Tarth':
  'https://docs.google.com/uc?id=1vRIocoUtUSB_q3YJ7yD2cnOa47xgtzCB',

  'Brynden Tully':
  'https://docs.google.com/uc?id=1S51dUDN7C6TI3_y1sUDe9o40BW3lnrK-',

  'Cersei Lannister':
  'https://docs.google.com/uc?id=1c6KAeqWRTYTva_8FkNhYGDpDDFratyHJ',

  'Jaime Lannister':
  'https://docs.google.com/uc?id=1ArFrOeRZQkX1Wh2AfZ31zRiNyGSMXk_B',

  'Jon Snow':
  'https://docs.google.com/uc?id=1nCMP6vlsOhNixl3L23ohheGDyJwW6p70',

  'Margaery Tyrell':
  'https://docs.google.com/uc?id=1mzbph4qIaPrNQhLrHhS_lhLtDAF_5FB7',

  'Renly Baratheon':
  'https://docs.google.com/uc?id=1wjA1aQ_syqz1nYwNJmIJGNwzdn3rRV8A',

  'Tyrion Lannister':
  'https://docs.google.com/uc?id=1e00AEjMmXg4HEJx0y7FhbRTvv_AQ9rTg',

  'Tywin Lannister':
  'https://docs.google.com/uc?id=1HebyGUfPtMfsg2EfKR1n4jCcxwFhTLZs'

};




var i = 1;

//http://localhost:2000/characterAdd?name=Jon Snow
app.get('/characterAdd', (req, res) => {
  const name = req.query.name;
  const api1 = `https://www.anapioficeandfire.com/api/characters?name=${name}`;

  const api2 = `https://got-quotes.herokuapp.com/quotes?char=${name}`;


  axios
    .all([axios.get(api1),
          axios.get(api2)])
    .then(axios.spread((api1, api2) => {
      const my_character = new Character({
        character_id: i, //make change
        name: api1.data[0].name,
        gender: api1.data[0].gender,
        culture: api1.data[0].culture,
        born: api1.data[0].born,
        aliases: api1.data[0].aliases,
        father: api1.data[0].father,
        mother: api1.data[0].mother,
        spouse: api1.data[0].spouse,
        character_img_url: character_img_url[name],
        quote: api2.data.quote,
        character : name

      })

      i = i + 1; //make change
      console.log(i);
      if (!my_character.name) {
        res.status(200).json('Not found');
        return;
      }
      my_character
        .save()
        .then(api1 => {
          res.status(200).json(api1);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    }))
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:2000/characterGetAll
app.get('/characterGetAll', (req, res) => {
  Character.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//localhost:2000/characterDelete?character_id=character_id
app.get('/characterDelete', (req, res) => {
  Character.deleteMany({ character_id: req.query.character_id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});


app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
