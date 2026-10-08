const factBox = document.getElementById("fact");
const factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/today?language=en";

const showFactMessage = (text) => {
  factBox.textContent = "";
  const message = document.createElement("p");
  message.className = "fact-text";
  message.textContent = text;
  factBox.appendChild(message);
};

const createSourceLink = (data) => {
  const source = document.createElement("a");
  source.href = data.source_url;
  source.textContent = `Source: ${data.source}`;
  source.className = "fact-source";
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  return source;
};

const showFact = (data) => {
  factBox.textContent = "";

  const label = document.createElement("p");
  label.className = "fact-label";
  label.textContent = "Fact of the day";

  const fact = document.createElement("p");
  fact.className = "fact-text";
  fact.textContent = data.text;

 

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

loadFact();