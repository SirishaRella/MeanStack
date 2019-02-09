var profileApp = angular.module("profileApp",[]);
profileApp.controller("profileController", function($scope) {
    console.log(JSON.parse(localStorage.profileInfo));
    $scope.profName = JSON.parse(localStorage.profileInfo).name;
    $scope.profEmail = JSON.parse(localStorage.profileInfo).email;
    $scope.profAddress = JSON.parse(localStorage.profileInfo).address;
});