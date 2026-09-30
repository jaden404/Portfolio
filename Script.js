let myEmail = "your.email@example.com";

let fact = document.getElementById("fact");

if (fact) {
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      fact.textContent = data.text;
    })
    .catch(function(error) {
      fact.textContent = "Could not load a fact right now.";
    });
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("contactName").value;
  let email = document.getElementById("contactEmail").value;
  let message = document.getElementById("contactMessage").value;

  let nameMinLength = 2;
  let emailMinLength = 5;
  let messageMinLength = 4;

  let subject = "Message from " + name;
  let body = message + "\n\nFrom: " + name + " (" + email + ")";

  window.location.href = "mailto:" + myEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});