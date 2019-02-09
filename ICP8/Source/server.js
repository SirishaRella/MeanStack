var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var app = express();


app.use(express.static(__dirname +'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/display', function (req, res) {
    console.log(req.body);
    request("https://api.foursquare.com/v2/venues/explore?client_id=UI4R30BP32O2W3TNNZ4KUQVSXSNFHWATY3MK1XT0SDGRVY0V&client_secret=ZC5VMUCFNK1GR3N1F1SWSW1KF2DSJQVKXTLPOKP2VVR4RGUA&v=20180323&limit=3&near=" + req.body.location + "&query=" + req.body.search, function (error, data, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }
        console.log(data.body);
        res.send(JSON.parse(data.body));
        //Check for right status code
        if (data.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', data.statusCode);
        }
    });
});
   var server = app.listen(8083,'localhost',function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});