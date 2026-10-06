const myEmail = "your.email@example.com";

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const messageInput = document.getElementById("contactMessage");
const formStatus = document.getElementById("formStatus");

const nameMinLength = 2;
const messageMinLength = 10;

const showError = (input, message) => {
  const error = document.getElementById(`${input.id}Error`);
  error.textContent = message;
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
};

const clearError = (input) => {
  const error = document.getElementById(`${input.id}Error`);
  error.textContent = "";
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validateName = () => {
  const name = nameInput.value.trim();

  if (name === "") {
    showError(nameInput, "Please enter your name.");
    return false;
  }

  if (name.length < nameMinLength) {
    showError(nameInput, `Your name needs at least ${nameMinLength} characters.`);
    return false;
  }

  clearError(nameInput);
  return true;
};

const validateEmail = () => {
  const email = emailInput.value.trim();

  if (email === "") {
    showError(emailInput, "Please enter your email address.");
    return false;
  }

  if (!isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email address, like name@example.com.");
    return false;
  }

  clearError(emailInput);
  return true;
};

const validateMessage = () => {
  const message = messageInput.value.trim();

  if (message === "") {
    showError(messageInput, "Please write a message.");
    return false;
  }

  if (message.length < messageMinLength) {
    showError(messageInput, `Your message needs at least ${messageMinLength} characters.`);
    return false;
  }

  clearError(messageInput);
  return true;
};

const validateForm = () => {
  const nameIsValid = validateName();
  const emailIsValid = validateEmail();
  const messageIsValid = validateMessage();
  return nameIsValid && emailIsValid && messageIsValid;
};

const showFormStatus = (text, type) => {
  formStatus.textContent = "";
  const alert = document.createElement("p");
  alert.className = `form-message form-message-${type}`;
  alert.textContent = text;
  formStatus.appendChild(alert);
};

const focusFirstError = () => {
  const firstInvalid = contactForm.querySelector(".is-invalid");
  if (firstInvalid) {
    firstInvalid.focus();
  }
};

const openEmailApp = (name, email, message) => {
  const subject = `Message from ${name}`;
  const body = `${message}\n\nFrom: ${name} (${email})`;
  window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (!validateForm()) {
    showFormStatus("Some fields need your attention. Check the messages below each field.", "error");
    focusFirstError();
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  showFormStatus(`Thanks, ${name}! Your message is ready to send in your email app.`, "success");
  openEmailApp(name, email, message);
  contactForm.reset();
};

contactForm.addEventListener("submit", handleSubmit);

nameInput.addEventListener("input", () => {
  if (nameInput.classList.contains("is-invalid")) {
    validateName();
  }
});

emailInput.addEventListener("input", () => {
  if (emailInput.classList.contains("is-invalid")) {
    validateEmail();
  }
});

messageInput.addEventListener("input", () => {
  if (messageInput.classList.contains("is-invalid")) {
    validateMessage();
  }
});