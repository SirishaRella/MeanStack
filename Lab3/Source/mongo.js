var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var path= require("path");
var express = require('express');
var cors = require('cors');
const Clarifai = require('clarifai');
var app = express();
var url = 'mongodb://siri:siri123@ds147599.mlab.com:47599/labdatabase';
const clarifiaApp = new Clarifai.App({apiKey: '2c44c27307bd4e778887f89862bf6b0a'});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname +'/'));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('labdatabase');
        insertDocument(db, req.body, function() {
            res.sendStatus(200);
            res.write("Successfully inserted");
            res.end();
        });
    });
});
app.post('/login', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(err,null);
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        var db =client.db('labdatabase');
        findUser(db, req.body, function() {
           // res.sendStatus(200);
            res.end();
        });

    });
});

app.post('/predict',function (req, res) {
    clarifiaApp.models.predict(Clarifai.GENERAL_MODEL, req.body.imageurl).then(
        function(response) {
            res.send(response['outputs'][0]['data']['concepts']);
            MongoClient.connect(url, function(err, client) {

                if(err)
                {
                    res.write("Failed, Error while connecting to Database");
                    res.end();
                }
                var db =client.db('labdatabase');
                for(var i=0;i<response['outputs'][0]['data']['concepts'].length;i++) {
                    console.log(response['outputs'][0]['data']['concepts'].length);
                    var predictData = {
                        "id": req.body.imageurl, "name": response['outputs'][0]['data']['concepts'][i].name,
                        "value": response['outputs'][0]['data']['concepts'][i].value
                    };
                    insertDocument(db, predictData, function () {
                        res.sendStatus(200);
                        res.write("Successfully inserted Predicted Data");
                        res.end();
                    });
                }
            });
        },
        function(err) {
            console.log(err);
        });
});
app.post('/retrieve',function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('labdatabase');
        var cursor = db.collection('labcollection').find({id:req.body.imgUrl, name:req.body.search});
        cursor.each(function(err,doc) {
            if(doc != null){
                var jsonData ={
                    "name":doc.name,
                    "value":doc.value
                };
                console.log(doc.value);
               console.log(doc.name);
               res.send(jsonData);

            }
        });
    });

});
app.post('/delete',function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('labdatabase');
        var cursor = db.collection('labcollection').deleteOne({id:req.body.imgUrl, name:req.body.search}).then(function () {
            res.send("Deleted item successfullly");

        });

    });

});
app.post('/update',function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('labdatabase');
        var cursor = db.collection('labcollection').updateOne({"name":req.body.current},  { $set:{"name":req.body.update}}).then(function () {
            res.send("Updated item successfullly");

        });

    });

});

var insertDocument = function(db, data) {
    db.collection('labcollection').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
    });
};
var findUser = function(db, data, callback) {
    var cursor = db.collection('labcollection').find({"uemail":data.lemail,"upwd":data.lpwd});
    cursor.each(function(err,doc) {
        console.log(doc);
        if(doc != null)
        {
            console.log("First Name:" + doc.uemail);
            console.log("Last Name:" + doc.upwd);
            callback();
        }
    });
};
var server = app.listen(8082,'localhost',function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});