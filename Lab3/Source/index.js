/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('meanApp',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('meanController',function($scope,$http){
    $scope.regVisible = false;
    $scope.loginVisible = true;
    $scope.insertData = function(){
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8082/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            alert("Successful! Login to the application");
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        $scope.regVisible = true;
        $scope.loginVisible = false;

    };
    $scope.loginCheck = function(){
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8082/login',$scope.loginData);
        req.success(function(data, status, headers, config) {
            alert("Hello User");
            location.replace('home.html');
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    };

});