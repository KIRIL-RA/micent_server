function send_data_to_device(id, parameters, devices){
    /*
     * Function for send data to device from control page or other sources    
     */
    
    var device = devices[id];
    if(device != undefined){
        var res = device.res;
        res.send(`
        {"light1":"${parameters.Light1}",
        "cooling":"${parameters.Cooling}",
        "ventilation":"${parameters.Ventilation}",
        "pump":"${parameters.Pump}",
        "auto":"${+parameters.Auto}"}`);
    }
}

function send_data_control_page(id, parameters, clients) {
    // NOT THE MOST OPTIMIZED FUNCTION, IT WOULD BE GOOD TO DO IT IN THE FUTURE :)

    /*
     * Function for send data from device to control page
     */

    for (var user in clients) {
        console.log("отсылаю сообщение " + user);
        var res = clients[user].res;
        var res_control = clients[user].res_control;
        res.send(`
        {"light1":"${parameters.Light1}",
        "cooling":"${parameters.Cooling}",
        "ventilation":"${parameters.Ventilation}",
        "humidity":"${parameters.Humidity}",
        "temperature":"${parameters.Temperature}",
        "pump":"${parameters.Pump}",
        "auto":"${+parameters.Auto}"}`);

        if(res_control != undefined) res_control.send(`{"result":"Data getted successfuly"}`);
        delete clients[user];
    }
}

module.exports.send_data_to_device = send_data_to_device;
module.exports.send_data_control_page = send_data_control_page;