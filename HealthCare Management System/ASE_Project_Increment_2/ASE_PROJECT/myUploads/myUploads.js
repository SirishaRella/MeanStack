var uploadApp = angular.module("myUploadsApp", []);
uploadApp.controller("myUploadsController", function ($scope) {
    var jsonData = JSON.parse(localStorage.userUploads);
    $scope.html="";
        for(var i =0;i<jsonData.url.length;i++) {

            $scope.html+="<div class='uploadcontent'><img src="+jsonData.url[i]+" class='uploadData'></div>";

        }

    document.getElementById('uploadsHTML').innerHTML =  $scope.html;
});