var config = {
  apiKey: "AIzaSyCcaJEFmepQecDAGAd-LJpmEyhw8TkOAd8",
  authDomain: "trainactivitybasic31.firebaseapp.com",
  databaseURL: "https://trainactivitybasic31.firebaseio.com",
  projectId: "trainactivitybasic31",
  storageBucket: "trainactivitybasic31.appspot.com",
  messagingSenderId: "1035700984888"
};


firebase.initializeApp(config);
var database = firebase.database();




$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  
  var trainStart = moment($("#first-time-input").val(), "HH:mm").format("X");
  var tFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: tFrequency
  };

  database.ref().push(newTrain);

  alert("Train successfully added.");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");


	$("#train-name-input").html("");
	$("#destination-input").html("");
	$("#first-time-input").html("");
	$("#frequency-input").html("");

});


 database.ref().on("child_added", function (childSnapshot) {
  	console.log(childSnapshot.val());
  var firstTime = "03:30";
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	var tFrequency = childSnapshot.val().frequency;



    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log("First Time:" + firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

   
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain);


});

  



