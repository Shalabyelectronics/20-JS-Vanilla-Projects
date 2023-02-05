const userNameInput = document.getElementById("username");
const userNameInputError = userNameInput.nextElementSibling;
const emailInput = document.getElementById("email");
const emailInputError = emailInput.nextElementSibling;
const passwordInput = document.getElementById("password");
const passwordInputError = passwordInput.nextElementSibling;
const confirmPassInput = document.getElementById("confirm-password");
const confirmInputError = confirmPassInput.nextElementSibling;
const submitBtn = document.getElementById("submit-btn");

// Standard Validators

const USERNAME_LENGTH = 4;
const USERNAME_ERROR_MESSAGE = `Your user name must be more than ${USERNAME_LENGTH} letters.`;

const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;
const EMAIL_ERROR_MESSAGE = "Your Email is not valid ex: example@mail.com";

const PASS_LENGTH = 8;
const PASS_ERROR_MESSAGE = `Your password must be 8 or more of length`;
const PASS_CONFIRM_ERROR_MESSAGE = `Your password didn't match!`;

const SUCCESS = "Success";

// Validator Functions

const formObjectDataValidator = (
  inputType,
  inputSelector,
  errorSelector,
  condition,
  message
) => {
  switch (inputType) {
    case "username":
      if (inputSelector.value.length < condition) {
        errorSelector.textContent = message;
        errorSelector.classList.add("error");
        inputSelector.classList.add("input-error");
        return;
      }
      console.log("username here");
      errorSelector.textContent = SUCCESS;
      errorSelector.classList.add("success");
      inputSelector.classList.add("input-success");
      break;
    case "email":
      console.log("start Email Validator Process");
      console.log("Before condition", condition.test(inputSelector.value));
      console.log(
        "Before condition with not",
        !condition.test(inputSelector.value)
      );
      console.log(
        "input value ",
        !inputSelector.value,
        "condition pattern ",
        !condition.test(inputSelector.value)
      );
      console.log(
        "all condition",
        !condition.test(inputSelector.value) && !inputSelector.value
      );
      if (inputSelector.value) {
        if (condition.test(inputSelector.value)) {
          errorSelector.textContent = SUCCESS;
          errorSelector.classList.add("success");
          inputSelector.classList.add("input-success");

          return;
        }
      }
      errorSelector.textContent = message;
      errorSelector.classList.add("error");
      inputSelector.classList.add("input-error");
      break;
    case "password":
      if (inputSelector.value.length >= condition) {
        errorSelector.textContent = SUCCESS;
        errorSelector.classList.add("success");
        inputSelector.classList.add("input-success");
        return;
      }
      errorSelector.textContent = message;
      errorSelector.classList.add("error");
      inputSelector.classList.add("input-error");
      break;
    case "password confirm":
      if (inputSelector.value === condition) {
        errorSelector.textContent = SUCCESS;
        errorSelector.classList.add("success");
        inputSelector.classList.add("input-success");
        return;
      }
      if (
        inputSelector.classList.contains("input-success") &&
        errorSelector.classList.contains("success")
      ) {
        errorSelector.classList.remove("success");
        inputSelector.classList.remove("input-success");
      }
      errorSelector.textContent = message;
      errorSelector.classList.add("error");
      inputSelector.classList.add("input-error");
      break;
  }
};

const userNameValidator = () => {
  formObjectDataValidator(
    "username",
    userNameInput,
    userNameInputError,
    USERNAME_LENGTH,
    USERNAME_ERROR_MESSAGE
  );
};

const emailValidator = () => {
  // console.log(emailInput);
  // console.log(emailInput.value);
  // console.log(emailInputError);
  // console.log(EMAIL_PATTERN);
  // console.log(EMAIL_PATTERN.test("fdfd@fdfdf.com"));
  // console.log(EMAIL_PATTERN.test(""));

  formObjectDataValidator(
    "email",
    emailInput,
    emailInputError,
    EMAIL_PATTERN,
    EMAIL_ERROR_MESSAGE
  );
};

const passwordValidator = () => {
  formObjectDataValidator(
    "password",
    passwordInput,
    passwordInputError,
    PASS_LENGTH,
    PASS_ERROR_MESSAGE
  );
  return passwordInput.value;
};

const passwordConfirmation = (password) => {
  if (!password) return;
  formObjectDataValidator(
    "password confirm",
    confirmPassInput,
    confirmInputError,
    password,
    PASS_CONFIRM_ERROR_MESSAGE
  );
};

const stopPageRefresh = (event) => {
  //Preventing page refresh
  event.preventDefault();
};

const startValidatorProccess = (event) => {
  stopPageRefresh(event);
  userNameValidator();
  emailValidator();
  passwordValidator();
  passwordConfirmation(passwordValidator());
};

submitBtn.addEventListener("click", startValidatorProccess);
