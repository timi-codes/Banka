var accountModal = document.getElementById("accountModal");
var account = document.getElementById("account-button");
var profileModal = document.getElementById("profileModal");
var profile = document.getElementById("profile-button");

var body = document.getElementsByTagName("body")[0];

profileModal.onclick = function(e) {
  if (e.target != this) return;
  profileModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

profile.onclick = e => {
  profileModal.style.display = "block";
  body.classList.add("stop-scrolling");
};

accountModal.onclick = function(e) {
  if (e.target != this) return;
  accountModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

account.onclick = e => {
  accountModal.style.display = "block";
  body.classList.add("stop-scrolling");
};
