$(document).ready(function () {

    // Setting up global variables
    var time = moment().format('H');
    var currentDay = moment().format('LLLL');
    var numActualHour = parseInt(time, 10);
    var count = 0;
    var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    //Hiding the alert
    $("#alert").hide()

    // Save buttons to store in local storage
    $(document).on("click", "button", function () {
        var index = parseInt($(this).attr("data-id"));
        var textArea = $(`#text-${[index]}`).val();
        var hour = "hour-" + index;
        window.localStorage.setItem(hour, textArea);
        count = 0;
        $("#counter").html("");
        countTask()
        showAlert("Task succesfuly added", "success")
    })

    // Reset button to clear local storage and reset the task counter
    $("#resetBtn").on("click", function () {
        window.localStorage.clear();
        displayTask(hours)
        count = 0;
        $("#counter").html("");
        countTask()
        showAlert("All tasks deleted, see you tomorrow :)", "primary")
    })


    // Function to display the current day on top of the screen
    function generateCurrentDay() {
        $("header").prepend(currentDay)
    }
    generateCurrentDay();


    // Function to generate all the calendar blocks depending on our "hours" array
    function generateCalendar(arr) {
        for (var i = 0; i < arr.length; i++) {
            $(".container").append(`
            <div class="" id="hour-${arr[i]}">
                <h6 class="text-center col-1 p-0">${arr[i]}H</h6>
                <textarea class="text-center col-10" id="text-${arr[i]}" name="dunno" cols="100" rows="2"></textarea>
                <button class="btn btn-info col-1 p-0" id="btn-${arr[i]}" data-id="${arr[i]}">Save</button>
          </div>`)
        }
    } generateCalendar(hours)


    // Function to set the attribute of each time block, depending on the current time
    function setColorBlocks(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (numActualHour > arr[i]) {
                $(`#hour-${arr[i]}`).attr("class", "row time-block past");
            }
            else if (numActualHour < arr[i]) {
                $(`#hour-${arr[i]}`).attr("class", "row time-block future");
            }
            else if (numActualHour = arr[i]) {
                $(`#hour-${arr[i]}`).attr("class", "row time-block present");
            }
        }

    } setColorBlocks(hours)


    // Get item from local storage on loading
    function displayTask() {

        for (var i = 9; i < hours.length + 9; i++) { // 9 is the first hour of the day

            var text = window.localStorage.getItem("hour-" + i);
            $(`#text-${[i]}`).val(text);

            if (!text) {
                continue;
            }
        }

    } displayTask()

    // NEW FEATURE : Task counter on top of the screen
    function countTask() {

        for (var i = 9; i < hours.length + 9; i++) {

            var text = window.localStorage.getItem("hour-" + i);
            $(`#text-${[i]}`).val(text);

            if (text) {
                count++
            }

        }
        if (count === 1) {
            $("#counter").text((`You have ${count} task to do`))
        } else {
            $("#counter").text((`You have ${count} tasks to do`))
        }

    } countTask()

    // NEW FEATURE : Show an alert
    function showAlert(str, type) {
        $("#alert").show();

        $("#alert").attr("class", `alert alert-${type}`);
        $("#alert").text(str);
        window.setTimeout(function () {
            $("#alert").hide();
        }, 2000)

    }
})