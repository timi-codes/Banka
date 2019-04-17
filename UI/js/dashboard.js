const accountModal = document.getElementById('accountModal');
const account = document.getElementById('account-button');
const profileModal = document.getElementById('profileModal');
const profile = document.getElementById('profile-button');

const body = document.getElementsByTagName('body')[0];

profileModal.onclick = (e) => {
  if (e.target !== e.currentTarget) return;
  profileModal.style.display = 'none';
  body.classList.remove('stop-scrolling');
};

profile.onclick = () => {
  profileModal.style.display = 'flex';
  body.classList.add('stop-scrolling');
};

accountModal.onclick = (e) => {
  if (e.target !== e.currentTarget) return;
  accountModal.style.display = 'none';
  body.classList.remove('stop-scrolling');
};

account.onclick = () => {
  accountModal.style.display = 'flex';
  body.classList.add('stop-scrolling');
};
