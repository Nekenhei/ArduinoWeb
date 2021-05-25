
var apiKey = "D3E2BF871590A363DAC3E9B7BADA82A0"
var onPin = 7
var offPin = 6
var servoPin = 9
var mainString = "http://us01.proxy.teleduino.org/api/1.0/328.php?k={" + apiKey + "}&r="
var stringRequest = ""



function onLoad() {
    document.getElementById("apiTxt").textContent = apiKey
    document.getElementById("statusTxT").textContent = "Offline"
    document.getElementById("onTxt").textContent = onPin
    document.getElementById("offTxt").textContent = offPin
    document.getElementById("servoTxt").textContent = servoPin
}

//funciones botones
function setup() {
    stringRequest = mainString + "defineServo&servo=0&pin=" + servoPin
    llamadaAPI(stringRequest)
    stringRequest = mainString + "definePinMode&pin=" + onPin + "&mode=1"
    llamadaAPI(stringRequest)
    stringRequest = mainString + "definePinMode&pin=" + offPin + "&mode=1"
    llamadaAPI(stringRequest)
    
}
function prenderLedOn() {
    servo90()
    stringRequest = mainString + "setDigitalOutput&pin=" + onPin + "&output=" + "1"
    llamadaAPI(stringRequest)
    stringRequest = mainString + "setDigitalOutput&pin=" + offPin + "&output=" + "0"
    llamadaAPI(stringRequest)
    
}
function prenderLedOff() {
    servo0()
    stringRequest = mainString + "setDigitalOutput&pin=" + offPin + "&output=" + "1"
    llamadaAPI(stringRequest)
    stringRequest = mainString + "setDigitalOutput&pin=" + onPin + "&output=" + "0"
    llamadaAPI(stringRequest)
    
}


function servo0() {
    stringRequest = mainString + "setServo&servo=0&position=0"
    llamadaAPI(stringRequest)
}

function servo90() {
    stringRequest = mainString + "setServo&servo=0&position=90"
    llamadaAPI(stringRequest)
}

//funcion que reliza llamadas a la API
function llamadaAPI() {

    var request = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', stringRequest, true)

    request.onload = function () {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            console.log(data.status);
            document.getElementById("statusTxT").textContent = "Online"
        } else {
            console.log('error');
            document.getElementById("statusTxT").textContent = "Error"
        }
    }
    // Send request
    request.send()
}

