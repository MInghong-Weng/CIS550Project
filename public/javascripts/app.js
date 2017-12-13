var app = angular.module('angularjsNodejsTutorial',['chart.js']);

//search player
app.controller('playerController', function($scope, $http) {
        $scope.message="";
        var req = $http.get('/playerSearch/nation');
        req.success((nationality) => {
          $scope.nationalities = nationality;
          console.log('success');
    })
    req.error((nationality) => {
        console.log('error');
    })

    var req = $http.get('/playerSearch/club');
    req.success((club) => {
      $scope.clubs = club;
      console.log('success');
    })
    req.error((club) => {
    console.log('error');
    })


    $scope.Submit = function() {
        console.log("playerSearch");
        console.log($scope.playerAge);
        console.log($scope.playerNationality);

        var age = "ageUndefined";
        var nation="nationUndefined";
        var club = "clubUndefined";
        var overall = "overallUndefined";
        console.log(nation);

        if($scope.playerNationality !== undefined && $scope.playerNationality !== null) {
          nation = $scope.playerNationality.nationality;
        }

        if($scope.playerClub !== undefined && $scope.playerClub !== null) {
          club = $scope.playerClub.club;
        }

        if($scope.playerAge !== undefined && $scope.playerAge !== "") {
          age = $scope.playerAge;
        }

        if($scope.playerOverall !== undefined && $scope.playerOverall !== "") {
          overall = $scope.playerOverall;
        }


        console.log(club);

        var request = $http.get('/playerSearch/data/' + age + '/'+nation+'/'+club + '/' + overall);
        request.success(function(playerSearch) {
          //console.log(playerSearch);
            $scope.playerSearch = playerSearch;
        });
        request.error(function(playerSearch){
            console.log('err');
        });
    };
});

