const accountModal = document.getElementById('accountModal');
const account = document.getElementById('account-button');
const profileModal = document.getElementById('profileModal');
const profile = document.getElementById('profile-button');
const baseUrl = 'https://banka-timi.herokuapp.com/api/v1';
const content = document.querySelector('.content');
const tableDiv = document.querySelectorAll('.tableDiv');

const loader = document.getElementById('loadingText');
const accountText = document.getElementById('accountText');

content.style.display = 'flex';
loader.style.display = 'block';
tableDiv[0].style.display = 'none';
if (tableDiv[1]) {
  tableDiv[1].style.display = 'none';
}
accountText.style.display = 'none';


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

if(accountModal){
  accountModal.onclick = (e) => {
    if (e.target !== e.currentTarget) return;
    accountModal.style.display = 'none';
    body.classList.remove('stop-scrolling');
  };

if(account){
 account.onclick = () => {
    accountModal.style.display = 'flex';
    body.classList.add('stop-scrolling');
  };
}
 
}



const fadeOutEffect = () => {
  const fadeTarget = document.getElementById('alert');
  const fadeEffect = setInterval(() => {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
};

const elem = document.getElementById('alert');
elem.style.display = 'none';

const showAlert = (color, message) => {
  elem.innerHTML = message;
  elem.classList.add('slider');
  elem.style.display = 'block';
  elem.style.opacity = 1;
  elem.style.backgroundColor = color;

  setTimeout(() => {
    elem.classList.add('slider.closed');
    elem.style.display = 'none';
    fadeOutEffect();
  }, 3000);
};


const token = sessionStorage.getItem('token');
const email = sessionStorage.getItem('email');
const name = sessionStorage.getItem('name');
const accountBalance = document.querySelector('#current-balance');
const currentUser = document.querySelector('#current-user');
const accountTable = document.querySelector('#account-table');
const transactionTable = document.querySelector('#transaction-table');
const nameTextField = document.querySelectorAll('#name');
const emailTextField = document.querySelectorAll('#email');
const errorTag = document.getElementsByClassName('error');
const createAccount = document.getElementById('createAcc');

if(token===null || email===null || name===null){
  window.location.href = '../index.html';
}


let balanceTextField;
if(accountModal){
    balanceTextField = accountModal.getElementsByClassName('opbalance')[0];
}

const accountType = document.getElementById('account-type');

 let spinner;
if(accountModal){
    spinner = accountModal.getElementsByClassName('fa-spin')[0];
}

if (spinner) {
  spinner.style.display = 'none';
}


if(accountType){
  accountType.onchange = () => {
    errorTag[0].innerHTML = '';
  };
}



if (createAccount) {
  createAccount.onclick = () => {
    if (balanceTextField.value === '' || balanceTextField.value === null) {
      balanceTextField.value = 0.00;
    } else if (accountType.value === 'default') {
      errorTag[0].innerHTML = 'Select an account type';
    } else {
      accountModal.disable = true;
      spinner.style.display = 'inline-block';
      fetch(`${baseUrl}/accounts`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          type: accountType.value,
          balance: balanceTextField.value,
        }),
      })
        .then(response => response.json())
        .then((data) => {
          switch (data.status) {
            case 201:
             console.log(data);
                showAlert('green', 'Account succesfully created');
                accountModal.style.display = 'none';
                window.location.reload(true);
              break;
            case 400:
            case 401:
              errorTag[0].innerHTML = data.error;
              break;
            default:
              break;
          }
          spinner.style.display = 'none';
        })
        .catch((error) => {
          console.log(error);
          accountModal.disable = false;
          spinner.style.display = 'none';
        });
    }
  };
}


currentUser.innerHTML = name;
if (nameTextField) {
  nameTextField[0].value = name;
  if (nameTextField[1]) {
    nameTextField[1].value = name;
  }
}

if (emailTextField) {
  emailTextField[0].value = email;
  if (emailTextField[1]) {
    emailTextField[1].value = email;
  }
}

let totalBal = 0.00;

const accountUrl = `${baseUrl}/user/${email}/accounts`;

const transactionLogic = (data) => {

  if(data.data.length>0){
    if( tableDiv[1]){
      tableDiv[1].style.display = 'block';  
    }
  }

  data.data.map((transaction) => {
    const date = new Date(transaction.createdOn);

    const tableRow = `
        <tr>
          <td>${transaction.type}</td>
          <td>${transaction.accountNumber}</td>
          <td>${date.toDateString()}</td>
          <td>₦ ${transaction.amount}</td>
          <td>₦ ${transaction.oldBalance}</td>
          <td>₦ ${transaction.newBalance}</td>
        </tr>
    `;
    if(transactionTable){
      transactionTable.innerHTML += tableRow;
    }
  });
};

