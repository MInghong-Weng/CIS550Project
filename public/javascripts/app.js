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
    console.log("matchSearch");
    console.log($scope.matchSeason);

    var season="seasonUndefined";
    console.log(season);

    if($scope.matchSeason !== undefined && $scope.matchSeason !== null) {
      season = $scope.matchSeason.season.replace('/','-');
    }

    var request = $http.get('/matchSearch/data/' + season);
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
  var req = $http.get('/userInfo');
  req.success((data) => {
      //console.log(data);
      if (data) {
        $scope.user = data.doc.name;
        $scope.visible = false;
      } else {
        $scope.user="Please Login";
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
  $scope.Submit = function() {    //ng-click的submit操作
  var request = $http.get('/playerProfile/id/' + teamID); //把参数到, 跳到router操作
  request.success(function(data) {
      $scope.data = data;


  });
  request.error(function(data){
      console.log('err');
  });
};
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
app.controller("RadarCtrl", function ($scope) {
  $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.data = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
});
/********************************** dashboard *******************************/
app.controller('followPlayersController', function($scope, $http, $location, $window) {
  var request = $http.get('../dashboard/followedPlayers/');
  request.success(function(data) {
    console.log(data);
    $scope.PlayerList = data;
  });
  request.error(function(playerSearch){
      console.log('err');
  });

  $scope.Detail = function(x) {
    $window.location = `/playerProfile/${x.id}`;
  }

  $scope.Pos = function(p, x) {
    var res = $http.get(`/userInfo/createTeam/${p}/${x.id}`);
    res.success(function(message) {
      $window.alert(message);
    });
    res.error(function() {
      console.log('err');
    })
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
});
