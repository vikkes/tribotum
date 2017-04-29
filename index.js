'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tribotum', function(req, res) {
    console.log(req.body)
    var speech = req.body.name  ? req.body.name : "Ups."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'tribotum'
    });
});
restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});