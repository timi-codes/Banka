var accountModal = document.getElementById("accountModal");
var body = document.getElementsByTagName("body")[0];

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