//matchSearch controller
app.controller('matchSearchController', function($scope, $http) {
  $scope.message="";
/*
  var season = (req.params.matchSeason).replace('-','/');
  var stage = req.params.matchStage;
  var date = (req.params.matchDate);
  var matchHomeTeam = (req.params.matchHomeTeam);
  var matchAwayTeam = (req.params.matchAwayTeam);
*/

  // select range seasons
  var reqSeason = $http.get('/matchSearch/season');
  reqSeason.success((season) => {
    $scope.seasons = season;
    console.log('success');
  })
  reqSeason.error((season) => {
    console.log('error');
  })

  var reqdate = $http.get('/matchSearch/stage');
  reqdate.success((stage) => {
    $scope.stages = stage;
    console.log('success');
  })
  reqdate.error((stage) => {
    console.log('error');
  })
/*
  var reqdate = $http.get('/matchSearch/date');
  reqdate.success((date) => {
    $scope.dates = date;
    console.log('success');
  })
  reqdate.error((date) => {
    console.log('error');
  })
*/
  var reqHomeTeam = $http.get('/matchSearch/homeTeam');
  reqHomeTeam.success((homeTeam) => {
    $scope.homeTeams = homeTeam;
    console.log('success');
  })
  reqHomeTeam.error((homeTeam) => {
    console.log('error');
  })

  var reqAwayTeam = $http.get('/matchSearch/awayTeam');
  reqAwayTeam.success((awayTeam) => {
    $scope.awayTeams = awayTeam;
    console.log('success');
  })
  reqAwayTeam.error((awayTeam) => {
    console.log('error');
  })

  // search match according to user input
  $scope.Submit = function() {
    console.log("matchSearch submit()");

    var season="seasonUndefined";
    var stage = "stageUndefined";
    var homeTeam = "homeTeamUndefined";
    var awayTeam = "awayTeamUndefined";    

    if($scope.matchSeason !== undefined && $scope.matchSeason !== null) {
      console.log($scope.matchSeason.season);
      season = $scope.matchSeason.season.replace('/','-');
    }

    if($scope.matchStage !== undefined && $scope.matchStage !== null) {
      console.log($scope.matchStage.stage);
      stage = $scope.matchStage.stage;
    }

    if($scope.matchHomeTeam !== undefined && $scope.matchHomeTeam !== null) {
      console.log($scope.matchHomeTeam.home_team_name);
      homeTeam = $scope.matchHomeTeam.home_team_name;
    }

    if($scope.matchAwayTeam !== undefined && $scope.matchAwayTeam !== null) {
      console.log($scope.matchAwayTeam.away_team_name);
      awayTeam = $scope.matchAwayTeam.away_team_name;
    }

    var request = $http.get('/matchSearch/data/'+season+'/'+stage+'/'+homeTeam+'/'+awayTeam);
    request.success(function(matchSearch) {
      console.log(matchSearch);
      $scope.matchSearch = matchSearch;
    });
    request.error(function(matchSearch){
      console.log('err');
    });
  };
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js
app.controller('insertController',function($scope, $http){
  $scope.message="";
  $scope.Insert = function() {

  $http.get('/ins',
  { params: {
    login:$scope.login,
    name:$scope.name,
    sex:$scope.sex,
    RelationshipStatus:$scope.RelationshipStatus,
    Birthyear:$scope.Birthyear
  }})
  .success(function(success) {
    console.log(success)
  })
  .error(function(error){
      console.log(error);
    });
  };
});

app.controller('userInfoController', function($scope, $http) {
  $scope.user="Please Login";
  $scope.visible = true;
  $scope.showDash=false;
  var req = $http.get('/userInfo');
  req.success((data) => {
      //console.log(data);
      if (data) {
        $scope.user = data.doc.name;
        $scope.visible = false;
        $scope.showDash=true;
      } else {
        $scope.user="Please Login";
        $scope.showDash=false;

      }
  })
  req.error((data) => {
      console.log('error in get userInfo');
  });
});

app.controller('Test', function($scope, $location) {
  console.log($location.absUrl());
});

app.controller('addPlayerController', function($scope,$http, $location, $window) {
  $scope.addPlayer = function(x) {
    console.log(x.id)
    var request = $http.get("/userInfo/addPlayer/"+x.id);
    request.success(function(message){
      $window.alert(message);
    });
    request.error(function(err){
      console.log(err);
    })
    //$window.alert(res);
  }
});

app.controller('playerSearchToPlayerProfileController', ['$scope', '$location', function($scope, $location) {
  $scope.goPlayer = function(x) {
  console.log(x.id)
            window.location = "/playerProfile/"+x.id;
  }
}]);


app.controller('matchSearchToMatchController', ['$scope', '$location', function($scope, $location) {

  $scope.goHomeTeam = function(x) {
  console.log(x)
            window.location = "/teamProfile/"+x;
  }

  $scope.goAwayTeam = function(x) {
  console.log(x)
            window.location = "/teamProfile/"+x;
  }
}]);

app.controller('PlayerProfileController', function($scope, $http, $location) {
  //定义当前controller的范围（scope）内的函数、变量
  $scope.message="";
  console.log($location.absUrl());
  var url = $location.absUrl();
  var start = url.lastIndexOf("/")+1;
  var end = url.length;
  console.log($location.absUrl().substring(start,end));
  var teamID = $location.absUrl().substring(start,end);

  var request = $http.get('/playerProfile/id/' + teamID); //把参数到, 跳到router操作
  request.success(function(data) {
      $scope.data = data;
      $scope.data2 = [
        [data[0].Sprint_speed, data[0].Finishing, data[0].Short_passing, data[0].Standing_tackle, data[0].Stamina, data[0].Dribbling],
        [0,0,0,0,0,0,0]
      ];
      console.log(data);
  });
  request.error(function(data){
      console.log('err');
  });


$scope.labels =["Speed", "Shot", "Pass", "Defense", "Stamina", "Dribbling"];
$scope.custom = ['#72C02C', '#72C02C'];

});

app.controller('TeamProfileController', function($scope, $http, $location) {
  //定义当前controller的范围（scope）内的函数、变量



  $scope.message="";
  console.log($location.absUrl());
  var url = $location.absUrl();
  var start = url.lastIndexOf("/")+1;
  var end = url.length;
  console.log($location.absUrl().substring(start,end));
  var teamID = $location.absUrl().substring(start,end);
  $scope.Submit = function() {    //ng-click的submit操作
  var request = $http.get('/teamProfile/id/' + teamID);     //把参数get到, 跳到router操作
  request.success(function(data) {
    // if (data>=10){
    //   $scope.color = 'red';
    // } else {
    //   $scope.color = 'yellow';
    // }
      $scope.data = data;


  });
  request.error(function(data){
      console.log('err');
  });

};

});

/**********************************TeamResultsController******************/
app.controller('TeamResultsController', function($scope, $http, $location) {
  //定义当前controller的范围（scope）内的函数、变量
  $scope.labels = ["last10", "last9", "last8", "last7", "last6", "last5", "last4", "last3", "last2", "last1"];
  $scope.series = ['Last 10 Matches'];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            beginAtZero: true,
            fixedStepSize: 1,
            lineTension: 0,
            callback: function(value, index, values){
              if (value == 0){return 'Lost'};
              if (value == 1){return 'Draw'};
              if (value == 2){return 'Won'};
            }
          },
        }
      ]
    },
    elements: {
      line: {
          tension: 0  //straight lines instead of curve
      }
    }
  };

  $scope.message="";
  console.log($location.absUrl());
  var url = $location.absUrl();
  var start = url.lastIndexOf("/")+1;
  var end = url.length;
  console.log($location.absUrl().substring(start,end));
  var teamID = $location.absUrl().substring(start,end);

  var request = $http.get('/teamResults/id/' + teamID);     //把参数get到, 跳到router操作
  request.success(function(data) {
    //console.log(data);
      $scope.data2 = data;
      console.log($scope.data2);
      $scope.data3 = [
        [data[0].result, data[1].result, data[2].result, data[3].result, data[4].result, data[5].result, data[6].result, data[7].result, data[8].result, data[9].result],
      ];
      console.log($scope.data2);
  });
  request.error(function(data){
      console.log('err');
  });



});

