"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = new express();
app.get('/', function (req, res) {
    res.send('listening to port 3000');
});
app.listen(3000, function () {
    console.log("listening to port 3000");
});
