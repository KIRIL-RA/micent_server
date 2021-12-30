$(document).ready(() => onLoaded());

let states = { light1: false, cooling: false, ventilation: false, pump: false, auto: false, temperature: 0, humidity: 0 };
let normal_states = { normal_temperature: [17, 22], normal_humidity: [25, 35] };

function onLoaded() {
    // First fetch
    fetch('/test/subscribe_state_page?id=111&get_data=1').then(response => response.json())
        .then(res => {
            if (res.device_status == "offline") {
                // If device offline, then animate offline status
                $('#LOADING').animate({ opacity: "hide" }, "0.5", (() => {
                    $('#LOADING').removeClass("NOT-LOADED-INFO-ACTIVE").addClass("NOT-LOADED-INFO-DISABLED");
                }));
                $('#CONNECTION-FAILED').removeClass("NOT-LOADED-INFO-DISABLED").addClass("NOT-LOADED-INFO-ACTIVE");
                $('#CONNECTION-FAILED').css("opacity", "0").animate({ opacity: "1" }, "0.5");
            }

            else {
                $('#LOADING').animate({ opacity: "hide" }, "1", (() => {
                    $('#LOADING').removeClass("NOT-LOADED-INFO-ACTIVE").addClass("NOT-LOADED-INFO-DISABLED");
                    $('#LOADING-DIV').toggleClass("DISABLED");
                    $('#SHOW-MAIN-DIV').toggleClass("DISABLED");
                    get_data_from_response(states, res);
                    update_show_blocks(states, normal_states);
                    send_data();
                }));
            }
        });
}

async function send_data() {
    fetch('/test/subscribe_state_page?id=111').then(async response => {
        if (response.status == 200) {
            var res = await response.json();
            get_data_from_response(states, res);
            update_show_blocks(states, normal_states);
        }

        send_data();
    });
}

function get_data_from_response(states, res) {
    states.temperature = res.temperature;
    states.humidity = res.humidity;
    states.light1 = Boolean(+res.light1);
    states.cooling = Boolean(+res.cooling);
    states.ventilation = Boolean(+res.ventilation);
    states.pump = Boolean(+res.pump);
    states.auto = Boolean(+res.auto);
}

/**
 * Function for update show blocks styles
 * @param {any} states 
 * @param {any} normal_states 
 */
function update_show_blocks(states, normal_states) {
    $("#SHOW-TEMPERATURE").text(states.temperature + '°'); // Show temperature
    // Update value status with new parameters
    if (states.temperature >= normal_states.normal_temperature[0] && states.temperature <= normal_states.normal_temperature[1]) $("#VALUE-STATUS-TEMPERATURE").removeClass("CRITICAL-OFF-VALUE").addClass("NORMAL-VALUE");
    else $("#VALUE-STATUS-TEMPERATURE").removeClass("NORMAL-VALUE").addClass("CRITICAL-OFF-VALUE");

    $("#SHOW-HUMIDITY").text(states.humidity + '%'); // Show humidity
    // Update value status with new parameters
    if (states.humidity >= normal_states.normal_humidity[0] && states.humidity <= normal_states.normal_humidity[1]) $("#VALUE-STATUS-TEMPERATURE").removeClass("CRITICAL-OFF-VALUE").addClass("NORMAL-VALUE");
    else $("#VALUE-STATUS-HUMIDITY").removeClass("NORMAL-VALUE").addClass("CRITICAL-OFF-VALUE");

    // Update show blocks
    set_show_block_state($("#VALUE-STATUS-LIGHT1"), $("#SHOW-LIGHT1"), states.light1);
    set_show_block_state($("#VALUE-STATUS-VENTILATION"), $("#SHOW-VENTILATION"), states.ventilation);
    set_show_block_state($("#VALUE-STATUS-COOLING"), $("#SHOW-COOLING"), states.cooling);
    set_show_block_state($("#VALUE-STATUS-PUMP"), $("#SHOW-PUMP"), states.pump);
}

/**
 * Function for toogle on/off show block
 * @param {any} show_block 
 * @param {any} show_value
 * @param {Boolean} state 
 */
function set_show_block_state(show_value, show_block, state) {
    if (state) {
        show_value.removeClass("CRITICAL-OFF-VALUE").addClass("NORMAL-VALUE");
        show_block.text("On");
    }
    else {
        show_value.removeClass("NORMAL-VALUE").addClass("CRITICAL-OFF-VALUE");
        show_block.text("Off");
    }
}