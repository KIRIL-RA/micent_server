const express = require("express");
const path = require('path');

const app = express();
var getRouter = require('./routes/get')

app.use("/", express.static(__dirname + '/html/index'));
app.use("/get", getRouter);

app.listen(80)
