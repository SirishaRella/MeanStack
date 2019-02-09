/** Google OAuth sign in**/
function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();

    /** setting id for each person **/
    localStorage.setItem("id",0);
    var userDetail={
        "user_id": localStorage.id + 1,
        "name":profile.getName(),
        "email":profile.getEmail(),
        "Image_url":profile.getImageUrl()
    };
    localStorage.setItem("OAuthDetails",JSON.stringify(userDetail));
    location.replace("OAuthHomePage.html")
}

/** Google OAuth Sign out**/
function signOut(googleUser){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    });
    alert("Logout done successfully");
}

var app = angular.module("cdmApp", []);
app.controller("cdmController", function($scope){
    /** setting id for each person **/
    localStorage.setItem("id",0);

    /** Stores data in localstorage window **/
    $scope.storeData = function(){
        $scope.userDetails = {
            "user_id": localStorage.id + 1,
            "name": $scope.name,
            "email": $scope.email,
            "password": $scope.pwd,
            "phone-no": $scope.phno,
            "address": $scope.address,
            "image_url": "profileImage.jpg"
        };
        localStorage.setItem("profileInfo",JSON.stringify($scope.userDetails));
        alert("Successful!! Please login to continue");
        location.reload();
    };

    /** Checks login functionality and logins to different page**/
    $scope.loginCheck = function(){
        if($scope.uname === JSON.parse(localStorage.profileInfo)["name"])
        {
            if($scope.loginpwd === JSON.parse(localStorage.profileInfo)["password"])
            {
                location.replace("ProfileInfo.html");
            }
        }
        else{
            alert("Please do enter correct credentials");
        }
    };
});