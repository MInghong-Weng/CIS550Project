const express = require('express');
const router = express.Router();
const path = require('path');

// Connect string to MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'project-550-1.cn5iz4eo9j7i.us-east-1.rds.amazonaws.com:3306',
  user     : 'Project550',
  password : 'Project550',
  database : 'mydb',
});

//Connect to Mlab
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Project550:Project550.@ds113566.mlab.com:13566/mydb', (err) => {
  if (err) {
    console.log('Could not connect to Mlab: ', err);
  } else {
    console.log('Connected to Mlab!')
  }
});

const Schema = mongoose.Schema;

const user = new Schema({
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/playerProfile/:id', function(req, res, next) {
  
});

router.get('/teamProfile/:id', function(req, res, next) {
  
});

router.get('/playerSearch', function(req, res, next) {
  
});

router.get('/playerSearch', function(req, res, next) {
  
});

module.exports = router;
