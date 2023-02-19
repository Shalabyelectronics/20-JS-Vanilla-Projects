const addUserBtn = document.getElementById("add-user-btn");
const doubleMoneyBtn = document.getElementById("double-money-btn");
const showMillionirsBtn = document.getElementById("show-millionirs-btn");
const sortReachestBtn = document.getElementById("sort-reachest-btn");
const calculateWealthBtn = document.getElementById("calculate-wealth-btn");

class attrubutes {
  constructor(name, value) {
    this.attrName = name;
    this.attrValue = value;
  }
}

class Component {
  constructor(hookId) {
    this.hookId = hookId;
  }
  creatRootElement(tag, cssClass, attrubutes) {
    const rootElement = document.createElement(tag);

    if (cssClass) {
      rootElement.className = cssClass;
    }
    if (attrubutes && attrubutes.length > 0) {
      for (attr of attrubutes) {
        console.log(attr.name);
        console.log(attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class AddUserCopy {
  constructor() {
    this.users = [];
  }

  userObject(firstName, lastName, wealth) {
    const user = {
      firstName,
      lastName,
      wealth,
    };
    this.users.push(user);
  }
  set addUserUi(userInfo) {
    const createUserEl = new Component("user-data-list").creatRootElement(
      "li",
      "row"
    );
    createUserEl.innerHTML = `
    <p>${userInfo.firstName} ${userInfo.lastName}</p>
    <p>\$ ${userInfo.wealth}</p>
    `;
  }
  updateUsers() {}

  addRandomUserUi() {
    console.log("starting fetching data");
    fetch(`https://randomuser.me/api`)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const firstName = data.results[0].name.first;
        const lastName = data.results[0].name.last;
        const wealth = Math.round(Math.random() * 1000 * 1000);
        const createUserEl = new Component("user-data-list").creatRootElement(
          "li",
          "row"
        );
        createUserEl.innerHTML = `
        <p>${firstName} ${lastName}</p>
        <p>\$ ${wealth}</p>
        `;
      });
  }
}

class AppCopy {
  static init() {
    console.log("starting App init Method");
    this.addUserObj = new AddUser();
    console.log(this.addUserObj.addRandomUserUi());
    // addUserBtn.addEventListener("click", this.addUserObj.addRandomUserUi);
  }
}

// App.init();
function addRandomUserUi() {
  console.log("starting fetching data");
  const promis = new Promise((resolve, reject) => {
    fetch(`https://randomuser.me/api`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((e) => reject(e));
  });
  console.log(promis.resolve());
}

// addRandomUserUi();

// Create Add user Class from scrtch without inhiratince from Componant

class AddUser {
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
const addUser = new AddUser("https://randomuser.me/api");

addUserBtn.addEventListener("click", () => {
  addUser.getRandomUserData();
});

doubleMoneyBtn.addEventListener("click", () => {
  addUser.doubleRandomWealth();
});

showMillionirsBtn.addEventListener("click", () => {
  addUser.showMillionirsOnly();
});

sortReachestBtn.addEventListener("click", () => {
  addUser.sortByReachest();
});

calculateWealthBtn.addEventListener("click", () => {
  addUser.calculateWealth();
});
