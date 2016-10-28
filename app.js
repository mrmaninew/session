'use strict';
const express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    User = require('./models/user'),
    app = express();

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('x-powered-by', false);

// connect MongoDB
config.connectDB();

app.get('/', function(req, res) {
    User.find({}, function(err, docs) {
        if (err) {
            console.error(err);
        } else {
            console.log(docs);
            res.send(docs);
        }
    });
});

app.post('/newUser', function(req, res) {
    var data = req.body;
    console.log(data);
    var user = new User();
    user.name = data.name; // req.body.name
    user.age = data.age // req.body.age 
    user.save(function(err, doc) {
        if (err) {
            console.error(err);
        } else {
            console.log(doc);
            res.send(doc);
        }
    });
});

app.put('/updateUser/:name', function(req, res) {
    var param = req.params.name;
    var body = req.body;
    // name: mani
    User.findOneAndUpdate({
        name: param
    }, {
        $set: {
            age: body.age
        }
    }, {
        new: true
    }, function(err, updateRecord) {
        if (err) {
            console.error(err);
        } else {
            console.log(updateRecord);
            res.send(updateRecord);
        }
    });
});

app.delete('/delUser/:name', function(req, res) {
    User.remove({
        name: req.params.name
    }, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(3001);