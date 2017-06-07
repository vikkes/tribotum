'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidV1 = require('uuid/v1');
const fs = require("fs");

const dialog = require("./app/dialog.js").dialog;

const restService = express();
var log = {};
var obj = {};
var commands = {};

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tribotum/answer', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var speech = req.body.answer ? req.body.answer : "none";
    var qId = req.body.qId ? req.body.qId : 0;
    var uId = req.body.uId;
    console.log(qId);
    var answerExpected = obj[qId]["condition"]["answer"];
    var tag = obj[qId]["tag"];

    if (tag == "init") {
        log[uId] = {};
    }
    else {
        log[uId][tag] = speech;
    }
    dialog(qId, answerExpected, speech, obj, commands, function(data) {
        //console.log(data.qIdNext+"+"+data.speech);
        console.log(JSON.stringify(data))
        return res.json({
            qId: data.qId,
            content: data.speech
        });
    });

});

restService.get('/tribotum/newuser', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var uuid_user = uuidV1();
    fs.readFile('/home/ubuntu/workspace/bot/data/commands.json', 'utf8', function(err, data) {
        if (err) {

        }

        commands = JSON.parse(data);

        return res.json({
            id: uuid_user,
            source: 'newuser'
        });
    });

});

restService.get('/tribotum/log', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //console.log(req.query);
    var uuid = req.query.uid ? req.query.uid : 1;
    var log_data = log[uuid];
    console.log(log_data)
    return res.json({
        log: log_data
    });
});

restService.get('/tribotum/question', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var num = req.query.num ? req.query.num : 1;



    fs.readFile('/home/ubuntu/workspace/bot/data/questions.json', 'utf8', function(err, data) {
        if (err) {
            return res.json({
                err,
                source: 'question_err'
            });
        }

        obj = JSON.parse(data);
        var tempObj = obj[num];
        return res.json({
            qId: num,
            content: tempObj
        });
    });


});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
