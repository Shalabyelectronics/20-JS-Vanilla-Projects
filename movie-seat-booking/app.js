const selectField = document.getElementById("select-movie");
const allSeats = document.querySelectorAll(".row .seat");
const cenimaBoardBox = document.querySelector(".cenima-board-box");

const numbersOfSeats = document.getElementsByClassName("number-of-seats")[0];

const totalPriceForSeats = document.querySelector(".total-amount");

const selectMovieError = document.querySelector(".select-movie-error");

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
  localStorage.setItem(
    "movieData",
    JSON.stringify([valueSelected, textSelected])
  );
  updateTotalPrice(valueSelected);
  return [valueSelected, textSelected];
};

const updateMovieSelected = (movieValue) => {
  console.log((selectField.value = movieValue));
};

const isSelectedMovie = () => {
  const selectedArray = getSelectedValue();
  if (selectedArray[0] == 0) {
    selectMovieError.classList.toggle("show-error");
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

const updateSelectedSeats = () => {
  const getAllSelectedSeat = document.querySelectorAll(
    ".row .seat.selected-seat"
  );
  const selectedSeatsIndex = [...getAllSelectedSeat].map((seat) => {
    return [...allSeats].indexOf(seat);
  });
  localStorage.setItem(
    "selectedSeatsIndex",
    JSON.stringify(selectedSeatsIndex)
  );
  return selectedSeatsIndex;
};

const bookAseat = (seat) => {
  clearAll();
  if (!isSelectedMovie()) return;
  selectMovieError.classList.remove("show-error");
  seat.classList.toggle("selected-seat");
  updateNumOfSeats(seat.classList.contains("selected-seat"));
  updateTotalPrice(isSelectedMovie()[0]);
  updateSelectedSeats();
};
const addListenerToavailableSeats = () => {
  allSeats.forEach((seat) => {
    if (!seat.classList.contains("booked-seat")) {
      seat.addEventListener("click", bookAseat.bind(this, seat));
    }
  });
};

const populateUi = () => {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem("selectedSeatsIndex")
  );

  const movieData = JSON.parse(localStorage.getItem("movieData"));

  if (selectedSeatsIndex != null && selectedSeatsIndex.length > 0) {
    selectedSeatsIndex.forEach((index) => {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        allSeats[index].classList.add("selected-seat");
        updateNumOfSeats(allSeats[index]);
      }
    });
  }
  if (movieData != null && movieData.length > 0 && movieData[0] != 0) {
    updateTotalPrice(movieData[0]);
    updateMovieSelected(movieData[0]);
  } else {
    clearAll();
  }
};

populateUi();

selectField.addEventListener("change", getSelectedValue);

// cenimaBoardBox.addEventListener("click", (e) => {
//   console.log(e.target.classList);
// });
addListenerToavailableSeats();
