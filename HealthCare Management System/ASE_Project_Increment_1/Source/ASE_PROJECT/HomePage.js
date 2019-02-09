var myApp = angular.module("homeApp",[]);
myApp.controller("homeController", function($scope) {
    $scope.config = {
        apiKey: "AIzaSyDR-pOQU8in49ymSlBAOkElvuBizepLYnY",
        authDomain: "healthcare-cdms.firebaseapp.com",
        databaseURL: "https://healthcare-cdms.firebaseio.com",
        projectId: "healthcare-cdms",
        storageBucket: "healthcare-cdms.appspot.com",
        messagingSenderId: "478995691799"
    };
    firebase.initializeApp($scope.config);
    $scope.uploadImage = function() {
        $scope.metadata = {
            "Created By": $scope.createdBy,
            //"Created Date": $scope.createdDate,
            "Contact no": $scope.createdPhno,
            "Category": $scope.createdCategory,
            "Disease": $scope.createdDisease,
            "Diagnosis Cost": $scope.createdCost,
            "Prescription": $scope.createdPrescriptions
        };
        var fileUploader = document.getElementById('fileUploader');
            var file = fileUploader.files[0];
            var storageRef = firebase.storage().ref('HealthcareImageStorage/'+file.name);
            storageRef.put(file, $scope.metadata).then(function(){
                console.log("Upload successfull");
            });
            storageRef.getMetadata().then(function(metadata){
            console.log(metadata);
            });
    }
    });
