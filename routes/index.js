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

router.get('/playerSearch/data/:playerAge/:playerNationality/:playerClub/:playerOverall', function(req, res) {
  console.log(req.params.playerNationality);
  var query_age, query_nation;
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
  } else {
    query_age = "p.age";
  }

  var overall = (req.params.playerOverall);
  if(overall !== "overallUndefined") {
    switch(overall) {
      case '0':
        query_overall = " AND p.overall<70";
        break;
      case '1':
        query_overall = " AND p.overall>=70 AND p.overall<=79";
        break;
      case '2':
        query_overall = " AND p.overall>=80 AND p.overall<=89";
        break;
      case '3':
        query_overall = " AND p.overall>=90";
        break;
      default:
        query_overall = "";
        break;
    }
  } else {
      query_overall = "";
  }


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

  var query = "select p.photo, p.id, p.name, p.club, p.age, p.nationality, p.overall, p1.preferposition from mydb.PlayerPersonalData p natural join mydb.PlayerPlayingPositionData p1 where "+query_age+ query_nation + query_club+ query_overall + " order by p.overall desc limit 50";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        //console.log(rows);
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
  var query = "select p.name, p.age, p.overall, p.photo, p.flag, p.clublogo, p.nationality, p.club, p.wage, p2.preferposition, p3.Stamina, p3.Standing_tackle, p3.Short_passing, p3.Sprint_speed, p3.Acceleration, p3.Aggression, p3.Agility, p3.Balance, p3.Crossing, p3.Curve, p3.Dribbling, p3.Finishing, p3.Free_kick_accuracy, p3.Heading_accuracy, p3.Interceptions, p3.Jumping from mydb.PlayerPersonalData p, mydb.PlayerPlayingPositionData p2, mydb.PlayerAttribute p3 where p.ID = "+ teamID + " and p2.ID = "+ teamID + " and p3.ID = "+ teamID;
  console.log(query);
  var query2 = "select result from (select * from( select 3 as result, date, match_api_id from Matches where (home_team_api_id = 9825 and home_team_goal>away_team_goal) or (away_team_api_id = 9825 and home_team_goal<away_team_goal) union select 0 as result, date, match_api_id from Matches where (home_team_api_id = 9825 and home_team_goal<away_team_goal) or (away_team_api_id = 9825 and home_team_goal>away_team_goal) union select 1 as result, date, match_api_id from Matches where (home_team_api_id = 9825 and home_team_goal=away_team_goal) or (away_team_api_id = 9825 and home_team_goal=away_team_goal) order by date desc) result1 limit 10) result2 order by date";
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
    var query = "select t.id, t.team_api_id, t.team_fifa_api_id, t.team_long_name, t.team_short_name, tt.buildUpPlaySpeed, tt.buildUpPlaySpeedClass, tt.buildUpPlayDribbling, tt.buildUpPlayDribblingClass, tt.buildUpPlayPassing, tt.buildUpPlayPassingClass, tt.chanceCreationPassing, tt.chanceCreationPassingClass, tt.chanceCreationShooting, tt.chanceCreationShootingClass, tt.defencePressure, tt.defencePressureClass, tt.defenceAggression, tt.defenceAggressionClass, l.logo from mydb.Team t, mydb.Team_Data tt, mydb.34teamlogo l where t.team_api_id = "+ teamID +" and tt.team_api_id = " + teamID +" and l.id = " + teamID;
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
  var query = "select distinct m.season from mydb.Matches m WHERE m.league_id = 1729 ORDER BY m.season ";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

router.get('/matchSearch/stage', function(req, res, next) {
  var query = "select distinct m.stage from mydb.Matches m WHERE m.league_id = 1729 ORDER BY m.stage";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});
/*
router.get('/matchSearch/date', function(req, res, next) {
  var query = "select distinct m.date from mydb.Matches m WHERE m.league_id = 1729 ORDER BY m.date ";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});
*/
router.get('/matchSearch/homeTeam', function(req, res, next) {
  var query = "select distinct t.team_short_name AS home_team_name \
  from mydb.Matches m \
  INNER JOIN mydb.Team t ON m.home_team_api_id = t.team_api_id \
  WHERE m.league_id = 1729\
  ORDER BY t.team_short_name";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

router.get('/matchSearch/awayTeam', function(req, res, next) {
  var query = "select distinct t.team_short_name AS away_team_name \
  from mydb.Matches m \
  INNER JOIN mydb.Team t ON m.away_team_api_id = t.team_api_id \
  WHERE m.league_id = 1729\
  ORDER BY t.team_short_name";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});


router.get('/matchSearch/data/:matchSeason/:matchStage/:matchHomeTeam/:matchAwayTeam', function(req, res) {
  console.log("router.get/matchSearch/data");
  console.log(req.params.matchSeason);
  console.log(req.params.matchStage);
  //console.log(req.params.matchDate);
  console.log(req.params.matchHomeTeam);
  console.log(req.params.matchAwayTeam);

  var query_season,query_stage,query_homeTeam,query_awayTeam;
  var season = (req.params.matchSeason).replace('-','/');
  var stage = req.params.matchStage;
  //var date = (req.params.matchDate);
  var homeTeam = (req.params.matchHomeTeam);
  var awayTeam = (req.params.matchAwayTeam);

  console.log(season);
  //console.log(date);
  console.log(stage);
  console.log(homeTeam);
  console.log(awayTeam);

  if(req.params.matchSeason !== "seasonUndefined") {
    query_season = " AND m.season = '" +  season + "'";
    console.log(query_season);
  } else { query_season = "";}

  if(req.params.matchStage !== "stageUndefined") {
    query_stage = " AND m.stage = '" +  stage + "'";
    console.log(query_stage);
  } else { query_stage = "";}
/*
  if(req.params.matchDate !== "dateUndefined") {
    query_date = " AND m.date = '" +  date + "'";
    console.log(query_date);
  } else { query_date = "";}
*/
  if(req.params.matchHomeTeam !== "homeTeamUndefined") {
    query_homeTeam = " AND t1.team_short_name = '" + homeTeam  + "'";
    console.log(query_homeTeam);
  } else { query_homeTeam = "";}

  if(req.params.matchAwayTeam !== "awayTeamUndefined") {
    query_awayTeam = " AND t2.team_short_name = '" + awayTeam + "'";
    console.log(query_awayTeam);
  } else { query_awayTeam = "";}

  var query = "SELECT m.home_team_api_id, m.away_team_api_id, \
  m.season, m.stage, m.date, t1.team_short_name AS home_team_name, m.home_team_goal, \
  t2.team_short_name AS away_team_name, away_team_goal \
  FROM mydb.Matches m \
  INNER JOIN mydb.Team t1 ON m.home_team_api_id = t1.team_api_id \
  INNER JOIN mydb.Team t2 ON m.away_team_api_id = t2.team_api_id \
  WHERE m.league_id = 1729"
  + query_season + query_stage + query_homeTeam + query_awayTeam + " \
  ORDER BY m.date LIMIT 50";

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
            res.send("Already added!");
            break;
        }
      }
      if (!exist) {
        teams.push(teamId);
        User.findByIdAndUpdate(req.user.doc._id, {$set:{followedTeams: teams}},(err, docs)=> {
          if (err) {
            console.log(err);
          } else {
            res.send("Successfully add data!");
          }
        })
      }
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
      } else {
        for (var i = 0; i < teams.length; i++) {
          if (teams[i] != teamId) {
              newTeams.push(teams[i]);
          }
        }
        User.findByIdAndUpdate(req.user.doc._id, {$set:{followedTeams: newTeams}},(err, docs)=> {
          if (err) {
            console.log(err);
          } else {
            res.send("Successfully delete data!");
          }
        })
      }
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
            res.send("Already added");
            break;
        }
      }
      if (!exist) {
        players.push(playerId);
        User.findByIdAndUpdate(req.user.doc._id, {$set:{followedPlayers: players}},(err, docs)=> {
          if (err) {
            console.log(err);
          } else {
            res.send("Successfully add data!");
          }
        })
      }
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
          res.send("Successfully delete data!");
        }
      })
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
      } else {
        players[pos] = playerId;
        User.findByIdAndUpdate(req.user.doc._id, {$set:{myTeam: players}},(err, docs)=> {
          if (err) {
            console.log(err);
          } else {
            res.send("Successfully update team!");
          }
        })
      }
    });
  } else {
    res.send("Failed, You should login first!");
  }
})

/************************************* Dashboard  ************************************/
router.get('/dashboard/followedPlayers/', function(req, res, next){
  if (req.user) {
    User.findById(req.user.doc._id, (err, data)=>{
      var players = data.followedPlayers;
      var sqlLine = `select p.Photo ,p.id, p.name, p.club, p.age, p.nationality, p.overall from mydb.PlayerPersonalData p Where p.id in (${players.toString()})`;
      connection.query(sqlLine, function(err, rows, fields) {
        if (err) console.log(err);
        else {
          //console.log(rows);
          res.json(rows);
        }
      });
    });
  } else {
    res.send('Failed, You should login first!');
  }
})

router.get('/dashboard/followedTeams/', function(req, res, next){
  if (req.user) {
    User.findById(req.user.doc._id, (err, data)=>{
      var teams = data.followedTeams;
    });
  } else {
    res.send('Failed, You should login first!');
  }
})
module.exports = router;
