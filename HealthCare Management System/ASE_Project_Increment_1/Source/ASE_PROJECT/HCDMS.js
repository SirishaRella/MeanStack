function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
   // location.replace("HomePage.html");
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
var myApp = angular.module("HCDMSApp",[]);
myApp.controller("HCDMSController", function($scope){
    $scope.config = {
        apiKey: "AIzaSyDR-pOQU8in49ymSlBAOkElvuBizepLYnY",
        authDomain: "healthcare-cdms.firebaseapp.com",
        databaseURL: "https://healthcare-cdms.firebaseio.com",
        projectId: "healthcare-cdms",
        storageBucket: "healthcare-cdms.appspot.com",
        messagingSenderId: "478995691799"
    };
    firebase.initializeApp($scope.config);
    /** Registration Storage **/
    $scope.createReg = function(){
       $scope.regData = {
            "Name": $scope.regName,
            "Email": $scope.regEmail,
            "Phone-no":$scope.regPhno,
            "Address":$scope.regAddress,
            "Password":$scope.regPwd
        };

       /** firebaseRef to push regData into server**/
        firebaseRef = firebase.database().ref();
        firebaseRef.push().set($scope.regData);
        if($scope.regPwd !== $scope.regRepeatPwd){
           alert("mismatch");
        }
        alert("Successfully!! Created an account");
        location.replace("HomePage.html");

    };

    /** Login function**/
    $scope.login =  function(){
        firebaseRef = firebase.database().ref('//');
        firebaseRef.once('value',function(snapshot){
          $scope.jsonData = snapshot.val();
          $scope.keys = Object.keys(snapshot.val());
          $scope.checkUser = false;
          console.log($scope.jsonData);
          for(var i =0;i<$scope.keys.length;i++){
              if($scope.jsonData[$scope.keys[i]].Email === $scope.loginEmail && $scope.jsonData[$scope.keys[i]].Password === $scope.loginPwd )
              {
                  location.replace("HomePage.html");
                  alert("Hello  " + $scope.jsonData[$scope.keys[i]].Name);
                  $scope.checkUser = true;

              }
          }
          if($scope.checkUser === false){
              alert("Invalid Credentials");
          }
        });
    }

});