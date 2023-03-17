function getCalender( calenderDate ){
  return fetch(`https://mymeetingsapp.herokuapp.com/api/calendar?date=${calenderDate}`,
  {
      headers:{
          'Authorization': getToken()
      }
  }
  )
  .then(function (response) {
      if (!response.ok) {
          // for 404 kind of errors, we should check and explcitly throw an error
          throw new Error(response.statusText);
      }
      console.log(response);
      return response.json();
  });
}