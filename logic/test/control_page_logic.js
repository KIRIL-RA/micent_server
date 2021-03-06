const e = require('express');
var express = require('express');
require('../../logic/db_work');
const { send_data_to_device } = require('./send_data');

function subscribe_getted_data_update(req, res, clients, devices) {
    /*
     * Function for get data from control page, and send recieved data to device 
     */

    var Query = req.query; // Getted parameters
    var id = req.socket.remoteAddress; // Client id
    var getId = Query.id; // Users id

    if (getId === undefined) {
        // Check user identificator
        res.status(401).send("Id undefined!");
    }

    else {
        var parameters = { Light1: Query.light1, Ventilation: Query.ventilation, Cooling: Query.cooling, Pump: Query.pump, Auto: Query.auto };

        if (parameters.Auto === undefined) res.status(400).send("Auto undefined!");
        else {
            if (parameters.Auto == 1) res.status(400).send("Can't change parameters, please disable auto mode!");
            else {
                send_data_to_device(getId, parameters, devices);
                // Send response to client, that we geted new data
                clients[id].res_control = res;
            }
        }
    }
}

function subscribe_state_update(req, res, clients, devices) {
    /*
     * Function adding a new customer to the customer list
     */

    var id = req.socket.remoteAddress; // Client id
    var Query = req.query;
    var getId = Query.id; // User id

    if (getId === undefined) {
        // Check user identificator
        res.status(401).send("Id undefined!");
    }

    else{
        clients[id] = { res, getId };// Adding client to subscribe list
        if(Query.get_data == '1'){ 
            // If we only need parameters from device, make request to device
            if(devices[getId]!=undefined)devices[getId].res.send('{"data_request":"true"}');
            else{
                res.status(404).send('{"device_status":"offline"}');
                delete clients[id]
            }
        }
        }

    // If client disconnected, then delete him
    req.on('close', () => delete clients[id]);
}

async function subscribe_type_analizer(req, res, clients) {
    var Query = req.query;
    console.log(Query);
    switch (Query.update) {
        case 'control':
            await update_control(2, Boolean(+Query.cooling), Boolean(+Query.ventilation), Boolean(+Query.light1), Boolean(+Query.pump), Boolean(+Query.auto));
            break;
        case 'auto':
            await update_auto(2, Boolean(+Query.auto));
            break;
    }
}

module.exports.subscribe_state_update = subscribe_state_update;
module.exports.subscribe_type_analizer = subscribe_type_analizer;
module.exports.subscribe_getted_data_update = subscribe_getted_data_update;