var express = require('express');
const { send_data_control_page } = require('../../logic/test/control_page_logic');

function subscribe_device(req, res, users) {
    //send_data_control_page(req, res, "data", users);
}

function send_data_from_device(req, res, users) {
    var Query = req.query;
    var getId = Query.id; // Users id

    if (getId === undefined) {
        // Check user identificator
        res.status(401);
        res.send("Id undefined!");
    }

    else {
        var haveUndefinedParametr = false;
        var parameters = { Temperature: Query.temperature, Humidity: Query.humidity, Light1: Query.light1, Ventilation: Query.ventilation, Cooling: Query.cooling };
        for (var parameter_ in parameters) if (parameters[parameter_] === undefined) haveUndefinedParametr = true;
    

        if (!haveUndefinedParametr) {
            send_data_control_page(getId, parameters, users);
            res.setHeader('Content-Type', 'text/plain;charset=utf-8');
            res.setHeader("Cache-Control", "no-cache, must-revalidate");
            res.end("Ok");
        }
        else {
            res.status(400);
            res.send("Not all parameters were received!");
        }
    }
}

module.exports.subscribe_device = subscribe_device;
module.exports.send_data_from_device = send_data_from_device;