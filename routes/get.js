var express = require('express');
var router = express.Router();

const { get, update_db, update_control } = require('../logic/db_work');

router.get('/', async (req, res, next) => {
    if (req.query.getdata == undefined) {
       
       if(req.query.update_contol == 'True') await update_control(1, Boolean(+req.query.condition), Boolean(+req.query.ventilation), Boolean(+req.query.light1), Boolean(+req.query.pump));
       if(req.query.update_all == 'True') await update_db(1, Boolean(+req.query.condition), Boolean(+req.query.ventilation), Boolean(+req.query.light1), parseInt(req.query.humidity, 10), parseInt(req.query.temperature, 10), Boolean(+req.query.pump), req.query.time);
    }
    let data = await get(1);
    
    res.send(`{"light1":"${+data.Light1}",
        "condition":"${+data.Condition}",
        "ventilation":"${+data.Ventilation}",
        "humidity":"${data.Humidity}",
        "temperature":"${data.Temperature}",
        "pump":"${+data.Pump}",
        "time":"${data.Time}"}`);
});

module.exports = router;