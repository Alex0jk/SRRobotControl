var db = firebase.firestore();
var realtimedb = firebase.database();

//DataTable
function readRobots() {
    db.collection("robots").get().then((querySnapshot) => {
        let table = $("#robots tbody");
        querySnapshot.forEach((doc) => {
            table.append(createRobotTemplate(doc));
        });
        
    })
};
function createRobotTemplate(robot) {
    var robotData = {
        id : robot.id,
        name : robot.data().name,
        lastSeen : robot.data().lastSeen.toDate().toISOString(),
        creationDate : robot.data().creationDate.toDate().toISOString()
    }
    let template = $("#robots-data-template")[0].innerHTML;
    return Mustache.render(template, robotData);
}
$(document).ready(function () {
    readRobots();
});

//Modal
function showRobotDataModal(name){
    firebase.database().ref('/'+name+'/').once('value').then(function(snapshot){
        var data ={
            name: name,
            robotData: JSON.stringify(snapshot.val(), undefined, 2)
        }
        let template = $("#robot-modal-template")[0].innerHTML;
        var html = Mustache.render(template,data);
        $("#modalData").html(html);
        $("#robotDataModal").modal("show");
    });    

}