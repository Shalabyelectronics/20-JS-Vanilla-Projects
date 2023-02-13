const fromCurrency = document.getElementById("from-currency");
const fromAmoun = document.getElementById("from-amount");
const swapBtn = document.getElementById("swap-btn");
const currecyRateStatus = document.getElementById("currecy-rate");
const toCurrency = document.getElementById("to-currency");
const toAmoun = document.getElementById("to-amount");

class ConverRate {
  constructor(amount, fromCurrency, toCurrency) {
    this.amount = amount;
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
  }
  convertAmount() {}
}
