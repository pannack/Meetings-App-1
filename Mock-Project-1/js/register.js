(function () {
  const registerform = document.querySelector("#form-group");
  const usernameEl = document.querySelector(".name");
  const emailEl = document.querySelector(".email");
  const passwordEl = document.querySelector(".pass");
  const confirmPasswordEl = document.querySelector(".confrmpass");

  function validateUsename(event) {
    let username = usernameEl.value.trim();
    const formUser = usernameEl.closest(".user-name");
    const message = formUser.querySelector(".message");
    let error = "";
    if (username.length < 4) {
      error += "Username must be at least 4 characters long";
    }
    message.textContent = error;
    return error === "";
  }

  function validatePassword(event) {
    let password = passwordEl.value.trim();
    const formPassword = passwordEl.closest(".form-password");
    const message = formPassword.querySelector(".message");
    let error = "";
    if (!password.length) {
      error += "<div>Password must not be empty</div>";
    }
    else {

    const uppercasePat = /[A-Z]/;
     if (!uppercasePat.test(password)) {
      error += "<div>Password must have an uppercase character</div>";
    }

    // lowercase
    const lowercasePat = /[a-z]/;
    if (!lowercasePat.test(password)) {
      error += "<div>Password must have a lowercase character</div>";
    }

    const digitPat = /[0-9]/;
    if (!digitPat.test(password)) {
      error += `<div>Password should have a digit</div>`;
    }

    const specialPat = /[!@#$%^&*(){}<>?_]/;
    if (!specialPat.test(password)) {
      error += `<div>Password should have a special character`;
    }
  }
    message.innerHTML = error;
    return error === "";
  }

  function validateConfirmPassword(event) {
    let confirmPassword = confirmPasswordEl.value.trim();
    let password = passwordEl.value.trim();
    const formConfirmPassword = confirmPasswordEl.closest(
      ".form-confirm-password"
    );
    const message = formConfirmPassword.querySelector(".message");
    let error = "";
    if (confirmPassword !== password) {
      error += "<div>Passwords are not matching</div>";
    }
    message.innerHTML = error;
    return error === "";
  }

  function isValidate() {
    let valid = true;
    valid = validateUsename() && valid;
    valid = validatePassword() && valid;
    valid = validateConfirmPassword() && valid;
    return valid;
  }

  function addEventListeners() {
    usernameEl.addEventListener("input", validateUsename);
    usernameEl.addEventListener("blur", validateUsename);
    passwordEl.addEventListener("input", validatePassword);
    passwordEl.addEventListener("blur", validatePassword);
    confirmPasswordEl.addEventListener("input", validateConfirmPassword);
    confirmPasswordEl.addEventListener("blur", validateConfirmPassword);
    registerform.addEventListener("submit", function (event) {
      event.preventDefault();

      let email = emailEl.value.trim();
      let username = usernameEl.value.trim();
      let password = passwordEl.value.trim();

      const credentials = {
        name: username,
        email: email,
        password: password,
      };

      if (isValidate()) {
        register(credentials)
          .then(function (loginResponse) {
            console.log(loginResponse);
            window.alert("You have been successfully registered");
            window.location.href = "./login-page.html";
          })
          .catch(function (error) {
            alert('Account already exsists');
          });
      }
    });
  }

  window.addEventListener("load", function () {
    addEventListeners();
  });
})(); 