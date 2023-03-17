(function () {
  const meetAdd = document.querySelector("#form-add-meeting");
  const meetNameEl = document.querySelector("#name");
  const dateMeetEl = document.querySelector(".date");
  const startHoursEl = document.querySelector(".hours");
  const startMinutesEl = document.querySelector(".minutes");
  const endHoursEl = document.querySelector(".end-hours");
  const endMinutesEl = document.querySelector(".end-minutes");
  const descriptionEl = document.querySelector("#description");
  const attendeesListEl = document.querySelector("#email");


  function validateDate() {

    let meetingDate = dateMeetEl.value;
    const formEl = dateMeetEl.closest(".date-entry");
    const messageEl = formEl.querySelector(".message");
    let error = "";
    const todayDate = new Date();
    const selectedDate = new Date(meetingDate);
    const todayDay = todayDate.getDate();
    const selectedDay = selectedDate.getDate();
    const todayYear = todayDate.getFullYear();
    const selectedYear = selectedDate.getFullYear();
    const todayMonth = todayDate.getMonth();
    const selectedMonth = selectedDate.getMonth();

    if (todayYear > selectedYear) {
      error += "Date Should be greater than today's date";
    } else if (todayYear === selectedYear) {
      if (todayMonth > selectedMonth) {
        error += "Date Should be greater than today's date";
      } else if (todayMonth === selectedMonth) {
        if (todayDay > selectedDay) {
          error += "Date Should be greater than today's date";
        }
      }
    }
    messageEl.innerHTML = error;
    return error === "";
  }
  function validateTime() {
    startHour = startHoursEl.value;
    startMinute = startMinutesEl.value;
    endHour = endHoursEl.value;
    endMinute = endMinutesEl.value;
    const formEl = endHoursEl.closest(".input");
    const messageEl = formEl.querySelector(".message");
    let error = "";

    let startHr = parseInt(startHour);
    let startMin = parseInt(startMinute);
    let endHr = parseInt(endHour);
    let endMin = parseInt(endMinute);

    if (startHr > endHr) {
      error += "End time must be greater than start time";
    } else if (startHr === endHr) {
      if (startMin > endMin) {
        error += "End time must be greater than start time";
      }
    }
    messageEl.innerHTML = error;
    return error === "";
  }

  

  function isValidate() {
    let valid = true;
    valid = validateDate() && valid;
    valid = validateTime() && valid;
    return valid;
    
  }
 
  function addEventListeners() {

    dateMeetEl.addEventListener("input", validateDate);
    dateMeetEl.addEventListener("blur", validateDate);
    startHoursEl.addEventListener("input", validateTime);
    startHoursEl.addEventListener("blur", validateTime);
    endHoursEl.addEventListener("input", validateTime);
    endHoursEl.addEventListener("blur", validateTime);
    startMinutesEl.addEventListener("input", validateTime);
    startMinutesEl.addEventListener("blur", validateTime);
    endMinutesEl.addEventListener("input", validateTime);
    endMinutesEl.addEventListener("blur", validateTime);

    meetAdd.addEventListener("submit", function (event) {
      event.preventDefault();

      let date = dateMeetEl.value;
      let startHours = startHoursEl.value;
      let startMinutes = startMinutesEl.value;
      let endHours = endHoursEl.value;
      let endMinutes = endMinutesEl.value;
      let nameMeet = meetNameEl.value;
      let decription = descriptionEl.value;
      let attendeesList = attendeesListEl.value;

      const credentials = {
        date: date,
        startTime: {
          hours: parseInt(startHours),
          minutes: parseInt(startMinutes),
        },
        endTime: {
          hours: parseInt(endHours),
          minutes: parseInt(endMinutes),
        },
        name: nameMeet,
        description: decription,
        attendees: attendeesList.split(","),
      };

      if (isValidate()) {
        addMeetings(credentials)
          .then(function (addMeetingResponse) {
            console.log(addMeetingResponse);
            window.alert("Meeting added successfully");
            window.location.href = "./filter-meeting.html"
          })
          .catch(function (error) {
            alert(error.message);
          });
      }
    });
  }

  window.addEventListener("load", function () {
    addEventListeners();
  });
})();
