(function () {
  let loginForm;

  function addEventListeners() {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const passwordEl = document.querySelector("#pass");
     
      function validatePassword() {
        const password = passwordEl.value.trim();
        const formGroupEl = passwordEl.closest("#form-group");
        const messageEl = formGroupEl.querySelector(".message");

        let error = "";
        if (!password) {
          error += "<div>Please enter your password</div>";
        }
        messageEl.innerHTML = error;
      }
      passwordEl.addEventListener("blur",validatePassword);
      passwordEl.addEventListener("input", validatePassword);
      

      // extract the email and password and form a credentials object
      const credentials = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("pass").value.trim(),
      };

      // if everything is valid
      login(credentials)
        .then(function (loginResponse) {
          console.log(loginResponse);
          window.location.href = "./calender.html";
        })
        .catch(function (error) {
          alert("Incorrect Password!! Please enter your correct Password");
        });
    });
  }

  window.addEventListener("load", function () {
    loginForm = document.getElementById("form-group");

    addEventListeners();
  });
})();
