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

const removeSuccessClasses = (inputSelector, errorSelector) => {
  if (
    inputSelector.classList.contains("input-success") &&
    errorSelector.classList.contains("success")
  ) {
    errorSelector.classList.remove("success");
    inputSelector.classList.remove("input-success");
  }
};

const addSuccessClasses = (inputSelector, errorSelector) => {
  errorSelector.textContent = SUCCESS;
  errorSelector.classList.add("success");
  inputSelector.classList.add("input-success");
};

const addErrorClasses = (inputSelector, errorSelector, message) => {
  errorSelector.textContent = message;
  errorSelector.classList.add("error");
  inputSelector.classList.add("input-error");
};

const formObjectDataValidator = (
  inputType,
  inputSelector,
  errorSelector,
  condition,
  message
) => {
  switch (inputType) {
    case "username":
      if (inputSelector.value.length > condition) {
        addSuccessClasses(inputSelector, errorSelector);
        return;
      }
      removeSuccessClasses(inputSelector, errorSelector);
      addErrorClasses(inputSelector, errorSelector, message);
      break;
    case "email":
      if (inputSelector.value) {
        if (condition.test(inputSelector.value)) {
          addSuccessClasses(inputSelector, errorSelector);

          return;
        }
      }
      removeSuccessClasses(inputSelector, errorSelector);
      addErrorClasses(inputSelector, errorSelector, message);
      break;
    case "password":
      if (inputSelector.value.length >= condition) {
        addSuccessClasses(inputSelector, errorSelector);
        return;
      }
      removeSuccessClasses(inputSelector, errorSelector);
      addErrorClasses(inputSelector, errorSelector, message);
      break;
    case "password confirm":
      if (inputSelector.value === condition && condition.length >= 8) {
        addSuccessClasses(inputSelector, errorSelector);
        return;
      }
      removeSuccessClasses(inputSelector, errorSelector);
      addErrorClasses(inputSelector, errorSelector, message);
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
