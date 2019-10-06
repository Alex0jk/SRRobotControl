var db = firebase.firestore();
var currentRobot = "";
var robotList;
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
        robotName: robot.data().name
    }
    let template = $("#robots-temeplate")[0].innerHTML;
    return Mustache.render(template, data);
}

function changeDatabaseReference(robotName) {
    currentRobot = robotName;
}

function createHistoryTemplate(robot) {
    var robotData = {
        id : robot.id,
        name : robot.data().robotName,
        date: robot.data().date.toDate().toISOString(),
        data: robot.data().robotData
    }
    robotList.push(robotData);
    let template = $("#history-data-template")[0].innerHTML;
    return Mustache.render(template, robotData);
}
function showDetailedDate(id){
    historyData = robotList.find(element => element.id == id);
    $("#historyDetails").html(JSON.stringify(historyData,null,3));  
}
function searchRobotDataByDate() {
    const fromDate = new Date($("#datetimepickerfrom").datetimepicker("viewDate"));
    const toDate = new Date($("#datetimepickerto").datetimepicker("viewDate"));
    let robotHistoryRef = db.collection('robotHistory');
    if (currentRobot !== "") {
        let query = robotHistoryRef.where('robotName', '==', currentRobot)
                                   .where('date', '>', fromDate)
                                   .where('date', '<', toDate).get()
            .then(snapshot => {
                
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                $("#robotHistory tbody tr").remove();
                let table = $("#robotHistory tbody");
                robotList = [];

                snapshot.forEach(doc => {
                    table.append(createHistoryTemplate(doc));
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
}
$(document).ready(function () {
    listRobots();
    $('#datetimepickerfrom').datetimepicker();
    $('#datetimepickerto').datetimepicker();
});