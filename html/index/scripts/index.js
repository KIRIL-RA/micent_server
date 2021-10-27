var main_page = document.getElementsByClassName('MAIN_PAGE_NOT_LOADED')[0];
var info = document.getElementsByClassName('INFO_NOT_LOADED')[0];
var control_block = document.getElementsByClassName('CONTROL_BLOCK')[0];
var humidity_block = document.getElementsByClassName('HUMIDITY_BLOCK')[0];
var temperature_block = document.getElementsByClassName('TEMPERATURE_BLOCK')[0];
var state_controllers = control_block.children;

var states = { light1: false, condition: false, ventilation: false, pump: false };

fetch('/get?getdata=true').then(response => response.json())
    .then(res => {
        // First fetch

        // Change design from loading to normal
        main_page.className = "MAIN_PAGE";
        info.className = "INFO";

        // Show temperature, humidity
        temperature_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.temperature + '°';
        humidity_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.humidity + '%';

        // Writing states, recived from server
        states.light1 = Boolean(+res.light1);
        states.condition = Boolean(+res.condition);
        states.ventilation = Boolean(+res.ventilation);
        states.pump = Boolean(+res.pump);

        // Initialize click handlers
        state_controllers[0].onclick = light_click;
        state_controllers[1].onclick = condition_click;
        state_controllers[2].onclick = ventilation_click;
        state_controllers[3].onclick = pump_click;

        update_state_controllers();
        setInterval(get_data, 5000);
    });

function update_state_controllers() {
    // Update state controllers interface

    // Light block
    if (states.light1) {
        state_controllers[0].className = "CONTROLLER_BLOCK_ON";
        state_controllers[0].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Вкл";
    }
    else {
        state_controllers[0].className = "CONTROLLER_BLOCK_OFF";
        state_controllers[0].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Выкл";
    }

    // Condition block
    if (states.condition) {
        state_controllers[1].className = "CONTROLLER_BLOCK_ON";
        state_controllers[1].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Вкл";
    }
    else {
        state_controllers[1].className = "CONTROLLER_BLOCK_OFF";
        state_controllers[1].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Выкл";
    }

    // Ventilation block
    if (states.ventilation) {
        state_controllers[2].className = "CONTROLLER_BLOCK_ON";
        state_controllers[2].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Вкл";
    }
    else {
        state_controllers[2].className = "CONTROLLER_BLOCK_OFF";
        state_controllers[2].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Выкл";
    }

    // Pump block
    if (states.pump) {
        state_controllers[3].className = "CONTROLLER_BLOCK_ON";
        state_controllers[3].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Вкл";
    }
    else {
        state_controllers[3].className = "CONTROLLER_BLOCK_OFF";
        state_controllers[3].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Выкл";
    }
}

async function get_data() {
    // Send data and get data
    let response = await fetch(`/get?update_contol=True&ventilation=${+states.ventilation}&condition=${+states.condition}&light1=${+states.light1}&pump=${+states.pump}`);
    let res = await response.json();
    
    console.log(res);
    temperature_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.temperature + '°';
    humidity_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.humidity + '%';

    states.light1 = Boolean(+res.light1);
    states.condition = Boolean(+res.condition);
    states.ventilation = Boolean(+res.ventilation);
    states.pump = Boolean(+res.pump);

    update_state_controllers();
}

// Click handlers
function light_click() {
    states.light1 = !states.light1;
    update_state_controllers();
}

function condition_click(){
    states.condition = !states.condition;
    update_state_controllers();
}

function ventilation_click(){
    states.ventilation = !states.ventilation;
    update_state_controllers();
}

function pump_click(){
    states.pump = !states.pump;
    update_state_controllers();
}