const getUserTransactions = (accountNumber) => {
  const transactionUrl = `${baseUrl}/accounts/${accountNumber}/transactions`;
  fetch(transactionUrl, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
    mode: 'cors',
    method: 'GET',
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      switch (data.status) {
        case 200:
          transactionLogic(data);
          break;
        case 400:
        case 401:
        // errorTag[0].innerHTML = data.error;
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  content.style.display = 'block';
  loader.style.display = 'none';
};


const successLogic = (data) => {
  if(data.data.length > 0){
    tableDiv[0].style.display = 'block';
  }else{
    accountText.style.display = 'block';
    loader.style.display = 'none';
  }
    data.data.map((acc) => {
      totalBal += parseFloat(acc.balance);

      const date = new Date(acc.createdOn);

      getUserTransactions(acc.accountNumber);

      const tableRow = `
      <tr>
        <td><img src="../img/${acc.type}-account-logo.svg"/></td>
        <td>${acc.type}</td>
        <td>${acc.accountNumber}</td>
        <td>${acc.status}</td>
        <td>${date.toDateString()}</td>
        <td>₦ ${acc.balance}</td>
      </tr>
      `;
      accountTable.innerHTML += tableRow;
    });
    if(accountBalance) {
      accountBalance.innerHTML = `₦ ${totalBal.toFixed(2)}`;
    }
};


const fetchUserAccount = (url) => {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
    mode: 'cors',
    method: 'GET',
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      switch (data.status) {
        case 200:
          successLogic(data);
          break;
        case 400:
        case 401:
          // errorTag[0].innerHTML = data.error;
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


const deleteAccount = (accountNumber) => {
  fetch(`${baseUrl}/accounts/${accountNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`,
      },
      mode: 'cors',
      method: 'DELETE',
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        switch (data.status) {
          case 200:
            showAlert('green', data.message);
            window.location.reload(true);
            break;
          case 400:
          case 401:
          case 403:
            showAlert('red', data.error);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
}


const successAllAccountLogic = (data) => {
  if(data.data.length > 0){
    loader.style.display = 'none';
    tableDiv[0].style.display = 'block';
  }
    data.data.map((acc) => {
      totalBal += parseFloat(acc.balance);

      const date = new Date(acc.createdOn);

      getUserTransactions(acc.accountNumber);

      const tableRow = `
      <tr>
        <td>${acc.type}</td>
        <td>${acc.accountNumber}</td>
        <td>${acc.ownerEmail}</td>
        <td>${date.toDateString()}</td>
        <td>${acc.status}</td>
        <td>₦ ${acc.balance}</td>
        <td>
          <a href="customer.html?${acc.ownerEmail}">
            <button class="viewBtn"><img src="../img/view.svg"></button>
          </a>
          <button class="delete" onclick="deleteAccount(${acc.accountNumber})" id="deleteButton" value="${acc.accountNumber}"><img src="../img/delete.svg"></button>
        </td>
      </tr>
      `;
      accountTable.innerHTML += tableRow;
    });
}



const fetchAllAccounts = (url) => {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
    mode: 'cors',
    method: 'GET',
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      switch (data.status) {
        case 200:
          successAllAccountLogic(data);
          break;
        case 204:
        case 401:
        case 403:
          // errorTag[0].innerHTML = data.error;
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


const paramsEmail = window.location.href.slice(window.location.href.indexOf('?') + 1);

const paramsaccountUrl = `${baseUrl}/user/${paramsEmail}/accounts`;


if('/frontend/customer/dashboard.html'===window.location.pathname){
  fetchUserAccount(accountUrl);
}else if('/frontend/cashier/dashboard.html'===window.location.pathname){
  fetchAllAccounts(`${baseUrl}/accounts`);
}else if('/frontend/admin/dashboard.html'===window.location.pathname){
  fetchAllAccounts(`${baseUrl}/accounts`);
}else if(`/frontend/admin/customer.html`===window.location.pathname){
  fetchUserAccount(paramsaccountUrl);
}



const createUser = document.getElementById('create-user')
const emailInput = document.getElementById('email');
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const passwordInput = document.getElementById('password');
const roleType = document.getElementById('role-type');

passwordInput.value = 'password';



if (createUser) {
  createUser.onclick = () => {
    if (!emailInput.value.match(/\S+@\S+\.\S+/)) {
      errorTag[0].innerHTML = 'Enter a valid email address';
    }else if(firstNameInput.value === '' || firstNameInput.value === null){
      errorTag[0].innerHTML = 'First Name is required';
    }else if(lastNameInput.value === '' || lastNameInput.value === null){
      errorTag[0].innerHTML = 'Last Name is required';
    }else if (roleType.value === 'default') {
      errorTag[0].innerHTML = 'Assign a role';
    } else {
      accountModal.disable = true;
      spinner.style.display = 'inline-block';

      const _isadmin = (roleType.value === 'admin') ? true : false;

      fetch(`${baseUrl}/auth/create/staff`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          isAdmin: _isadmin,
        }),
      })
        .then(response => response.json())
        .then((data) => {
          switch (data.status) {
            case 201:
             console.log(data);
                showAlert('green', 'User succesfully created');
                accountModal.style.display = 'none';
              break;
            case 400:
            case 401:
              errorTag[0].innerHTML = data.error;
              break;
            default:
              break;
          }
          spinner.style.display = 'none';
        })
        .catch((error) => {
          console.log(error);
          accountModal.disable = false;
          spinner.style.display = 'none';
        });
    }
  };
}

  



