var height = document.getElementById("test").clientHeight;
document.getElementById("test").style.marginTop = -height / 2 + "px";

var signupModal = document.getElementById("signupModal");
var loginModal = document.getElementById("loginModal");

var signup = document.getElementById("signup-button");
var login = document.getElementById("login-button");

signup.onclick = e => {
  signupModal.style.display = "block";
};

signupModal.onclick = function(e) {
  if (e.target != this) return;
  signupModal.style.display = "none";
};
