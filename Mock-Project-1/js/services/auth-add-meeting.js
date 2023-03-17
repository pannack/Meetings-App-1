function addMeetings(credentials) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/meetings`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (!response.ok) {
      // for 404 kind of errors, we should check and explcitly throw an error
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
function getToken() {
  return localStorage.getItem("token");
}
