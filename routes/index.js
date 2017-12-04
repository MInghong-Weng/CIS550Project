const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

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
    else {res.json(rows);}
    });
});

router.get('/playerSearch/club', function(req, res, next) {
  var query = "select distinct p.club from mydb.PlayerPersonalData p ORDER BY p.club";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {res.json(rows);}
    });
});

<<<<<<< Updated upstream
router.get('/playerSearch/data/:playerAge/:playerNationality/:playerClub', function(req, res) {

  console.log(req.params);
  //console.log(req.params.playerClub);
  var query_age, query_nation, query_club;
  
=======
router.get('/playerSearch/data/:playerAge/:playerNationality', function(req, res) {
  console.log(req.params.playerNationality);
  var query_age, query_nation;
>>>>>>> Stashed changes
  var age = (req.params.playerAge);
  if(age !== "ageUndefined") {
    switch(age) {
      case '0':
        query_age = "p.age<=20";
        break;
      case '1':
        query_age = "p.age>=21 AND p.age<=24";
        break;
      case '2':
        query_age = "p.age>=25 AND p.age<=28";
        break;
      case '3':
        query_age = "p.age>=29";
        break;
      default:
        query_age = "p.age";
        break;
    }
<<<<<<< Updated upstream
  } else {
    query_age = "p.age";
  }
  console.log("Here");
  

  if(req.params.playerNationality !== "nationUndefined") {
    query_nation = " AND p.nationality = '" +  req.params.playerNationality +"'";
  } else {
    query_nation = "";
  }

  if(req.params.playerClub !== "clubUndefined") {
    query_club = " AND p.club = '" +  req.params.playerClub +"'";
  } else {
    query_club = "";
  }

  var query = "select p.photo, p.id, p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p where "+query_age+ query_nation + query_club+ " order by p.overall desc";
=======
  } else {query_age = "p.age";}
  console.log('age: '+playerAge);
  if(req.params.playerNationality !== "nationUndefined") {
    query_nation = " AND p.nationality = '" +  req.params.playerNationality +"'";
  } else {query_nation = "";}
  var query = "select p.id, p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p where "+query_age+ query_nation + " order by p.overall desc";
>>>>>>> Stashed changes
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    });

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
    else {res.json(rows);}
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
    var query = "select t.id, t.team_api_id, t.team_fifa_api_id, t.team_long_name, t.team_short_name, tt.buildUpPlaySpeed, l.logo from mydb.Team t, mydb.Team_Data tt, mydb.34teamlogo l where t.team_api_id = "+ teamID +" and tt.team_api_id = " + teamID +" and l.id = " + teamID;
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {res.json(rows);}
      });
});

/************************************** Matches *********************************************/


router.get('/matchSearch', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'matchSearch.html'));
});

router.get('/matchSearch/season', function(req, res, next) {
  var query = "select distinct m.season from mydb.Matches m ORDER BY m.season";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});


router.get('/matchSearch/data/:matchSeason', function(req, res) {
  console.log(req.params.matchSeason);

  var query_season;
  var season = (req.params.matchSeason);

  //if(req.params.playerNationality !== "nationUndefined") {
    query_season = " AND m.season = '" +  req.params.matchSeason +"'";
  //} else {query_nation = "";}
  var query = "select m.season, m.stage, m.date, m.home_team, m.home_team_goal, m.away_team, away_team_goal from mydb.Matches m where "+query_season+" order by m.date";

  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    });

});

/************************************* User Info  ************************************/
router.get('/userInfo', function(req, res, next) {
  //console.log(req.user);
  if (req.user) {
    res.json(req.user);
  }
})

router.get('/userInfo/addTeam/:id', function(req, res, next) {
  var teamId = req.params.id;
  if (req.user) {
    User.findById(req.user.doc._id, (err, data) => {
      //console.log("data",data);
      var teams = data.followedTeams;
      //console.log(teams);
      if (!teams) {
        teams = [];
      }
      var exist = false;
      for (var i = 0; i < teams.length; i++) {
        if (teams[i] === teamId) {
            exist = true;
            res.json(teams);
        }
      }
      teams.push(teamId);
      User.findByIdAndUpdate(req.user.doc._id, {$set:{followedTeams: teams}},(err, docs)=> {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully add data!");
        }
      })
      res.json(teams);
    });
  } else {
    res.send("Failed, You should login first!");
  }
})

router.get('/userInfo/DeleteTeam/:id', function(req, res, next) {
  var teamId = req.params.id;
  if (req.user) {
    User.findById(req.user.doc._id, (err, data) => {
      //console.log("data",data);
      var teams = data.followedTeams;
      var newTeams = [];
      //console.log(teams);
      if (!teams) {
        teams = [];
        res.send(teams);
      }

      for (var i = 0; i < teams.length; i++) {
        if (teams[i] != teamId) {
            newTeams.push(teams[i]);
        }
      }

      User.findByIdAndUpdate(req.user.doc._id, {$set:{followedTeams: newTeams}},(err, docs)=> {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully delete data!");
        }
      })
      res.json(teams);
    });
  } else {
    res.send("Failed, You should login first!");
  }
})

router.get('/userInfo/addPlayer/:id', function(req, res, next) {
  var playerId = req.params.id;
  if (req.user) {
    User.findById(req.user.doc._id, (err, data) => {
      //console.log("data",data);
      var players = data.followedPlayers;
      //console.log(players);
      if (!players) {
        players = [];
      }
      var exist = false;
      for (var i = 0; i < players.length; i++) {
        if (players[i] === playerId) {
            exist = true;
            res.json(players);
        }
      }
      teams.push(playerId);
      User.findByIdAndUpdate(req.user.doc._id, {$set:{followedPlayers: players}},(err, docs)=> {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully add data!");
        }
      })
      res.json(teams);
    });
  } else {
    res.send("You should login first!");
  }
})

router.get('/userInfo/DeletePlayer/:id', function(req, res, next) {
  var playerId = req.params.id;
  if (req.user) {
    User.findById(req.user.doc._id, (err, data) => {
      //console.log("data",data);
      var players = data.followedPlayers;
      var newPlayers = [];
      //console.log(players);
      if (!players) {
        players = [];
        res.send("Successfully delete data!");
      }

      for (var i = 0; i < players.length; i++) {
        if (players[i] != playerId) {
          newPlayers.push(players[i]);
        }
      }
      User.findByIdAndUpdate(req.user.doc._id, {$set:{followedPlayers: newPlayers}},(err, docs)=> {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully delete data!");
        }
      })
      res.json(teams);
    });
  } else {
    res.send("Failed, You should login first!");
  }
})

router.get('/userInfo/createTeam/:pos/:id', function(req, res, next) {
  var playerId = req.params.id;
  var pos = req.params.pos;
  if (req.user) {
    User.findById(req.user.doc._id, (err, data) => {
      var players = data.myTeam;
      var exist = false;
      for (var p in players) {
        if (p != pos && players.p == playerId) {
          exist = true;
        }
      }
      if (exist) {
        res.send("Player already exists!");
      }
      players.pos = playerId;
      User.findByIdAndUpdate(req.user.doc._id, {$set:{myTeam: players}},(err, docs)=> {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully update team!");
        }
      })
      res.json(teams);
    });
  } else {
    res.send("Failed, You should login first!");
  }
})

module.exports = router;
