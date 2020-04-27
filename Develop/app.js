// more features if possible :
// - count how many task we have on the day
// - no access to an hour already passed
// - differentiate a block with a task and without (using a span for example)
// - put a reset button to reset all tasks
// - refresh time each second on header


$(document).ready(function () {

    // Setting up variables
    var time = moment().format('H');
    var currentDay = moment().format('LLLL');
    var numActualHour = parseInt(time, 10);
    var countTask = "";
    var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    // var hours2 = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

    // var time2 = moment().format('hA');
    // console.log(time2);
    // need to fix the AM-PM sytem
    // need to store values as 9 AM, 10 AM ... and find the matching one to the actual hour. Then all the one after the actual hour matching value go green, and other grey


    // Save buttons to store in local storage
    $(document).on("click", "button", function () {
        var index = parseInt($(this).attr("data-id"));
        var textArea = $(`#text-${[index]}`).val();
        var hour = "hour-" + index;
        window.localStorage.setItem(hour, textArea);
        // showAlert("Succesfully edited todo", "success");
        // renderTodos();

    })




    // Function to display the current day on top of the screen
    function generateCurrentDay() {
        $("header").append(currentDay)
    }
    generateCurrentDay();


    // Function to generate all the calendar blocks
    function generateCalendar(arr) {
        for (var i = 0; i < arr.length; i++) {
            $(".container").append(`<div id="hour-${arr[i]}" class="">
            <h6 class="align-center">${arr[i]}AM</h6>
            <textarea name="dunno" id="text-${arr[i]}" cols="100" rows="2"></textarea>
            <button id= "btn-${arr[i]}" data-id= "${arr[i]}" class="btn btn-primary">Save</button>
          </div>`)
        }
    } generateCalendar(hours)


    // function to set the attribute of each time block, depending on the current time
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

    // //// test version 2

    // function findGreen(arr, index) {

    //     var newArr = [];
    //     for (let i = index + 1; i < arr.length; i++) {
    //         newArr.push(arr[i]);
    //     }
    //     return newArr;

    // //////




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

})