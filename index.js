'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidV1 = require('uuid/v1');

const restService = express();
var log="";

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tribotum', function(req, res) {
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var speech = req.body.name  ? req.body.name : "Ups."
    log +=speech;
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
    
    console.log(uuid_user);
    
    return res.json({
        id: uuid_user,
        source: 'newuser'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});