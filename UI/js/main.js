const height = document.getElementById('test').clientHeight;
document.getElementById('test').style.marginTop = `${-height / 2}px`;

const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');

const signup = document.querySelectorAll('.signup-button');
const login = document.getElementById('login-button');

const body = document.getElementsByTagName('body')[0];

console.log(login);

for (let button = 0; button < signup.length; button += 1) {
  signup[button].onclick = () => {
    document.body.scrollTop = 0;
    signupModal.style.display = 'block';
    body.classList.add('stop-scrolling');
  };
}

login.onclick = () => {
  loginModal.style.display = 'block';
  body.classList.add('stop-scrolling');
};

signupModal.onclick = (e) => {
  if (e.target !== e.currentTarget) return;
  signupModal.style.display = 'none';
  body.classList.remove('stop-scrolling');
};


loginModal.onclick = (e) => {
  if (e.target !== e.currentTarget) return;
  loginModal.style.display = 'none';
  body.classList.remove('stop-scrolling');
};

const userLogin = document.getElementById('user-login-btn');
const userRole = document.getElementById('user-role');
let role = 'customer';
userRole.onchange = () => {
  role = document.getElementById('user-role').value;
};

function gotoNextPage() {
  if (role === 'customer') {
    window.location.href = './customer/dashboard.html';
  } else if (role === 'staff') {
    window.location.href = './cashier/dashboard.html';
  } else if (role === 'admin') {
    window.location.href = './admin/dashboard.html';
  }
}

userLogin.onclick = () => {
  gotoNextPage();
};
