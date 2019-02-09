var myApp = angular.module("reactApp",[]);
myApp.controller("reactController", function($scope, $sce, $http){
    $scope.isVisible = false;

    /** Function that is responsible for calling REST API and displaying data**/
    $scope.getCaoriesInfo = function(){

        /** Check condition for making sure input field is not empty **/
        if($scope.searchKeyword !== undefined) {
            $http.get("https://api.nutritionix.com/v1_1/search/" + $scope.searchKeyword + "?results=0:1&fields=*&appId=f3e1a465&appKey=5d6db853086cef8b7a16f0368d12cbc1")
                .then(function (response) {

                    /**Check condition to display only if results are available in JSON format **/
                    if (response.data.hits.length > 0) {
                        $scope.isVisible = true;
                        $scope.itemName = response.data.hits[0].fields.item_name;
                        $scope.servingWeight = response.data.hits[0].fields.nf_serving_weight_grams + " gms";
                        $scope.totalCalories = response.data.hits[0].fields.nf_calories;
                    }
                });

        }

    };

    /** Function to bind HTML content  **/
    $scope.audioPlay = function(){
        $scope.storeUrl ="https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=0bb74650-063c-4984-9b84-dc3efaac100f&password=rJ2qk7mopTG7&text=" +$scope.searchKeyword;
        $scope.audioHtml = $sce.trustAsHtml("<audio controls autoplay><source src="+$scope.storeUrl +"></audio>");
    }
});

myApp.controller("audioController", function($scope) {
    /** function definition written in parent controller **/
});