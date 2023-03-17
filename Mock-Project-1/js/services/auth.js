// credentials = { email: 'john.doe@example.com', password: 'Password123#' }
function login(credentials) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/login`, {
    method: "POST", // better to use ALL CAPS for the method
    body: JSON.stringify(credentials),
    headers: {
      // Authorization: "sdkbkjwbejwbveiwbviwb"
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        // for 404 kind of errors, we should check and explcitly throw an error
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(function (loginResponse) {
      // store the details in localStorage
      localStorage.setItem("email", loginResponse.email);
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("name", loginResponse.name);

      return loginResponse;
    });
}
function getToken() {
  return localStorage.getItem("token");
}

function getEmail() {
  return localStorage.getItem("email");
}
function getName() {
  return localStorage.getItem("name");
}
function logout() {
  localStorage.clear();
}
