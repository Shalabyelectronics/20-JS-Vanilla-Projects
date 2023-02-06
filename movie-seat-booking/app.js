const selectField = document.getElementById("select-movie");
const allSeats = document.querySelectorAll(".row .seat");

const numbersOfSeats = document.getElementsByClassName("number-of-seats")[0];

let seatsSelected = 0;

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

const getSelectedValue = () => {
  let valueSelected = selectField.value;
  let textSelected = selectField.options[selectField.selectedIndex].text;
  return [valueSelected, textSelected];
};

const isSelectedMovie = () => {
  const selectedArray = getSelectedValue();
  if (!selectedArray[0]) {
    alert("Please Select a Movie!!!");
    return false;
  }
  return selectedArray;
};

const bookAseat = (seat) => {
  if (!isSelectedMovie()) return;
  seat.classList.toggle("selected-seat");
  updateNumOfSeats(seat.classList.contains("selected-seat"));
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
