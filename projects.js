const projects = [
  {
    title: "Hotel management simulator",
    description: "A Hotel management Simulator",
    image: "images/Hotel.png",
    category: "Simulation",
    year: 2026
  },
  {
    title: "Parking sensor interface",
    description: "An interface for a parking sensor system",
    image: "images/Parking.png",
    category: "Hardware",
    year: 2025
  },
  {
    title: "Smart home interface",
    description: "A Smart Home interface, with API integration and custom sensor data management",
    image: "images/Smart.png",
    category: "Web",
    year: 2026
  }
];

const projectList = document.getElementById("projectList");
const categoryFilter = document.getElementById("categoryFilter");
const sortOrder = document.getElementById("sortOrder");
const projectCount = document.getElementById("projectCount");
const projectModal = document.getElementById("projectModal");

const fillCategoryFilter = () => {
  const categories = [];

  projects.forEach((project) => {
    if (!categories.includes(project.category)) {
      categories.push(project.category);
    }
  });

  categories.sort();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
};

const filterProjects = (category) => {
  if (category === "all") {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
};

const sortProjects = (list, order) => {
  if (order === "newest") {
    list.sort((a, b) => b.year - a.year);
  } else if (order === "oldest") {
    list.sort((a, b) => a.year - b.year);
  } else if (order === "title") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return list;
};

const openProject = (project) => {
  const modalImage = document.getElementById("projectModalImage");
  modalImage.src = project.image;
  modalImage.alt = project.title;
  document.getElementById("projectModalTitle").textContent = project.title;
  document.getElementById("projectModalText").textContent = project.description;
  bootstrap.Modal.getOrCreateInstance(projectModal).show();
};

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "tile-box";
  button.addEventListener("click", () => openProject(project));

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = `Show details of ${project.title}`;

  const title = document.createElement("h2");
  title.className = "project-title";
  title.textContent = project.title;

  const details = document.createElement("p");
  details.className = "project-meta";
  details.textContent = `${project.category}, ${project.year}`;

  button.appendChild(image);
  card.append(button, title, details);
  return card;
};

const showProjectCount = (count) => {
  if (count === 0) {
    projectCount.textContent = "No projects in this category yet.";
  } else if (count === 1) {
    projectCount.textContent = "Showing 1 project";
  } else {
    projectCount.textContent = `Showing ${count} projects`;
  }
};

const renderProjects = () => {
  const filtered = filterProjects(categoryFilter.value);
  const sorted = sortProjects(filtered, sortOrder.value);

  projectList.textContent = "";

  sorted.forEach((project) => {
    projectList.appendChild(createProjectCard(project));
  });

  showProjectCount(sorted.length);
};

categoryFilter.addEventListener("change", renderProjects);
sortOrder.addEventListener("change", renderProjects);

fillCategoryFilter();
renderProjects();