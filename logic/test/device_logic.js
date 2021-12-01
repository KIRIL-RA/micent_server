var express = require('express');
const { get } = require('../db_work');
const { send_data_control_page } = require('./send_data');

function subscribe_device(req, res, devices) {
    /*
     * Function adding new device to connected device list
     * Works at /subscribe_device
     */

    var Query = req.query;
    var getId = Query.id; // Users id

    // If id undefined, we can't connect device 
    if (getId === undefined) res.status(401).send("Id undefined!"); // Check user identificator

    else {
        if(devices[getId] != undefined) res.status(422).send("Device already exists"); // If device already connected, we can't connect it second time
        else devices[getId] = { res };
    }

    req.on('close', () => delete devices[getId]);
}

function send_data_from_device(req, res, users, devices) {
    /*
     * Function for get data from device, and send recieved data to control page
     * Works at /send_data_from_device
     */

    var Query = req.query;
    var getId = Query.id; // Users id
    if (getId === undefined) res.status(401).send("Id undefined!"); // Check user identificator

    else {
        if (devices[getId] != undefined) {
            devices[getId].res.status(204).send(`{"error":"No data to update"}`);
            delete devices[getId];
        }

        var haveUndefinedParametr = false;
        var parameters = { Temperature: Query.temperature, Humidity: Query.humidity, Light1: Query.light1, Ventilation: Query.ventilation, Cooling: Query.cooling, Pump: Query.pump, Auto: Query.auto };
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