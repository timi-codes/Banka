var height = document.getElementById("test").clientHeight;
document.getElementById("test").style.marginTop = -height / 2 + "px";

var signupModal = document.getElementById("signupModal");
var loginModal = document.getElementById("loginModal");

var signup = document.getElementById("signup-button");
var login = document.getElementById("login-button");

var body = document.getElementsByTagName("body")[0];

signup.onclick = e => {
  signupModal.style.display = "block";
  body.classList.add("stop-scrolling");
};

login.onclick = e => {
  loginModal.style.display = "block";
  body.classList.add("stop-scrolling");
};

signupModal.onclick = function(e) {
  if (e.target != this) return;
  signupModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

loginModal.onclick = function(e) {
  if (e.target != this) return;
  loginModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};
