(function () {
  let teamList = [];

  function displayTeam(response) {
    const teamDisplay = document.querySelector(".meetings-list");
    const team = teamDisplay.querySelectorAll(".display-meeting");
    team.forEach(function (list) {
      list.remove();
    });
    let string = "";
    response.forEach(function (list) {
      let emailSelect = list.members
        .map(function (member) {
          return member.email;
        })
        .join(", ");
      string += `
            <div class="display-meeting team-list meetings" data-id="${list._id}">
                <h2 class="display-team-name">${list.name}</h2>
                <h3 class="display-team-short-name">${list.shortName}</h3>
                <div class="description">
                    ${list.description}
                </div>
                <button class="excuse">Excuse yourself</button>
                <div class="name-heading"></div>
                <p class="member"><strong>Members</strong> : ${emailSelect} </p>
                <div class="team-dropdown">
                <form action="https://mymeetingsapp.herokuapp.com/api/teams" method="PATCH" 
                class="team-dropdown select-form">
                    <select class="member-select">
                        <option value="">Select Member</option>
                    </select>
                    <button class="add">Add</button>
                    </form>
                </div>
            </div>
            `;
    });
    teamDisplay.innerHTML += string;

    showAddTeam();
    deleteDisplayedTeam();
    getUsers();
    addFormEventListeners();
    addSelectEventListeners();
  }

  function deleteDisplayedTeam() {
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
    let select = document.querySelectorAll(".member-select");
    select.forEach(function (select) {
      let str = "";
      response.forEach(function (usersList) {
        str += `<option value="${usersList._id}">${usersList.email}</option>`;
      });
      select.innerHTML += str;
    });
  }

  function addSelectEventListeners() {
    const selectForms = document.querySelectorAll(".select-form");

    selectForms.forEach(function (selectForm) {
      const selectMember = selectForm.querySelector(".member-select");
      selectForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userId = selectMember.value;
        const team = selectForm.closest(".display-meeting");
        const teamId = team.getAttribute("data-id");
        if (true) {
          addMember(teamId, userId)
            .then(function (loginResponse) {
              console.log(loginResponse);
              window.location.href = "./teams.html";
            })
            .catch(function (error) {
              alert(error.message);
            });
        }
      });
    });
  }
// function selectMember(){
//   const memberSelection = document.querySelector(.member-selection)
// }
  function getUsers() {
    fetchUsers()
      .then(function (response) {
        displayUsers(response);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  function fetchTeam() {
    viewTeam()
      .then(function (response) {
        teamList = response;
        displayTeam(response);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  window.addEventListener("load", function (event) {
    fetchTeam();
  });
})();
