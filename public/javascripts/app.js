var app = angular.module('angularjsNodejsTutorial',[]);

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

/*        //$scope.nationality = ["China", "Germany", "US"];
        var request1 = $http.get('/playerSearch/'+$scope.nationalities);
        request1.success(function(nationality){
          console.log(nationality);
          $scope.nationalities = nationality;
        });
        request1.error(function(nationality){
          console.log('err');
        });
*/

    $scope.Submit = function() {
        console.log("playerSearch");
        console.log($scope.playerAge);
        console.log($scope.playerNationality);

        var age = "ageUndefined";
        var nation="nationUndefined";
        console.log(nation);
        
        if($scope.playerNationality !== undefined && $scope.playerNationality !== null) {
          nation = $scope.playerNationality.nationality;
        } 

        if($scope.playerAge !== undefined && $scope.playerAge !== "") {
          age = $scope.playerAge;
        }

        console.log(age);
        

        var request = $http.get('/playerSearch/data/'+age+ '/'+nation);
        request.success(function(playerSearch) {
          //console.log(playerSearch);
            $scope.playerSearch = playerSearch;
        });
        request.error(function(playerSearch){
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
  var req = $http.get('/userInfo');
  req.success((data) => {
      console.log(data);
      $scope.user = data.doc.name;
  })
  req.error((data) => {
      console.log('error in get userInfo');
  });
});

app.controller('Test', function($scope, $location) {
  console.log($location.absUrl());
});

app.controller('demoCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.goPlayer = function(x) {
  console.log(x.id)
            window.location = "http://localhost:8080/playerSearch/data/2/Albania";
  }
}]);
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
  var request = $http.get('/teamProfile/id/' + teamID);     //把参数到, 跳到router操作
  request.success(function(data) {
      $scope.data = data;
  });
  request.error(function(data){
      console.log('err');
  });

}; 

});
