// server link complete
// https://murmuring-garden-80458.herokuapp.com/
const mongoose = require('mongoose');
const db =
'mongodb://assignment:hanhan1993@ds215961.mlab.com:15961/assignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  character_id: { type: Number },
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },
  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  character_img_url: { type: String },
  quote: { type: String },
  character: { type: String },

});

const Character = mongoose.model('Character', schema, 'character_list');

module.exports = Character;
