var express = require('express');
const {send_data_control_page}= require('../../logic/test/control_page_logic');

function subscribe_device(req, res, users){
    send_data_control_page(0, "data", users);
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.end("ok");
}

module.exports.subscribe_device = subscribe_device;