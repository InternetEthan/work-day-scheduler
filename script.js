$(function () {
const currentDay = dayjs();

$(".time-block").each(function(index, timeBlock) {
  const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
  const scheduleHour = timeBlock.getAttribute('data-hour');
  const currentHour = dayjs().hour();
  
  // if statement to check time and change style accordingly
  if (scheduleHour > currentHour) {
    $(timeBlock).removeClass("past present").addClass("future");
  } else if(scheduleHour < currentHour) {
    $(timeBlock).removeClass("present future").addClass("past");
  } else {
    $(timeBlock).removeClass("past future").addClass("present");
  }
schedules.forEach (function (schedule) {
  if (timeBlock.getAttribute("data-hour") === schedule.hour) {
    timeBlock.querySelector("textarea").value = schedule.text
  }
});

  // button listener
  timeBlock.addEventListener("click", function (event) {
    if (event.target.matches('button')) {
      console.log("clicked");
      console.log(event.target);
      saveSchedule(event);
    }
  });
});

function saveSchedule(event) {
  const hour = event.target.parentElement.getAttribute("data-hour");
  const text = event.target.parentElement.querySelector("textarea").value;
  const newSchedule = {
    hour: hour,
    text: text
  };
  console.log("hour", hour);
  console.log("text", text);
  console.log("schedule", newSchedule);
  
  if (localStorage.getItem("schedules")) {
    const schedules = JSON.parse(localStorage.getItem("schedules"));

const indexRmv = schedules.findIndex(function (schedule){
  console.log(schedule);
  if (newSchedule.hour === schedule.hour) {
    return true;
  }
})
if (indexRmv!== -1) {
schedules.splice(indexRmv,1)
}

    schedules.push(newSchedule);
    localStorage.setItem("schedules",JSON.stringify(schedules));
  } else {
  const schedules = [];
  schedules.push(newSchedule);
  localStorage.setItem("schedules",JSON.stringify(schedules));
}

};
// adding current day text data to header
$("#currentWeekDay").text(currentDay.format('dddd'));
$("#currentDay").text(currentDay.format('MMMM DD, YYYY'));

});