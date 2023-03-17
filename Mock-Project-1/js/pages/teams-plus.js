function showAddTeam() {
  const plusSign = document.querySelector(".team-plus");
  const addMeetingForm = document.querySelector(".meetings");
  plusSign.addEventListener("click", function (event) {
    addMeetingForm.classList.remove("hide-form");
    plusSign.classList.add("hide-form");
  });
}
