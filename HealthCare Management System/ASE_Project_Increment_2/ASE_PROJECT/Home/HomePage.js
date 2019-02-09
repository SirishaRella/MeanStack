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
        $scope.metadata = {};
        var fileUploader = document.getElementById('fileUploader');
        $scope.metadata = {
            "Created By": $scope.createdBy,
            "Contact no": $scope.createdPhno,
            "Category": $scope.createdCategory,
            "Disease": $scope.createdDisease,
            "Diagnosis Cost": $scope.createdCost,
            "Prescription": $scope.createdPrescriptions
        };
            var file = fileUploader.files[0];
            var extractimage = document.getElementById("fileImageUploaded");
            var imgfile = extractimage.files[0];
            var storageRef = firebase.storage().ref('HealthcareImageStorage/'+file.name);
            var extractedData ="";
            var email= JSON.parse(localStorage.profileInfo).email;
            storageRef.put(file, $scope.metadata).then(function(){
                Tesseract.recognize(imgfile.name)
                    .then(function(result) {
                        console.log("vachinda");
                        extractedData=result.text;
                        firebase.storage().ref('HealthcareImageStorage/'+file.name).getDownloadURL().then(function(url) {
                            if (extractedData!== "") {
                                 var jsonData = {
                                 email:email,
                                 imageURL: url,
                                 medData: extractedData
                                };
                                console.log(url);
                                firebase.database().ref().push(jsonData);
                                console.log("data inserted");
                            }
                        });
                     }).progress(function(result) {
                    document.getElementById("ocr_status")
                        .innerText = result["status"] + " (" +
                        (result["progress"] * 100) + "%)";
                });
            });
            storageRef.getMetadata().then(function(metadata){
            console.log(metadata);
            });
        }
    });
