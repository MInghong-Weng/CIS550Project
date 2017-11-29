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
        var request = $http.get('/playerSearch/age/'+$scope.playerAge);
        request.success(function(playerSearch) {
          console.log(playerSearch);
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
