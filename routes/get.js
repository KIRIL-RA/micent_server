var express = require('express');
var router = express.Router();

const { get, update_db, update_control, update_auto, update_sensor } = require('../logic/db_work');

router.get('/', async (req, res, next) => {
    var Query = req.query;
    console.log(Query);
    switch(Query.update){
        case 'sensors':
            await update_sensor(1, parseInt(Query.humidity, 10), parseInt(Query.temperature, 10), parseInt(Query.water_level, 10), Query.time)
            break;
        case 'control':
            await update_control(1, Boolean(+Query.cooling), Boolean(+Query.ventilation), Boolean(+Query.light1), Boolean(+Query.pump), Boolean(+Query.auto));
            break;
        case 'all':
            await update_db(1, Boolean(+Query.cooling), Boolean(+Query.ventilation), Boolean(+Query.light1), parseInt(Query.humidity, 10), parseInt(Query.temperature, 10), parseInt(Query.water_level, 10), Boolean(+Query.pump), Query.time);
            break;
        case 'auto':
            await update_auto(1, Boolean(+Query.auto));
            break;
    }

    let data = await get(1);
    
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