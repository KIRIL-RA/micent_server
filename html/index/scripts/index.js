var main_page = document.getElementsByClassName('MAIN_PAGE_NOT_LOADED')[0];
var info = document.getElementsByClassName('INFO_NOT_LOADED')[0];
var control_block = document.getElementsByClassName('CONTROL_BLOCK')[0];
var humidity_block = document.getElementsByClassName('HUMIDITY_BLOCK')[0];
var temperature_block = document.getElementsByClassName('TEMPERATURE_BLOCK')[0];
var state_controllers = control_block.children;

var states = { light1: false, cooling: false, ventilation: false, pump: false, auto: false };

fetch('/get').then(response => response.json())
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
        states.cooling = Boolean(+res.cooling);
        states.ventilation = Boolean(+res.ventilation);
        states.pump = Boolean(+res.pump);
        states.auto = Boolean(+res.auto);

        // Initialize click handlers
        if(states.auto == false){
            state_controllers[0].onclick = light_click;
            state_controllers[1].onclick = cooling_click;
            state_controllers[2].onclick = ventilation_click;
            state_controllers[3].onclick = pump_click;
        }
        else{
            state_controllers[0].onclick = auto_mode_click_other;
            state_controllers[1].onclick = auto_mode_click_other;
            state_controllers[2].onclick = auto_mode_click_other;
            state_controllers[3].onclick = auto_mode_click_other;
        }
        state_controllers[4].onclick = auto_click;

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

    // cooling block
    if (states.cooling) {
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

    // Auto block
    if (states.auto) {
        state_controllers[4].className = "CONTROLLER_BLOCK_ON";
        state_controllers[4].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Вкл";
    }
    else {
        state_controllers[4].className = "CONTROLLER_BLOCK_OFF";
        state_controllers[4].getElementsByClassName('CONTROL_BLOCK_STATE')[0].textContent = "Выкл";
    }

    if(states.auto == false){
        state_controllers[0].onclick = light_click;
        state_controllers[1].onclick = cooling_click;
        state_controllers[2].onclick = ventilation_click;
        state_controllers[3].onclick = pump_click;
    }
    else{
        state_controllers[0].onclick = auto_mode_click_other;
        state_controllers[1].onclick = auto_mode_click_other;
        state_controllers[2].onclick = auto_mode_click_other;
        state_controllers[3].onclick = auto_mode_click_other;
    }
}

async function get_data() {
    // Send data and get data
    var req;
    if(states.auto == false) req = `/get?update=control&ventilation=${+states.ventilation}&cooling=${+states.cooling}&light1=${+states.light1}&pump=${+states.pump}&auto=${+states.auto}`;
    else req = `/get?update=auto&auto=1`;
    let response = await fetch(req);
    let res = await response.json();
    
    console.log(res);
    temperature_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.temperature + '°';
    humidity_block.getElementsByClassName('TH_INFO_TEXT')[0].textContent = res.humidity + '%';

    states.light1 = Boolean(+res.light1);
    states.cooling = Boolean(+res.cooling);
    states.ventilation = Boolean(+res.ventilation);
    states.pump = Boolean(+res.pump);
    states.auto = Boolean(+res.auto);

    update_state_controllers();
}

// Click handlers
function light_click() {
    states.light1 = !states.light1;
    update_state_controllers();
}

function cooling_click(){
    states.cooling = !states.cooling;
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

function auto_mode_click_other(){
    // Handler for button clicks, if auto mode
    alert("Для использования необходимо отключить Авто режим!");
}

function auto_click(){
    states.auto = !states.auto;
    update_state_controllers();
}