$(document).ready(function(){


    var config = {
        apiKey: "AIzaSyC5ifbz-lswWCpfrPDXdEN7Bo5YFU95xsE",
        authDomain: "train-time-5b190.firebaseapp.com",
        databaseURL: "https://train-time-5b190.firebaseio.com",
        projectId: "train-time-5b190",
        storageBucket: "train-time-5b190.appspot.com",
        messagingSenderId: "847937766241"
      };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("button").on("click",function()
    {
        event.preventDefault();
        var name=$("#name").val().trim();
        var destination=$("#destination").val().trim();;
        var first_time=$("#first_time").val();
        var frequency=parseInt($("#frequency").val().trim());

        var newTrain = {
            name: name,
            destination: destination,
            first_time: first_time,
            frequency:frequency
          };
        
          // Uploads employee data to the database
          database.ref().push(newTrain);
        $("#name").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");
    });
    database.ref().on("child_added", function(childSnapshot) {
        
      
        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var first_time = childSnapshot.val().first_time;
        var frequency = childSnapshot.val().frequency;
    
    var tFrequency=frequency;
    var firstTime=first_time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(name),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(moment(nextTrain).format("hh:mm")),
          $("<td>").text(tMinutesTillTrain)
          
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });

});
