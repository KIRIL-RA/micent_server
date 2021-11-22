var express = require('express');
require('../../logic/db_work');

function send_data_control_page(id, parameters, clients) {
    // NOT THE MOST OPTIMIZED FUNCTION, IT WOULD BE GOOD TO DO IT IN THE FUTURE :)

    for (var user in clients) {
        console.log("отсылаю сообщение " + user);
        var res = clients[user].res;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        res.end(message);
        delete clients[user];
    }
}

function subscribe_getted_data_update(req, res, clients) {
    var id = req.socket.remoteAddress; // Client id
    var getId = req.query.id; // Users id

    if (getId === undefined) {
        // Check user identificator
        res.status(401);
        res.send("Id undefined!");
    }

    else {
        // Send response to previous client request, that there is no new data
        if (clients[id] != undefined) {
            clients[id].res.status(204).send("No data to update");
            delete clients[id]
        }

        // Send response to client, that we geted new data
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        res.end("Data getted succesful");
    }
}

function subscribe_state_update(req, res, clients) {

    var id = req.socket.remoteAddress; // Client id
    var getId = req.query.id; // User id

    if (getId === undefined) {
        // Check user identificator
        res.status(401);
        res.send("Id undefined!");
    }

    // Adding client to subscribe list
    else clients[id] = { res, getId };

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

module.exports.send_data_control_page = send_data_control_page;
module.exports.subscribe_state_update = subscribe_state_update;
module.exports.subscribe_type_analizer = subscribe_type_analizer;
module.exports.subscribe_getted_data_update = subscribe_getted_data_update;