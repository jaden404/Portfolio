const factBox = document.getElementById("fact");
const factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/today?language=en";

const showFactMessage = (text) => {
  factBox.textContent = "";
  const message = document.createElement("p");
  message.className = "fs-5 mb-0";
  message.textContent = text;
  factBox.appendChild(message);
};

const createSourceLink = (data) => {
  const source = document.createElement("a");
  source.href = data.source_url;
  source.textContent = `Source: ${data.source}`;
  source.className = "small text-white";
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  return source;
};

const showFact = (data) => {
  factBox.textContent = "";

  const label = document.createElement("p");
  label.className = "fw-bold mb-1";
  label.textContent = "Fact of the day";

  const fact = document.createElement("p");
  fact.className = "fs-5 mb-1";
  fact.textContent = data.text;

  factBox.append(label, fact);

  if (data.source && data.source_url) {
    factBox.appendChild(createSourceLink(data));
  }
};

const loadFact = () => {
  showFactMessage("Loading today's fact...");

  fetch(factUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fact request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => showFact(data))
    .catch(() => showFactMessage("Could not load today's fact right now. Please try again later."));
};

loadFact();S