(function () {
  
  let calenderDate = document.getElementById("date");
  let selectedDate = document.getElementById("selected-date");
  let weekDay = document.getElementById("week-day");
  function displayCalender(calender) {
    const meetingsList = document.querySelector(".meetings-container");
    let meetingsListStr = "";
    calender.forEach(function (calender) {
      let attendeesEmail = calender.attendees
        .map(function (attendee) {
          return attendee.email;
        })
        .join(",");
      // 1min- 1px so time*60px, *10 for the distance between 2 time
      let duration =
        parseInt(`${calender.endTime.hours}`) * 60 +
        parseInt(`${calender.endTime.minutes}`) -
        (parseInt(`${calender.startTime.hours}`) * 60 +
          parseInt(`${calender.startTime.minutes}`)) +
        (parseInt(`${calender.endTime.hours}`) -
          parseInt(`${calender.startTime.hours}`)) *
          10;
      let topHeight =
        parseInt(`${calender.startTime.hours}`) * 60 +
        parseInt(`${calender.startTime.minutes}`) +
        parseInt(`${calender.startTime.hours}`) * 10;
      meetingsListStr += `
          <div>
 
              <div class="calender-add" style="top:${topHeight}px; height:${duration}px;">
                  <div class="meeting-name">${calender.name}</div>   
                  <div class=name-heading></div> 
                  <div>Attendees: ${attendeesEmail}</div>    
              </div>
           </div>
           `;
    });
    meetingsList.innerHTML = meetingsListStr;
  }
  
  function setDay(day) {
    let weekday;
    if (day === 0) {
      weekday = "Sunday";
    } else if (day === 1) {
      weekday = "Monday";
    } else if (day === 2) {
      weekday = "Tuesday";
    } else if (day === 3) {
      weekday = "Wednesday";
    } else if (day === 4) {
      weekday = "Thrusday";
    } else if (day === 5) {
      weekday = "Friday";
    } else if (day === 6) {
      weekday = "Saturday";
    } else {
      weekday = "";
    }
    weekDay.innerHTML = weekday;
  }
  calenderDate.addEventListener("input", function (event) {
    let pickDate = calenderDate.value;
    
    selectedDate.innerHTML = `${pickDate}`;
    let fetchingDay = new Date(pickDate);
    setDay(fetchingDay.getDay());
    fetchCalender(pickDate);
  });

  function fetchCalender(date) {
    getCalender(date)
      .then(function (calender) {
        allCalender = calender;
        displayCalender(calender);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  window.addEventListener("load", function (event) {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
      
    let month;
    if (today.getMonth() === 0) {
      month = `January`;
    } else if (today.getMonth() === 1) {
      month = `February`;
    } else if (today.getMonth() === 2) {
      month = `March`;
    } else if (today.getMonth() === 3) {
      month = `April`;
    } else if (today.getMonth() === 4) {
      month = `May`;
    } else if (today.getMonth() === 5) {
      month = `June`;
    } else if (today.getMonth() === 6) {
      month = `July`;
    } else if (today.getMonth() === 7) {
      month = `August`;
    } else if (today.getMonth() === 8) {
      month = `September`;
    } else if (today.getMonth() === 9) {
      month = `October`;
    } else if (today.getMonth() === 10) {
      month = `November`;
    } else if (today.getMonth() === 11) {
      month = `December`;
    }

    selectedDate.innerHTML =
      today.getDate() + ` ${month} ` + today.getFullYear();
    setDay(today.getDay());
    fetchCalender(date);
  });
})();
