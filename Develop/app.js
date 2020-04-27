$(document).ready(function () {

    var time = moment().format('H');
    var currentDay = moment().format('LLLL');
    var numActualHour = parseInt(time, 10);
    var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // need to fix the AM-PM sytem
    // need to store values as 9 AM, 10 AM ... and find the matching one to the actual hour. Then all the one after the actual hour matching value go green, and other grey


    $(document).on("click", "button", function () {
        var index = parseInt($(this).attr("data-id"));
        var textArea = $(`#text-${[index]}`).val();
        var hour = "hour-" + index;
        console.log(textArea);
        window.localStorage.setItem(hour, textArea);
        // showAlert("Succesfully edited todo", "success");
        // renderTodos();

    })



    function generateCurrentDay() {
        $("header").append(currentDay)
    }
    generateCurrentDay();

    function generateCalendar(arr) {
        for (var i = 0; i < arr.length; i++) {
            $(".container").append(`<div id="hour-${arr[i]}" class="">
            <h6 class="align-center">${arr[i]}AM</h6>
            <textarea name="dunno" id="text-${arr[i]}" cols="100" rows="2"></textarea>
            <button id= "btn-${arr[i]}" data-id= "${arr[i]}" class="btn btn-primary">Save</button>
          </div>`)
        }
    } generateCalendar(hours)


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
            console.log(arr[i])
        }

    } setColorBlocks(hours)




})