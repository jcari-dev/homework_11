const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vampireSchema = new Schema({
  name: { type: String, required: true, unique: true },
  title:{type: String, default: 'Count'},
  hair_color:{type: String, default: 'blonde'},
  eye_color:{type: String, default: 'N/D' },
  dob: {type: Date, default:"Unknown"},
  loves: {type: Array, default: ["Blood", "Dark Places"]},
  location: String,
  gender: String,
  victims: {type: Number, minimum: 1}
  // add your code here to set up your schema
},{timestamps: true},{ strict: true });

const Vampire = mongoose.model('Vampire', vampireSchema);

//make this exportable to be accessed in `app.js`
module.exports = Vampire;