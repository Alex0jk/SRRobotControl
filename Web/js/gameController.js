var realdb = firebase.database();

var mapping = {
  buttons:{
    A:{
      collection:"light",
      value:"1"
    },
    X:{
      collection:"camera",
      value:"1"
    }
  },
  directions:{
    up:{
      collection:"command",
      value:"forward"
    },  
    down:{
      collection:"command",
      value:"backward"
    },
    left:{
      collection:"command",
      value:"left"
    },
    right:{
      collection:"command",
      value:"right"
    }
  }
};
var currentRobot = "robot12342";
var start;

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
  if (buttonPressed(gp.buttons[2])) { // Button X or Square
      console.log(mapping.buttons.X.value);
      mapping.buttons.X.value="0";
  }
  if (buttonPressed(gp.buttons[3])) { // Button Y or Triangle
    console.log(gp);
  }
  if (buttonPressed(gp.buttons[12])) { // Button Up
    console.log(mapping.directions.up.value);
    console.log(updateRobotValue(mapping.directions.up.collection,mapping.directions.up.value));
  }
  if (buttonPressed(gp.buttons[13])) { // Button Down
    console.log(mapping.directions.down.value);
    updateRobotValue(mapping.directions.down.collection,mapping.directions.down.value);
  }
  if (buttonPressed(gp.buttons[14])) { // Button Left
    console.log(mapping.directions.left.value);
    updateRobotValue(mapping.directions.left.collection,mapping.directions.left.value);
  }
  if (buttonPressed(gp.buttons[15])) { // Button Right
    console.log(mapping.directions.right.value);
    updateRobotValue(mapping.directions.right.collection,mapping.directions.right.value);
  }
  
  start = rAF(gameLoop);
}

