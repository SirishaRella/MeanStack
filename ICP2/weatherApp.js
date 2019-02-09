var weatherApp = angular.module("weatherApp",[]);
weatherApp.controller("weatherControl",function($scope, $http) {

    /**Hiding the form content and table on onload of application**/
    $scope.visible = false;
    $scope.hourlyTable = false;

    /** Function to retrieve the current weather data **/
    $scope.getCurrentWeather = function () {
        $scope.visible = true;
        $http.get("https://api.wunderground.com/api/36b799dc821d5836/conditions/q/" + $scope.stateCode + "/" + $scope.cityName + ".json")
            .then(function (response) {
                $scope.temperature = response.data.current_observation.temp_f;
                $scope.weather = response.data.current_observation.weather;
                $scope.icon = response.data.current_observation.icon_url;
            })
            .catch(function (response) {
                console.log("Statecode and Cityname are not matching");
            });
    };

    /** Function to retrieve the next five hours data**/
    $scope.getHourlyWeather = function () {
        $scope.hourlyTable = true;
        $http.get("https://api.wunderground.com/api/36b799dc821d5836/hourly/q/" + $scope.stateCode + "/" + $scope.cityName + ".json")
            .then(function (response) {
                $scope.hourlyData = response.data.hourly_forecast;
                console.log( $scope.hourlyData);
            })
            .catch(function (response) {
                console.log("Statecode and Cityname are not matching");
            });
    }
});
