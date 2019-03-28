var accountModal = document.getElementById("accountModal");
var body = document.getElementsByTagName("body")[0];
var profile = document.getElementById("profile-button");

accountModal.onclick = function(e) {
  if (e.target != this) return;
  accountModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

var credit = document.getElementById("credit-button");

credit.onclick = e => {
  accountModal.style.display = "block";
  body.classList.add("stop-scrolling");
};

profileModal.onclick = function(e) {
  if (e.target != this) return;
  profileModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

profile.onclick = e => {
  profileModal.style.display = "block";
  body.classList.add("stop-scrolling");
};
