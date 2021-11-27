const express = require("express");
const path = require('path');

const app = express();
var getRouter = require('./routes/get')
var testRouter = require('./routes/test/subscribe')

app.use("/", express.static(__dirname + '/html/test'));
app.use("/get", getRouter);
app.use("/test", testRouter);

app.listen(80)
