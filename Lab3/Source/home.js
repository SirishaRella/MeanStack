/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('homeApp',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('homeController',function($scope,$http){
    $scope.visible=true;
    $scope.predictImage = function () {
            var value=document.getElementById('siri').value;
            var url={
                "imageurl": value
            }
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            var req = $http.post('http://127.0.0.1:8082/predict',url);
            req.success(function(data, status, headers, config) {
                var html="";
                for(var i=0;i<data.length;i++){
                   html+="<tr><td>"+data[i].name+"</td><td>"+data[i].value+"</td></tr>"
                }
                document.getElementById('resultsData').innerHTML=html;
            });
            req.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
            $scope.visible=false;
        };
        $scope.retrieve = function () {
            var keyword = document.getElementById('crud').value;
            var url=document.getElementById('siri').value;
            var retrieveData ={
                "imgUrl":url,
                "search":keyword
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            var req = $http.post('http://127.0.0.1:8082/retrieve',retrieveData);
            req.success(function(data, status, headers, config) {
                var retrieveData = "";
                retrieveData ="<tr><td>Name:</td><td>Value:</td></tr><tr><td>"+data.name+"</td><td>"+data.value+"</td></tr>";
                document.getElementById('retrieveData').innerHTML=retrieveData;
                console.log(data);
            });
            req.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        };
        $scope.update = function () {
            var Current = document.getElementById('old').value;
            var Updated=document.getElementById('new').value;
            var updatedData ={
                "current":Current,
                "update":Updated
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            var req = $http.post('http://127.0.0.1:8082/update',updatedData);
            req.success(function(data, status, headers, config) {
                alert(data);
            });
            req.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        };

        $scope.delete = function () {
            var keyword = document.getElementById('crud').value;
            var url=document.getElementById('siri').value;
            var retrieveData ={
                "imgUrl":url,
                "search":keyword
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            var req = $http.post('http://127.0.0.1:8082/delete',retrieveData);
            req.success(function(data, status, headers, config) {
                alert(data);
            });
            req.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }


});

