'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidV1 = require('uuid/v1');
const fs = require("fs");

const restService = express();
var log = "";

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tribotum', function(req, res) {
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var speech = req.body.name ? req.body.name : "Ups."
    log += speech;
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'tribotum'
    });
});

restService.get('/tribotum', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("get");
    return res.json({
        log: log,
        source: 'tribotum'
    });
});

restService.get('/tribotum/newuser', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var uuid_user = uuidV1();

    //console.log(uuid_user);

    return res.json({
        id: uuid_user,
        source: 'newuser'
    });
});

restService.get('/tribotum/question', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var num = req.query.num ? req.query.num : 1
    console.log(num)
    fs.readFile('/home/ubuntu/workspace/bot/data/questions.json', 'utf8', function(err, data) {
        if (err) {
            
            return res.json({
                id: err,
                source: 'question_err'
            });
        }
        var obj = JSON.parse(data)
        console.log(obj);
        
        return res.json({
            id: obj,
            source: 'question'
        });

    });



});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
