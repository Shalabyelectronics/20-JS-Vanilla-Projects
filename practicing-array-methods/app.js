const addUserBtn = document.getElementById("add-user-btn");
const doubleMoneyBtn = document.getElementById("double-money-btn");
const showMillionirsBtn = document.getElementById("show-millionirs-btn");
const sortReachestBtn = document.getElementById("sort-reachest-btn");
const calculateWealthBtn = document.getElementById("calculate-wealth-btn");

class WealthUsersApp {
  constructor(url) {
    this.url = url;
    this.mainUserList = document.getElementById("user-data-list");
    this.totalNodeEl = this.mainUserList.nextElementSibling;
    this.totalAmountEl = this.totalNodeEl.lastElementChild;
    this.addUserWarinig = document.getElementById("add-user");
  }
  users = [];

  get allUsers() {}

  set userToUI(user) {
    // console.log(user);
    const rootElement = document.createElement("li");
    rootElement.className = "row";
    rootElement.innerHTML = `
    <p>${user.first} ${user.last}</p>
    <p>\$ ${user.wealth}</p>
    `;
    this.mainUserList.append(rootElement);
  }
  addUserToList(randomUser) {
    this.users.push(randomUser);
    this.userToUI = randomUser;
    // console.log(randomUser);
  }
  getRandomWealth(defualtWealth) {
    return Math.round(Math.random() * 1000 * defualtWealth);
  }
  clearUsersList() {
    this.mainUserList.querySelectorAll("li").forEach((row) => {
      row.remove();
    });
  }
  removeUserWarning() {
    this.addUserWarinig.classList.add("remove-elment");
  }
  showMillionirsOnly() {
    this.removeTotalEl();
    this.clearUsersList();
    this.users.filter((user) => {
      if (user.wealth >= 1000000) {
        this.userToUI = user;
      }
    });
  }
  // Next Show All users
  sortByReachest() {
    this.removeTotalEl();
    this.clearUsersList();
    this.users.sort((userA, userB) => {
      return userB.wealth - userA.wealth;
    });
    this.users.forEach((user) => {
      this.userToUI = user;
    });
  }

  doubleRandomWealth() {
    this.removeTotalEl();
    this.clearUsersList();
    this.users.forEach((user) => {
      user.wealth = user.wealth * 2;
      this.userToUI = user;
    });
    // Also we can use for Of
    // for (const user of this.users) {
    //   user.wealth = user.wealth * 2;
    //   this.userToUI = user;
    // }
  }
  removeTotalEl() {
    this.totalNodeEl.classList.remove("visiable");
  }
  showAndUpdateTotal(total) {
    this.totalAmountEl.innerText = `$ ${total}`;
    this.totalNodeEl.classList.add("visiable");
  }
  calculateWealth() {
    const totalWealth = this.users.reduce((total, user) => {
      return total + user.wealth;
    }, 0);

    // console.log(totalWealth, typeof totalWealth);
    this.showAndUpdateTotal(totalWealth);
    // this.users.forEach((user) => {
    //   console.log(user.wealth, typeof user.wealth);
    // });
  }
  getRandomUserData() {
    this.removeUserWarning();
    this.removeTotalEl();
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        data.results[0].name.wealth = this.getRandomWealth(1000);
        this.addUserToList(data.results[0].name);
      })
      .catch((err) => console.error("Oops the API not Working", err));
  }
}

// const addUser = new AddUser("https://randomuser.me/api");
// addUser.getRandomUserData();
const wealthUserApp = new WealthUsersApp("https://randomuser.me/api");

addUserBtn.addEventListener("click", () => {
  wealthUserApp.getRandomUserData();
});

doubleMoneyBtn.addEventListener("click", () => {
  wealthUserApp.doubleRandomWealth();
});

showMillionirsBtn.addEventListener("click", () => {
  wealthUserApp.showMillionirsOnly();
});

sortReachestBtn.addEventListener("click", () => {
  wealthUserApp.sortByReachest();
});

calculateWealthBtn.addEventListener("click", () => {
  wealthUserApp.calculateWealth();
});
