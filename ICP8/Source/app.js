var app = angular.module("nodeJsApp",[]);
app.controller('nodeJSController', function($scope, $http){

$scope.displayResults = function() {
    $scope.venueList={};
    $scope.params={
        "location":$scope.location,
        "search":$scope.search
    };
    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    var req = $http.post('http://127.0.0.1:8083/display',$scope.params);
    req.then(function(data, status, headers, config) {
        $scope.message = data;
        console.log(JSON.stringify(data.data.response.groups[0].items.length));
        for (var i = 0; i < data.data.response.groups[0].items.length;) {
            $scope.venueList[i] = {
                "name": data.data.response.groups[0].items[i].venue.name,
                "location": data.data.response.groups[0].items[i].venue.location.address
            };
            i++;
        }
    });
}
});