function register(credentials) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      // Authorization: "sdkbkjwbejwbveiwbviwb"
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (!response.ok) {
      // for 404 kind of errors, we should check and explcitly throw an error
      throw new Error(response.statusText);
    }

    return "Registered Successfully";
  });
}
