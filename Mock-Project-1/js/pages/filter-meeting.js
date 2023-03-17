(function () {
  let searchItemList = [];

  function addEventListeners() {
    const form = document.querySelector(".filter-form");
    const date = document.querySelector("#dates");
    const search = document.getElementById("description");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let dateValue = date.value;
      let searchValue = search.value.trim();
      fetchSearchedItem(dateValue, searchValue);
    });
  }

  function displaySearchItems(display) {
    const searchList = document.querySelector(".search-list");
    let string = "";
    display.forEach(function (list) {
    
      let year =
      list.date[0] + list.date[1] + list.date[2] + list.date[3];
    let day =list.date[8] + (list.date[9]);
    //let dayLatest = parseInt(day)+1;
    let month = list.date[5] + list.date[6];
    if (month == 01) {
      month = `January`;
    } else if (month == 02) {
      month = `February`;
    } else if (month == 03) {
      month = `March`;
    } else if (month == 04) {
      month = `April`;
    } else if (month == 05) {
      month = `May`;
    } else if (month == 06) {
      month = `June`;
    } else if (month == 07) {
      month = `July`;
    } else if (month == 08) {
      month = `August`;
    } else if (month == 09) {
      month = `September`;
    } else if (month == 10) {
      month = `October`;
    } else if (month == 11) {
      month = `November`;
    } else if (month == 12) {
      month = `December`;
    }


      let emailSelect = list.attendees.map(function (member) 
      {
          return member.email;
        })
        .join(", ");
      string += `
          <div class="display-meeting" data-id="${list._id}">
              <h2 class="display-team-name">
              ${day} ${month} ${year} ${list.startTime.hours}:${list.startTime.minutes} - ${list.endTime.hours}:${list.endTime.minutes}
              </h2>
              <h3 class="display-team-short-name">${list.name}</h3>
              <button class="excuse ">Excuse yourself</button>
              <div class="name-heading"></div>
              <p class="attendees"><strong>Attendees</strong> : ${emailSelect} </p>
              <div class="member">
              <form action="https://mymeetingsapp.herokuapp.com/api/meetings" method="PATCH" 
                class="team-dropdown select-form">
                  <select class="team-select">
                      <option value="">Select Member</option>
                  </select>
                  <button id="add">Add</button>
                  </form>
              </div>
          </div>
          `;
    });
    searchList.innerHTML = string;
    deleteDisplayedMeeting();
    addMemberEventListeners();
    getUsers();
  }

  function deleteDisplayedMeeting() {
    const btn = document.querySelectorAll(".excuse");
    btn.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        const team = btn.closest(".display-meeting");
        const teamId = team.getAttribute("data-id");
        deleteTeam(teamId)
          .then(function (response) {
            team.remove();
          })
          .catch(function (error) {
            alert(error.message);
          });
      });
    });
  }

  function displayUsers(response) {
    let select = document.querySelectorAll(".team-select");
    select.forEach(function (select) {
      let str = "";
      response.forEach(function (usersList) {
        str += `<option value="${usersList._id}">${usersList.email}</option>`;
      });
      select.innerHTML += str;
    });
  }

  function addMemberEventListeners() {
    const selectForms = document.querySelectorAll(".select-form");

    selectForms.forEach(function (selectForm) {
      const selectMember = selectForm.querySelector(".team-select");
      selectForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userId = selectMember.value;
        const team = selectForm.closest(".display-meeting");
        const teamId = team.getAttribute("data-id");
        if (true) {
          addMember(teamId, userId)
            .then(function (filterMeetingResponse) {
              console.log(filterMeetingResponse);
              window.alert("member added successfully");
              //window.location.href = "./filter-meeting.html";
            })
            .catch(function (error) {
              alert(error.message);
            });
        }
      });
    });
  }

  function getUsers() {
    fetchUsers()
      .then(function (response) {
        displayUsers(response);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  function fetchSearchedItem(date, searchItem) {
    filter(date, searchItem)
      .then(function (response) {
        searchItemList = response;
        displaySearchItems(response);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }
  window.addEventListener("load", function (event) {
    addEventListeners();
  });
})();
