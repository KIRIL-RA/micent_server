const {subscribe_state_update, subscribe_getted_data_update} = require('../../logic/test/control_page_logic');
const {subscribe_device, send_data_from_device} = require('../../logic/test/device_logic');
const { get } = require('../../logic/db_work');
var express = require('express');
var router = express.Router();

var users = {};
var devices = {};

router.get('/subscribe_state_page', async (req, res, next) => {
  subscribe_state_update(req, res, users);
  //subscribe_type_analizer(req, res);
});

router.get('/subscribe_send_control', async (req, res, next) => {
  subscribe_getted_data_update(req, res, users);
  //subscribe_type_analizer(req, res);
});

router.get('/subscribe_device', async (req, res, next) => {
  subscribe_device(req, res, users);
});


router.get('/send_data_from_device', async (req, res, next) => {
  send_data_from_device(req, res, users);
});

router.get('/get', async (req, res, next) => {
  console.log("есть сообщение, клиентов:" + Object.keys(users).length);
  let data = await get(2);
    
    res.send(`{"light1":"${+data.Light1}",
        "cooling":"${+data.Cooling}",
        "ventilation":"${+data.Ventilation}",
        "humidity":"${data.Humidity}",
        "temperature":"${data.Temperature}",
        "pump":"${+data.Pump}",
        "water_level":"${data.Water_level}",
        "auto":"${+data.Auto}",
        "time":"${data.Time}"}`);
});

module.exports = router;