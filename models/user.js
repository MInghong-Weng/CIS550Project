const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true, unqiue: true},
  name: { type: String, required: true},
  followedPlayers: [{type: String}],
  followedTeams: [{type: String}],
  myTeam: {
    GK: {type: String, default: 0},
    CB1: {type: String, default: 0},
    CB2: {type: String, default: 0},
    LB: {type: String, default: 0},
    RB: {type: String, default: 0},
    CM1: {type: String, default: 0},
    CM2: {type: String, default: 0},
    LM: {type: String, default: 0},
    RM: {type: String, default: 0},
    CF1: {type: String, default: 0},
    CF2: {type: String, default: 0}
  }
});

userSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', userSchema);