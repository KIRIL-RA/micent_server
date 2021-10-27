const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
    "mongodb+srv://micent_control_panel:9QdtAW2TXmmoPYH0@devices-data.oyenf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("clusters");
const device = database.collection("one");

async function update(device_number, condition, ventilation, light1, humidity, temperature, time) {
    try {
        // create a query for a movie to update
        const query = { device: device_number };
        const options = {
            // create a document if no documents match the query
            upsert: true,
        };
        // create a new document that will be used to replace the existing document
        const replacement = {
            device: device_number,
            Condition: condition,
            Ventilation: ventilation,
            Light1: light1,
            Humidity: humidity,
            Temperature: temperature,
            Time: time
        };
        const result = await device.replaceOne(query, replacement, options);
        return true;
    } 
    catch{
        return false;
    }
}

async function connect() {
    try {
        await client.connect();
        return true;
    }
    catch {
        return false;
    }
}

async function get_data(device_number){
    try{
        findResult = await devices.findOne({
            device: device_number,
        });
        return findResult;
    }
    catch{
        return false;
    }
}

async function close_connection(){
    try{
        await client.close();
        return true;
    }
    catch{
        return false;
    }
}

module.exports.get_data = get_data;
module.exports.connect = connect;
module.exports.close_connection = close_connection;
module.exports.update = update;


