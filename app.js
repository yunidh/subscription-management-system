"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send({ message: "Welcome to Subscription Tracker API" });
});
app.listen(3000, "localhost", function () {
    console.log("Subscription Tracker API is running at http://localhost:3000");
});
exports.default = app;
