const {subscribe_state_update} = require('../../logic/test/control_page_logic');
const {subscribe_device} = require('../../logic/test/device_logic');
var express = require('express');
var router = express.Router();

var users = {};
var devices = {};

router.get('/subscribe_state_page', async (req, res, next) => {
  subscribe_state_update(req, res, users);
  //subscribe_type_analizer(req, res);
});

router.get('/subscribe_device', async (req, res, next) => {
  subscribe_device(req, res, users);
});

router.get('/get', async (req, res, next) => {
  console.log("есть сообщение, клиентов:" + Object.keys(users).length);

});

module.exports = router;