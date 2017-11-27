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



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/playerProfile/:id', function(req, res, next) {
  
});

router.get('/teamProfile/:id', function(req, res, next) {
  
});

router.get('/playerSearch', function(req, res, next) {

  var playerNationality = req.query.playerNationality;
  var playerCurrentTeam = req.query.playerCurrentTeam;
  var playerHeightL = req.query.playerHeightL;
  var playerHeightH = req.query.playerHeightH;
  var playerAge = req.query.playerAge;
  var playerSalary = req.query.playerSalary;
  var playerPreferredFoot = req.query.playerPreferredFoot;
  var playerAttackRate = req.query.playerAttackRate;
  
});

router.get('/matchSearch', function(req, res, next) {
  
});

module.exports = router;

//1
//Connect to Mlab