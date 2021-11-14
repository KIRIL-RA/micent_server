var express = require('express');
require('../../logic/db_work');

function send_data_control_page(id, message, users) {
    for (var user in users) {
        console.log("отсылаю сообщение " + user);
        var res = users[user].res;
        res.end(message);
        delete users[user];
    }
}

function subscribe_state_update(req, res, users) {
    var id = req.socket.remoteAddress;
    var getId = req.query.id;

    if (getId === undefined) {
        res.status(401);
        res.send("Id undefined!");
    }

    else {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        users[id] = { res, getId };
        console.log(users[id]);
    }

    req.on('close', () => delete users[id]);
}

async function subscribe_type_analizer(req, res, users) {
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