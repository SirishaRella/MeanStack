 var ContentApp = angular.module("contentApp", []);
    ContentApp.controller("contentController", function ($scope, $http) {
           $scope.config = {
            apiKey: "AIzaSyDR-pOQU8in49ymSlBAOkElvuBizepLYnY",
            authDomain: "healthcare-cdms.firebaseapp.com",
            databaseURL: "https://healthcare-cdms.firebaseio.com",
            projectId: "healthcare-cdms",
            storageBucket: "healthcare-cdms.appspot.com",
            messagingSenderId: "478995691799"
        };
        firebase.initializeApp($scope.config);
        firebase.database().ref().once('value', function (snapshot){
            let resData = snapshot.val();
            let keys = Object.keys(snapshot.val());
            $scope.html = "";
            var imageURLS=[];
            for (var a = 0; a < keys.length; a++) {
               if(resData[keys[a]].email === JSON.parse(localStorage.profileInfo).email)
               {
                   imageURLS.push(resData[keys[a]].imageURL);
               }
            }
            $scope.imageURLS = {
                "url": imageURLS
            };
            localStorage.setItem("userUploads",JSON.stringify($scope.imageURLS));
            $scope.searchFunction = function(){
                console.log(resData[keys[0]].medData);
                html ="";
                for (var i = 0; i < keys.length; i++) {
                    var input;
                    var data1="";
                    input = document.getElementById('myinput');
                    filter = input.value.toUpperCase();
                    var str = resData[keys[i]].medData;
                    var str1 = str.toUpperCase();
                    var n = str1.search(filter);
                    var len = filter.length;
                    if(n != -1){
                        if(len == 0 ) {
                            $scope.html = "";
                            for(var i =0;i<keys.length;i++) {
                                data1= [resData[keys[i]].medData];
                                $scope.html = $scope.html + "<div class='imageBlock'><img src='" + resData[keys[i]].imageURL + "' class='imgStyle'>" +
                                    "<div id='demo' class='infoStyle text-center'><h3>Prescription Information:</h3><img src='https://barcode.tec-it.com/barcode.ashx?data=" + data1[i] +"&code=QRCode&dpi=96&dataseparator=' alt='Barcode Generator TEC-IT'/></div></div>";

                                document.getElementById('myHTML').innerHTML = $scope.html;
                            }

                        }
                         else {
                             data1= [resData[keys[i]].medData];
                            $scope.html = $scope.html + "<div class='imageBlock'><img src='" + resData[keys[i]].imageURL + "' class='imgStyle'>" +
                                "<div id='demo' class='infoStyle text-center'><h3>Prescription Information:</h3><img src='https://barcode.tec-it.com/barcode.ashx?data=" + data1[i] +"&code=QRCode&dpi=96&dataseparator=' alt='Barcode Generator TEC-IT'/></div></div>";
                    }
                    }
                    else{
                        $scope.html="";
                        document.getElementById('myHTML').innerHTML = $scope.html;
                    }
                }
            };
            for(var i =0;i<keys.length;i++) {
                var data1= [resData[keys[i]].medData];
                $scope.html = $scope.html + "<div class='imageBlock'><img src='" + resData[keys[i]].imageURL + "' class='imgStyle'>" +
                    "<div id='demo' class='infoStyle text-center'><h3>Prescription Information:</h3><img src='https://barcode.tec-it.com/barcode.ashx?data=" + data1[i] +"&code=QRCode&dpi=96&dataseparator=' alt='Barcode Generator TEC-IT'/></div></div>";
                document.getElementById('myHTML').innerHTML = $scope.html;
            }
        });
    });
    ContentApp.controller("hospitalController", function ($scope, $http) {
     $scope.profAddress = JSON.parse(localStorage.profileInfo).address;
        $scope.hosp = false;
            console.log($scope.profAddress);
            $http.get('https://api.foursquare.com/v2/venues/explore?client_id=UI4R30BP32O2W3TNNZ4KUQVSXSNFHWATY3MK1XT0SDGRVY0V&client_secret=ZC5VMUCFNK1GR3N1F1SWSW1KF2DSJQVKXTLPOKP2VVR4RGUA&v=20180323&limit=3&near=' + $scope.profAddress + '&query=hospitals').then(function (data) {
                console.log(data);
                $scope.hospitalsList = [];
                for (var i = 0; i < data.data.response.groups[0].items.length; i++) {
                    $scope.hospitalsList[i] = {
                        "name": data.data.response.groups[0].items[i].venue.name
                    };
                }
            });
        $scope.click= function()
        {
           var hosp = document.getElementById("hospitals");
           if (hosp.innerText === "Show Hospitals")
               {
                    hosp.innerText = "Hide Hospitals";
               }
           else
           {
               hosp.innerText ="Show Hospitals";
           }
            $scope.hosp = !$scope.hosp;
        }
 });

