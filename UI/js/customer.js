const accountModal = document.getElementById('accountModal');
const body = document.getElementsByTagName('body')[0];

accountModal.onclick = (e) => {
  if (e.target !== e.currentTarget) return;
  accountModal.style.display = 'none';
  body.classList.remove('stop-scrolling');
};

const credit = document.getElementById('credit-button');

credit.onclick = () => {
  accountModal.style.display = 'flex';
  body.classList.add('stop-scrolling');
};
