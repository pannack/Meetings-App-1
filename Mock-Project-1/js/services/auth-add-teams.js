function addTeam(credentials) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/teams`, {
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

function viewTeam() {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/teams`, {
    headers: {
      Authorization: getToken(),
    },
  }).then(function (response) {
    if (!response.ok) {
      // for 404 kind of errors, we should check and explcitly throw an error
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function deleteTeam(teamId) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/teams/${teamId}?action=remove_member`,
    {
      method: "PATCH",
      headers: {
        Authorization: getToken(),
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
    return "Success";
  });
}

function addMember(team_id, user_id) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/teams/${team_id}?action=add_member&userId=${user_id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: getToken(),
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
    return "Success";
  });
}

function fetchUsers() {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/users`, {
    headers: {
      Authorization: getToken(),
    },
  }).then(function (response) {
    if (!response.ok) {
      // for 404 kind of errors, we should check and explcitly throw an error
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
