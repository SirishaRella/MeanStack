var app = angular.module("homeApp", []);
app.controller("homeController", function($scope, $http){
    $scope.name = JSON.parse(localStorage.profileInfo)["name"];
    $scope.email = JSON.parse(localStorage.profileInfo)["email"];
    $scope.address = JSON.parse(localStorage.profileInfo)["address"];
    $scope.phno = JSON.parse(localStorage.profileInfo)["phone-no"];
    $scope.imageUrl = JSON.parse(localStorage.profileInfo)["image_url"];

    /** Knowledge Graph API Call**/
    $scope.kg = function(){

        $scope.visible = true;
        $http.get(" https://kgsearch.googleapis.com/v1/entities:search?query=" + $scope.Ccode + "&key=%20AIzaSyDMEBecZDKiws3eLRFIi1IO1E6Vm9s4Xj8%20&limit=1&indent=True").then(function (info) {

            console.log(info);

            console.log(info. data.itemListElement[0].result.name);
            $scope.path1 = info. data.itemListElement[0].result.name;
            $scope.path2 = info. data.itemListElement[0].result.description;
            $scope.path3 = info. data.itemListElement[0].result.url;
            $scope.path4 = info. data.itemListElement[0].result.detailedDescription.articleBody;
            $scope.path5 = info. data.itemListElement[0].result.image.contentUrl

            console.log($scope.path5);

            /** Text to Speech API Call**/
            var sound = new Audio("https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=ec7521a4-c213-41a7-8d5b-ac4ca7588a00&password=iI3Jwg08VlsZ&text=" + $scope.path4);
            sound.play();
        });
    };
});
