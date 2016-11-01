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
app.use(express.static(__dirname + '/client'));
app.set('x-powered-by', false);

// connect MongoDB
config.connectDB();

app.get('/', function(req, res) {
    res.status(200).sendFile(__dirname + '/client/index.html');
});

app.get('/allUsers', function(req, res) {
    User.find({}, function(err, docs) {
        if (err) {
            console.error(err);
        } else {
            res.send(docs);
        }
    });
});

app.post('/newUser', function(req, res) {
    var data = req.body;
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

app.put('/updateUser/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            age: req.body.age
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

app.delete('/delUser/:id', function(req, res) {
    console.log(req.params.id);
    User.remove({
        _id: req.params.id
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