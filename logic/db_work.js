const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://micent_control_panel:9QdtAW2TXmmoPYH0@devices-data.oyenf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("clusters");
const device = database.collection("one");

async function update_sensor(device_number, humidity, temperature, water_level, time){
    try {
        await client.connect();

        const query = { device: device_number };
        const options = {
            upsert:false
        };

        const replacement = {
            Humidity: humidity,
            Water_level: water_level,
            Temperature: temperature,
            Time: time
        };

        await device.updateOne(query,{ $set: replacement}, options);

    } finally {
        await client.close();
    }
}

async function update_auto(device_number, auto){
    try {
        await client.connect();

        const query = { device: device_number };
        const options = {
            upsert:false
        };

        const replacement = {
            Auto: auto
        };

        await device.updateOne(query,{ $set: replacement}, options);

    } finally {
        await client.close();
    }
}

async function update_control(device_number, cooling, ventilation, light1, pump, auto){
    try {
        await client.connect();

        const query = { device: device_number };
        const options = {
            upsert:false
        };

        const replacement = {
            Cooling: cooling,
            Ventilation: ventilation,
            Light1: light1,
            Pump: pump,
            Auto: auto
        };

        await device.updateOne(query,{ $set: replacement}, options);

    } finally {
        await client.close();
    }
}

async function update_db(device_number, cooling, ventilation, light1, humidity, temperature, water_level, pump, time) {
    try {
        await client.connect();

        const query = { device: device_number };
        const options = {
            upsert: true,
        };

        const replacement = {
            device: device_number,
            Cooling: cooling,
            Ventilation: ventilation,
            Light1: light1,
            Humidity: humidity,
            Temperature: temperature,
            Water_level: water_level,
            Pump: pump,
            Time: time
        };

        await device.updateOne(query,{ $set: replacement}, options);

    } finally {
        await client.close();
    }
}

async function get(device_number) {
    var findResult;
    try {
        await client.connect();

        findResult = await device.findOne({
            device: device_number,
        });
    }
    finally {
        await client.close();
        return findResult;
    }
}

module.exports.update_control = update_control;
module.exports.update_sensor = update_sensor;
module.exports.update_auto = update_auto;
module.exports.update_db = update_db;
module.exports.get = get;