/********************************** Radar *******************************/
app.controller("RadarCtrl", function ($scope) {

});


/********************************** dashboard *******************************/
app.controller('followPlayersController', function($scope, $http, $location, $window) {
  var request = $http.get('../dashboard/followedPlayers/');
  request.success(function(data) {
    $scope.PlayerList = data;
  });
  request.error(function(playerSearch){
      console.log('err');
  });

  /**************** */
  var myTeamReq = $http.get('../dashboard/myTeam/');
  myTeamReq.success(function(team) {
    console.log(team);
    for (var i in team) {
      $scope[i] = team[i][0];
    }
  });
  myTeamReq.error(function(playerSearch){
      console.log('err');
  });



 /******************* */
  $scope.Pos = function(p, x) {
    var res = $http.get(`/userInfo/createTeam/${p}/${x.id}`);
    res.success(function(message) {
      $window.alert(message);
    });
    res.error(function() {
      console.log('err');
    })

    var myTeamReq = $http.get('../dashboard/myTeam/');
    myTeamReq.success(function(team) {
      console.log(team);
      for (var i in team) {
        $scope[i] = team[i][0];
      }
    });
    myTeamReq.error(function(playerSearch){
        console.log('err');
    });
  }

  $scope.DelPlayer = function(x) {
    var res = $http.get(`/userInfo/DeletePlayer/${x.id}`);
    res.success(function(message) {
      var request = $http.get('../dashboard/followedPlayers/');
      request.success(function(data) {
        console.log(data);
        $scope.PlayerList = data;
      });
      request.error(function(playerSearch){
          console.log('err');
      });

      $window.alert(message);
    });
    res.error(function() {
      console.log('err');
    })
  }

  $scope.Detail = function(x) {
    $window.location = `/playerProfile/${x.id}`;
  }
});
