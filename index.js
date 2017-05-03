'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidV1 = require('uuid/v1');
const fs = require("fs");

const restService = express();
var log = "";
var obj = {};

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tribotum/answer', function(req, res) {
    //console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var speech = req.body.answer ? req.body.answer : "none";
    var qId = req.body.qId ? req.body.qId : 0;
    var answerExpected = obj[qId]["condition"]["answer"];
    var qIdNext;
    
    console.log(qId +" : " + speech +" : "+ answerExpected);

    if (answerExpected == speech) {
        qIdNext = obj[qId]["condition"]["follower"];
        
        speech = obj[qIdNext];
        console.log(qIdNext + " : " +speech);
    }
    else if (answerExpected == "text") {
        qIdNext = obj[qId]["condition"]["follower"];
        speech = obj[qIdNext];
    }
    else {
        speech = obj[-1];
        qIdNext=qId;
    }

    return res.json({
        qId:qIdNext,
        content: speech
    });
});

restService.get('/tribotum/newuser', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var uuid_user = uuidV1();
    return res.json({
        id: uuid_user,
        source: 'newuser'
    });
});

restService.get('/tribotum/question', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var num = req.query.num ? req.query.num : 1
    //console.log(num)
    fs.readFile('/home/ubuntu/workspace/bot/data/questions.json', 'utf8', function(err, data) {
        if (err) {
            return res.json({
                err,
                source: 'question_err'
            });
        }

        obj = JSON.parse(data)
        //console.log(data);
        var tempObj = obj[num];
        //console.log(tempObj);
        return res.json({
            qId: num,
            content: tempObj
        });
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});

//TODO: codnitional request
