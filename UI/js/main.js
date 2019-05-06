const baseUrl = 'https://banka-timi.herokuapp.com/api/v1';

const height = document.getElementById('test').clientHeight;
document.getElementById('test').style.marginTop = `${-height / 2}px`;

const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');

const signup = document.querySelectorAll('.signup-button');
const login = document.getElementById('login-button');

const body = document.getElementsByTagName('body')[0];

for (let button = 0; button < signup.length; button += 1) {
  signup[button].onclick = () => {
    document.body.scrollTop = 0;
    signupModal.style.display = 'block';
    body.classList.add('stop-scrolling');
  };
}

sessionStorage.clear();


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
const successLogic = (data) => {
  sessionStorage.setItem('token', data.data.token);
  sessionStorage.setItem('id', data.data.id);
  sessionStorage.setItem('email', data.data.email);
  sessionStorage.setItem('name', `${data.data.firstName} ${data.data.lastName}`);


  if (data.data.type === 'client') {
    window.location.href = './customer/dashboard.html';
  } else if (data.data.type === 'staff' && !data.data.isAdmin) {
    window.location.href = './cashier/dashboard.html';
  } else if (data.data.type === 'staff' && data.data.isAdmin) {
    window.location.href = './admin/dashboard.html';
  }
};

const emailInput = loginModal.getElementsByClassName('loginEmail')[0];
const passwordInput = loginModal.getElementsByClassName('loginPassword')[0];
const emailLabel = loginModal.getElementsByClassName('loginEmailLabel')[0];
const passwordLabel = loginModal.getElementsByClassName('loginPasswordLabel')[0];
const spinner = loginModal.getElementsByClassName('fa-spin')[0];
const errorTag = document.getElementsByClassName('error');

if (spinner) {
  spinner.style.display = 'none';
}

if (emailInput.value === '') {
  emailLabel.style.display = 'none';
}

if (passwordInput.value === '') {
  passwordLabel.style.display = 'none';
}

emailInput.onfocus = () => {
  emailLabel.style.display = 'block';
};

passwordInput.onfocus = () => {
  passwordLabel.style.display = 'block';
};

emailInput.onkeyup = () => {
  if (emailInput.value === '') {
    emailLabel.style.display = 'none';
  }
  errorTag[0].innerHTML = '';
};

passwordInput.onkeyup = () => {
  if (passwordInput.value === '') {
    passwordLabel.style.display = 'none';
  }
  errorTag[0].innerHTML = '';
};

userLogin.onclick = () => {
  const loginUrl = `${baseUrl}/auth/signin`;

  if (!emailInput.value.match(/\S+@\S+\.\S+/)) {
    errorTag[0].innerHTML = 'Enter a valid email address';
  } else if (passwordInput.value === '' || passwordInput.value === null) {
    errorTag[0].innerHTML = 'password cannot be empty';
  } else if (passwordInput.value.length < 7) {
    errorTag[0].innerHTML = 'password length must be at least 7 characters long';
  } else {
    loginModal.disable = true;
    spinner.style.display = 'inline-block';
    fetch(loginUrl, {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        switch (data.status) {
          case 200:
            successLogic(data);
            break;
          case 400:
          case 401:
            errorTag[0].innerHTML = data.error;
            break;
          default:
            break;
        }
        loginModal.disable = false;
        spinner.style.display = 'none';
      })
      .catch((error) => {
        loginModal.disable = false;
        spinner.style.display = 'none';
      });
  }
};


const signupButton = document.getElementById('create-user')
const signupEmailInput = document.getElementById('emails');
const signupFirstNameInput = document.getElementById('fnames');
const signupLastNameInput = document.getElementById('lnames');
const signupPasswordInput = document.getElementById('passwords');
const spinners = signupModal.getElementsByClassName('fa-spin')[0];
const errorsTag = document.getElementsByClassName('errors');


if (spinners) {
  spinners.style.display = 'none';
}

if (signupButton) {
  signupButton.onclick = () => {
    if (!signupEmailInput.value.match(/\S+@\S+\.\S+/)) {
      errorsTag[0].innerHTML = 'Enter a valid email address';
    }else if(signupFirstNameInput.value === '' || signupFirstNameInput.value === null){
      errorsTag[0].innerHTML = 'First Name is required';
    }else if(signupLastNameInput.value === '' || signupLastNameInput.value === null){
      errorsTag[0].innerHTML = 'Last Name is required';
    }else if (signupPasswordInput.value === '' || signupPasswordInput.value === null) {
      errorsTag[0].innerHTML = 'password cannot be empty';
    } else if (signupPasswordInput.value.length < 7) {
      errorsTag[0].innerHTML = 'password length must be at least 7 characters long';
    }else {
      signupModal.disable = true;
      spinners.style.display = 'inline-block';

      fetch(`${baseUrl}/auth/signup`, {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          firstName: signupFirstNameInput.value,
          lastName: signupLastNameInput.value,
          email: signupEmailInput.value,
          password: signupPasswordInput.value,
          confirmPassword: signupPasswordInput.value,
        }),
      })
        .then(response => response.json())
        .then((data) => {
          switch (data.status) {
            case 201:
             console.log(data);
                successLogic(data);
                signupModal.style.display = 'none';
              break;
            case 400:
            case 401:
            errorsTag[0].innerHTML = data.error;
              break;
            default:
              break;
          }
          spinners.style.display = 'none';
        })
        .catch((error) => {
          console.log(error);
          signupModal.disable = false;
          spinners.style.display = 'none';
        });
    }
  };
}
