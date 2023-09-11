// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
const currentDay = dayjs();
console.log(currentDay);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
$(".time-block").each(function(index, value) {
  const scheduleHour = value.getAttribute('data-hour');
  const currentHour = dayjs().hour();
  if (scheduleHour > currentHour) {
    value.classList.add('future')
  } else if(scheduleHour < currentHour) {
    value.classList.add('past')
  } else {
    value.classList.add('present')
  }

  console.log(scheduleHour);
  console.log(currentHour);

  // button listener
  value.addEventListener("click", function (event) {
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
  console.log("hour", hour);
  console.log("text", text);
}

  $("#currentWeekDay").text(currentDay.format('dddd'));
  $("#currentDay").text(currentDay.format('MMMM DD, YYYY'));
});