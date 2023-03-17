const menuToggler = document.querySelector(".menu-icon");
const navBar = document.querySelector(".nav-first");
const logoutButton = document.querySelector(".logout");
const emailAuth = document.querySelector(".auth-email");
menuToggler.onclick = function () {
  navBar.classList.toggle("d-sm-none");
};

logoutButton.addEventListener("click", function () {
  logout();

  window.location = "./login-page.html";
});

emailAuth.innerHTML = `${getEmail()}`;
