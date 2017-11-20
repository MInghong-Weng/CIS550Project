var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'minghw',
  password : 'azure1902',
  database : 'minghw'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/data/:email', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'SELECT Person.login, Person.name, Person.sex, Person.relationshipStatus, Person.birthyear, f.num FROM Person LEFT JOIN (SELECT login, COUNT(*) AS num FROM Friends GROUP BY login) f on Person.login = f.login';
  // you may change the query during implementation
  var email = req.params.email;
  if (email != 'undefined') query = query + ' where Person.login ="' + email + '"' ;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});


// ----Your implemention of route handler for "Insert a new record" should go here-----
router.get('/ins',function(req,res){
  var login = req.query.login;
  var name = req.query.name;
  var sex = req.query.sex;
  var relationshipStatus = req.query.RelationshipStatus;
  var birthyear = req.query.Birthyear;

console.log(login);
if (login != 'undefined')
  var query = 'INSERT INTO Person(login,name,sex,relationshipStatus,birthyear) VALUES ("'+login+'","'+name+'","'+sex+'","'+relationshipStatus+'","'+birthyear+'")';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
        console.log(success);
    }
    });
});

module.exports = router;
