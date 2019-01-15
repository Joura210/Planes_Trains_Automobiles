$(document).ready(function () {
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB_OxvfQ7eFOADtMsIkQcu3RtrGXkN_mEI",
    authDomain: "planes-trains-automobiles.firebaseapp.com",
    databaseURL: "https://planes-trains-automobiles.firebaseio.com",
    projectId: "planes-trains-automobiles",
    storageBucket: "planes-trains-automobiles.appspot.com",
    messagingSenderId: "363035415997"
  };
  firebase.initializeApp(config);

  var data = firebase.database();

  $("#newInput").on("click" , function(event){
      event.preventDefault();

// Grab our input

    var trainName = $("#newTrain").val().trim();
    var destination = $("#newDestination").val().trim();
    var firstTime = moment($("#firstTime").val().trim(), "HH:mm").format("LT");;
    var tripLength = $("#frequency").val().trim();

// Local Temp Obj

    var trainTime = {
        train: trainName,
        destination: destination,
        time: firstTime,
        trip: tripLength,
    };

    // Upload to database

    data.ref().push(trainTime);

    // console log

    console.log(trainTime.train);
    console.log(trainTime.destination);
    console.log(trainTime.time);
    console.log(trainTime.trip);

    // Clear those bad boys
    
    $("#newTrain").val("");
    $("#newDestination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");

  });

  data.ref().on("child_added", function(childSnap){
      console.log(childSnap.val());

      var trainName = childSnap.val().train;
      var destination = childSnap.val().destination;
      var firstTime = childSnap.val().time;
      var tripLength = childSnap.val().trip;

    //   See results
    console.log(trainName);
    console.log(destination);
    console.log(tripLength);
    console.log(firstTime);

    var newTrip = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(tripLength),
        $("<td>").text(firstTime),

    );

    $("#trainTable > tbody").append(newTrip);
  });


});