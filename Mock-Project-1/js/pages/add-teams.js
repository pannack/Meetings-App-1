function isValidate() {
  return true;
}

function addFormEventListeners() {
  const form = document.querySelector(".form");
  const nameEl = document.querySelector("#team-name");
  const shortNameEl = document.querySelector("#team-short-name");
  const descriptionEl = document.querySelector(".team-description");
  const teamSelectEl = document.querySelector(".team-select");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = nameEl.value.trim();
    let shortName = shortNameEl.value.trim();
    let description = descriptionEl.value.trim();
    let teamSelect = teamSelectEl.value;

    const credentials = {
      name: name,
      shortName: shortName,
      description: description,
      members: [teamSelect],
    };

    if (isValidate()) {
      addTeam(credentials)
        .then(function (addTeamsResponse) {
          console.log(addTeamsResponse);
          window.alert("Team added successfully");
          window.location.href = "./teams.html";
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
  });
}
// window.addEventListener("load", function () {
//   addFormEventListeners();
// });
