const express = require('express');
const router = express.Router();
const path = require('path');

// Connect string to MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'project-550-1.cn5iz4eo9j7i.us-east-1.rds.amazonaws.com',
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

router.get('/home', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/dashboard', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.get('/playerSearch', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'playerSearch.html'));

});

router.get('/playerSearch/nation', function(req, res, next) {

  var query = "select distinct p.nationality from mydb.PlayerPersonalData p ORDER BY p.nationality";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log("index");
        //console.log(rows);
        res.json(rows);
    }
    });

});

router.get('/playerSearch/data/:playerAge/:playerNationality', function(req, res) {

  console.log(req.params.playerNationality);
  var query_age, query_nation;
  
  var age = (req.params.playerAge);
  if(age !== "ageUndefined") {
    switch(age) {
      case '0': 
        query_age = "p.age<=20";
        break;
      case '1':
        query_age = "p.age>21 AND p.age<=24";
        break;
      case '2':
        query_age = "p.age>25 AND p.age<=28";
        break;
      case '3':
        query_age = "p.age>29";
        break;
      default:
        query_age = "p.age";    
        break;
    }  
  } else {
    query_age = "p.age";
  }
  console.log('age: '+playerAge);
  if(req.params.playerNationality !== "nationUndefined") {
    query_nation = " AND p.nationality = '" +  req.params.playerNationality +"'";
  } else {
    query_nation = "";
  }
  var query = "select p.id, p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p where "+query_age+ query_nation + " order by p.overall desc";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    });

  var playerNationality = req.query.playerNationality;
  var playerCurrentTeam = req.query.playerCurrentTeam;
  var playerHeightL = req.query.playerHeightL;
  var playerHeightH = req.query.playerHeightH;
  var playerAge = req.query.playerAge;
  var playerSalary = req.query.playerSalary;
  var playerPreferredFoot = req.query.playerPreferredFoot;
  var playerAttackRate = req.query.playerAttackRate;

});

router.get('/playerProfile/:id', function(req, res, next) {
  var fuckyou = req.params.id;    //get the id?
  res.sendFile(path.join(__dirname, '../', 'views', 'playerProfile.html'));
});

router.get('/playerProfile/id/:teamID', function(req, res, next) {
  console.log(req.params);
  var teamID = req.params.teamID;
  //var query = "select p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p where p.age = "+ teamID + " order by p.overall desc";
  var query = "select p.name, p.age, p.overall from PlayerPersonalData p where p.ID = "+ teamID;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        //console.log(rows);
        res.json(rows);
    }
    });
});


/************************************** Team *********************************************/
router.get('/teamSearch', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'teamSearch.html'));
});

router.get('/teamProfile/:id', function(req, res, next) {
  var fuckyou = req.params.id;    //get the id?
  res.sendFile(path.join(__dirname, '../', 'views', 'teamProfile.html'));
});

router.get('/teamProfile/id/:teamID', function(req, res, next) {
    console.log(req.params);
    var teamID = req.params.teamID;
    //var query = "select p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p where p.age = "+ teamID + " order by p.overall desc";
    var query = "select t.id, t.team_api_id, t.team_fifa_api_id, t.team_long_name, t.team_short_name, tt.buildUpPlaySpeed from mydb.Team t, mydb.Team_Data tt where t.team_api_id = "+ teamID +" and tt.team_api_id = " + teamID;
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
          //console.log(rows);
          res.json(rows);
      }
      });
});

/************************************** Team *********************************************/

router.get('/matchSearch', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'matchSearch.html'));
});

router.get('/userInfo', function(req, res, next) {
  console.log(req.user);
  res.json(req.user);
})

module.exports = router;

//1
//Connect to Mlab
