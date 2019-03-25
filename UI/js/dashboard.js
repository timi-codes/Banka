var accountModal = document.getElementById("accountModal");
var account = document.getElementById("account-button");
var body = document.getElementsByTagName("body")[0];

account.onclick = e => {
  accountModal.style.display = "block";
  body.classList.add("stop-scrolling");
};

accountModal.onclick = function(e) {
  if (e.target != this) return;
  accountModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};
