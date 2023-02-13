const fromCurrency = document.getElementById("from-currency");
const fromAmount = document.getElementById("from-amount");
const swapBtn = document.getElementById("swap-btn");
const currecyRateStatus = document.getElementById("currecy-rate");
const toCurrency = document.getElementById("to-currency");
const toAmount = document.getElementById("to-amount");

class ConvertRate {
  constructor(
    fromAmount,
    toAmountInput,
    fromCurrency,
    toCurrency,
    rateStatusElement
  ) {
    this.fromAmount = fromAmount;
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.rateStatusElement = rateStatusElement;
    this.toAmount = toAmountInput;
  }
  getRate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const rateValue = data.rates[this.toCurrency];
        this.rateStatusElement.innerText = `1 ${
          this.fromCurrency
        }=${rateValue.toFixed(2)} ${this.toCurrency}`;
        this.toAmount.value = (this.fromAmount * rateValue).toFixed(2);
      });
  }
}

fromCurrency.addEventListener("change", () => {
  const test = new ConvertRate(
    fromAmount.value,
    toAmount,
    fromCurrency.value,
    toCurrency.value,
    currecyRateStatus
  );
  test.getRate();
});
toCurrency.addEventListener("change", () => {
  const test = new ConvertRate(
    fromAmount.value,
    toAmount,
    fromCurrency.value,
    toCurrency.value,
    currecyRateStatus
  );
  test.getRate();
});

fromAmount.addEventListener("input", () => {
  const test = new ConvertRate(
    fromAmount.value,
    toAmount,
    fromCurrency.value,
    toCurrency.value,
    currecyRateStatus
  );
  test.getRate();
});

swapBtn.addEventListener("click", () => {
  const toCurrencyValue = toCurrency.value;
  const fromCurrencyValue = fromCurrency.value;
  const toAmountValue = toAmount.value;
  const fromAmountValue = fromAmount.value;
  fromCurrency.value = toCurrencyValue;
  toCurrency.value = fromCurrencyValue;
  fromAmount.value = toAmountValue;
  toAmount.value = fromAmountValue;
  const test = new ConvertRate(
    fromAmount.value,
    toAmount,
    fromCurrency.value,
    toCurrency.value,
    currecyRateStatus
  );
  test.getRate();
});

const test = new ConvertRate(
  fromAmount.value,
  toAmount,
  fromCurrency.value,
  toCurrency.value,
  currecyRateStatus
);
test.getRate();
