const accountModal = document.getElementById("accountModal");
const body = document.getElementsByTagName("body")[0];
const baseUrl = "https://banka-timi.herokuapp.com/api/v1";
const content = document.querySelector(".content");
const tableDiv = document.querySelectorAll(".tableDiv");

const loader = document.getElementById("loadingText");
const accountText = document.getElementById("accountText");

accountModal.onclick = e => {
  if (e.target !== e.currentTarget) return;
  accountModal.style.display = "none";
  body.classList.remove("stop-scrolling");
};

const credit = document.getElementById("credit-button");

if (credit) {
  credit.onclick = () => {
    accountModal.style.display = "flex";
    body.classList.add("stop-scrolling");
  };
}

content.style.display = "flex";
loader.style.display = "block";
tableDiv[0].style.display = "none";
if (tableDiv[1]) {
  tableDiv[1].style.display = "none";
}
accountText.style.display = "none";

const fadeOutEffect = () => {
  const fadeTarget = document.getElementById("alert");
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

const elem = document.getElementById("alert");
elem.style.display = "none";

const showAlert = (color, message) => {
  elem.innerHTML = message;
  elem.classList.add("slider");
  elem.style.display = "block";
  elem.style.opacity = 1;
  elem.style.backgroundColor = color;

  setTimeout(() => {
    elem.classList.add("slider.closed");
    elem.style.display = "none";
    fadeOutEffect();
  }, 3000);
};

const token = sessionStorage.getItem("token");
const email = sessionStorage.getItem("email");
const name = sessionStorage.getItem("name");
const accountBalance = document.querySelector("#current-balance");
const currentUser = document.querySelector("#current-user");
const accountTable = document.querySelector("#account-table");
const transactionTable = document.querySelector("#transaction-table");
const errorTag = document.getElementsByClassName("error");
const owner = document.getElementById("owner");
const accSpinner = document.getElementById("acc-type");

currentUser.innerHTML = name;

const paramsEmail = window.location.href.slice(
  window.location.href.indexOf("?") + 1
);
const accountUrl = `${baseUrl}/user/${paramsEmail}/accounts`;

let totalBal = 0.0;

if (credit) {
  credit.style.visibility = "hidden";
}
owner.innerHTML = paramsEmail;

const transactionLogic = data => {

  if (data.data.length > 0) {
    tableDiv[1].style.display = "block";
  }

  data.data.map(transaction => {
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
    transactionTable.innerHTML += tableRow;
  });
};

const getUserTransactions = accountNumber => {
  const transactionUrl = `${baseUrl}/accounts/${accountNumber}/transactions`;
  fetch(transactionUrl, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `Bearer ${token}`
    },
    mode: "cors",
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
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
    .catch(error => {
      console.error(error);
    });

  content.style.display = "block";
  loader.style.display = "none";
};

const changeStatus = (stat, url) => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `Bearer ${token}`
    },
    mode: "cors",
    method: "PATCH",
    body: JSON.stringify({
      status: stat
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      switch (data.status) {
        case 200:
          showAlert("green", data.message);
          console.log(data);
          setTimeout(() => {
            window.location.reload(true);
          }, 4000);
          break;
        case 400:
        case 401:
        case 403:
          showAlert("red", data.error);
          break;
        default:
          break;
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const successLogic = data => {
  if (data.data.length > 0) {
    tableDiv[0].style.display = "block";
    if (credit) {
      credit.style.visibility = "visible";
    }
  } else {
    accountText.style.display = "block";
    loader.style.display = "none";
  }
  data.data.map(acc => {
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
        <td>
          <div class="ct-select-group ct-js-select-group">
            <select class="ct-select ct-js-select change-status">
              <option disabled selected>...</option>
              <option value='{"v":"active", "acc": ${
                acc.accountNumber
              }}'>Active</option>
              <option value='{"v":"dormant", "acc": ${
                acc.accountNumber
              }}'>Dormant</option>
            </select>
          </div>
        </td>
      </tr>
      `;

    const accountSpinner = `
      <option value="${acc.accountNumber}" ${
      acc.status === "dormant" ? "disabled" : "enabled"
    }>${acc.accountNumber}-(${acc.type})-${acc.status}</option>
      `;

    accountTable.innerHTML += tableRow;
    if (accSpinner) {
      accSpinner.innerHTML += accountSpinner;
    }
  });
  if (accountBalance) {
    accountBalance.innerHTML = `₦ ${totalBal.toFixed(2)}`;
  }

  const changeStat = accountTable.querySelectorAll(".change-status");

  for (var i = 0; i < changeStat.length; i++) {
    changeStat[i].onchange = evt => {
      const value = JSON.parse(evt.target.value);
      changeStatus(value.v, `${baseUrl}/accounts/${value.acc}`);
    };
  }
};



const filter = ()=> {
  var type, filter, tr, td, i, txtValue;
  type = document.querySelector("#filter-trans");
    filter = type.value.toUpperCase();
    tr = transactionTable.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else if(type.value==="all"){
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
  }
}

const fetchUserAccount = url => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `Bearer ${token}`
    },
    mode: "cors",
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
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
    .catch(error => {
      console.error(error);
    });
};

fetchUserAccount(accountUrl);

// Perform Transaction
const trasactButton = document.getElementById("performTrans");
const transactType = document.getElementById("trans-type");
const amountTextField = document.getElementById("amount");

let spinner;
if (accountModal) {
  spinner = accountModal.getElementsByClassName("fa-spin")[0];
}

if (spinner) {
  spinner.style.display = "none";
}

if (amountTextField) {
  amountTextField.onkeyup = () => {
    errorTag[0].innerHTML = "";
  };
}

if (transactType) {
  transactType.onchange = () => {
    errorTag[0].innerHTML = "";
  };
}

if (trasactButton) {
  trasactButton.onclick = () => {
    if (amountTextField.value === "" || amountTextField.value === null) {
      errorTag[0].innerHTML = "Enter an amount";
    } else if (!amountTextField.value.match(/^\d+(\.\d{1,2})?$/)) {
      errorTag[0].innerHTML = "Enter a valid amount";
    } else if (accSpinner.value === "default") {
      errorTag[0].innerHTML = "Select an account";
    } else if (transactType.value === "default") {
      errorTag[0].innerHTML = "Select an transaction type";
    } else {
      accountModal.disable = true;
      spinner.style.display = "inline-block";
      const transactUrl = `${baseUrl}/transactions/${accSpinner.value}/${
        transactType.value
      }`;
      console.log(transactUrl);
      fetch(transactUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          amount: amountTextField.value
        })
      })
        .then(response => response.json())
        .then(data => {
          switch (data.status) {
            case 200:
              console.log(data);
              showAlert("green", data.message);
              accountModal.style.display = "none";
              setTimeout(() => {
                window.location.reload(true);
              }, 4000);
              break;
            case 400:
            case 401:
              errorTag[0].innerHTML = data.error;
              break;
            default:
              break;
          }
          spinner.style.display = "none";
        })
        .catch(error => {
          console.log(error);
          accountModal.disable = false;
          spinner.style.display = "none";
        });
    }
  };
}

