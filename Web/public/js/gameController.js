var realdb = firebase.database();

var mapping;
var currentRobot = "robot12342";
var start;
var buttonStates = [false,false,false,false]

var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
      gameLoop();
});

window.addEventListener("gamepaddisconnected", function() {
    gamepadInfo.innerHTML = "Waiting for gamepad.";
    rAFStop(start);
});

if(!('GamepadEvent' in window)) {
  // No gamepad events available, poll instead.
  var interval = setInterval(pollGamepads, 500);
}
function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  buttonStates = [false,false,false,false]
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if(gp) {
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function updateRobotValue(collection,value){
  var updates = {};
  updates['/'+currentRobot+'/'+collection] = value;
  return firebase.database().ref().update(updates);
}


function gameLoop(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads)
    return;
  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[0])) { // Button A or Cross
      console.log(mapping.buttons.A.value);
      mapping.buttons.A.value="0";
  }
  if (buttonPressed(gp.buttons[1])) { // Button B or Circle
      
  }
  if (buttonPressed(gp.buttons[2]) && buttonStates[2] == false) { // Button X or Square
      buttonStates[2] = true;
      console.log(buttonStates[2]);
      console.log(mapping.buttons.X.value);
      console.log(updateRobotValue(mapping.buttons.X.collection,mapping.buttons.X.value));
      if(mapping.buttons.X.value==="on")
        mapping.buttons.X.value="off";
      else
        mapping.buttons.X.value="on";
  }
  else if(!buttonPressed(gp.buttons[2]) && buttonStates[2] == true){
    buttonStates[2] = false;
    console.log(buttonStates[2]);
  }
  if (buttonPressed(gp.buttons[3])) { // Button Y or Triangle
    console.log(gp);
  }

  if (buttonPressed(gp.buttons[12])) { // Button Up
    console.log(mapping.directions.up.value);
    console.log(updateRobotValue(mapping.directions.up.collection,mapping.directions.up.value));
  }
  else if (buttonPressed(gp.buttons[13])) { // Button Down
    console.log(mapping.directions.down.value);
    updateRobotValue(mapping.directions.down.collection,mapping.directions.down.value);
  }
  else if (buttonPressed(gp.buttons[14])) { // Button Left
    console.log(mapping.directions.left.value);
    updateRobotValue(mapping.directions.left.collection,mapping.directions.left.value);
  }
  else if (buttonPressed(gp.buttons[15])) { // Button Right
    console.log(mapping.directions.right.value);
    updateRobotValue(mapping.directions.right.collection,mapping.directions.right.value);
  }
  else{
    updateRobotValue(mapping.directions.stop.collection,mapping.directions.stop.value);
  } 
    
  start = rAF(gameLoop);
}

