var db = firebase.firestore();
var realtimedb = firebase.database();

//DataTable
function listRobots() {
    db.collection("robots").get().then((querySnapshot) => {
        let combobox = $("#robots");
        querySnapshot.forEach((doc) => {
            combobox.append(createListRobotTemplate(doc));
        });
        
    })
};
function createListRobotTemplate(robot) {
    var data = {
        robotName : robot.data().name
    }
    let template = $("#robots-temeplate")[0].innerHTML;
    return Mustache.render(template, data);
}

$(document).ready(function () {
    listRobots();
});

var robotReference = realtimedb.ref().child('q');
var map;
var marker;

function changeDatabaseReference(robotName) {
    initMap();
    currentRobot = robotName;
    robotReference = realtimedb.ref().child(robotName);

    robotReference.on('value', snap => {
        console.log(JSON.stringify(snap.val()));

        if(snap.val().coordinates!=undefined)
            updateMapMarker(snap.val().coordinates);

        $("#robotfeed").html(JSON.stringify(snap.val(),null,2));
    });

}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 4
    });
    marker = null;
}

function updateMapMarker(position){
    const coordinates = position.split("@");
    const latD = parseFloat(coordinates[0]);
    const lngD = parseFloat(coordinates[1]);
    const latlng = {lat: latD, lng: lngD }
    if(marker == undefined ){
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: "https://img.icons8.com/color/48/000000/filled-circle.png"
        });
    }
    else{
        marker.setPosition(latlng);
    }
    map.panTo(latlng);
    map.setZoom(8);
}