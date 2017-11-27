var app = angular.module('angularjsNodejsTutorial',[]);

//search player
app.controller('playerController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/playerSearch/'+$scope.playerAge);
        request.success(function(playerSearch) {
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
