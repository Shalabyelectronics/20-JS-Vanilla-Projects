const selectField = document.getElementById("select-movie");
const allSeats = document.querySelectorAll(".row .seat");

const numbersOfSeats = document.getElementsByClassName("number-of-seats")[0];

const totalPriceForSeats = document.querySelector(".total-amount");

let seatsSelected = 0;

let totalPrice = 0;

const updateNumOfSeats = (haveSelectedClass) => {
  // if same seat was unchecked we nead to - else if new seat +
  if (haveSelectedClass) {
    seatsSelected++;
    numbersOfSeats.innerText = "";
    numbersOfSeats.innerText = seatsSelected;
  } else {
    seatsSelected--;
    numbersOfSeats.innerText = "";
    numbersOfSeats.innerText = seatsSelected;
  }
};

const updateTotalPrice = (movieTekitPrice) => {
  totalPrice = seatsSelected * +movieTekitPrice;
  totalPriceForSeats.innerText = totalPrice;
};

const getSelectedValue = () => {
  let valueSelected = selectField.value;
  let textSelected = selectField.options[selectField.selectedIndex].text;
  updateTotalPrice(valueSelected);
  return [valueSelected, textSelected];
};

const isSelectedMovie = () => {
  const selectedArray = getSelectedValue();
  if (selectedArray[0] == 0) {
    alert("Please Select a Movie!!!");
    return false;
  }
  return selectedArray;
};

const clearAll = () => {
  if (getSelectedValue()[0] == 0) {
    allSeats.forEach((checkSeat) => {
      if (checkSeat.classList.contains("selected-seat")) {
        checkSeat.classList.remove("selected-seat");
      }
    });
    seatsSelected = 0;
    numbersOfSeats.innerText = seatsSelected;
    updateTotalPrice(0);
  }
};

const bookAseat = (seat) => {
  clearAll();
  if (!isSelectedMovie()) return;
  seat.classList.toggle("selected-seat");
  updateNumOfSeats(seat.classList.contains("selected-seat"));
  updateTotalPrice(isSelectedMovie()[0]);
};
const addListenerToavailableSeats = () => {
  allSeats.forEach((seat) => {
    if (!seat.classList.contains("booked-seat")) {
      seat.addEventListener("click", bookAseat.bind(this, seat));
    }
  });
};

selectField.addEventListener("change", getSelectedValue);
addListenerToavailableSeats();
