const btnNavEl = document.querySelector(".menu-button");
const buttons = document.querySelector(".buttons");
const headerEl = document.querySelector(".navigation-bar");
const herobottom = document.querySelector(".hero-bottom");
const herocenter = document.querySelector(".hero-center");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  toggleHeroElements();
});

const allLink = document.querySelectorAll("a:link");

allLink.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    //scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //close mobile nav
    if (link.classList.contains("nav-button")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});
function toggleHeroElements() {
  if (headerEl.classList.contains("nav-open")) {
    console.log("Add");
    herobottom.classList.add("hidden");
    herocenter.classList.add("hidden");
  } else {
    console.log("Remove");
    herobottom.classList.remove("hidden");
    herocenter.classList.remove("hidden");
  }
}
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Get all the elements with the "number" class
const numberElements = document.querySelectorAll(".number");

// Initialize an array to store the target values
const targetValues = [];

// Extract and store the target values from the data-value attribute
numberElements.forEach((element) => {
  const value = parseInt(element.getAttribute("data-value"));
  targetValues.push(value);
});
targetValues.forEach((value, index) => {
  console.log(formatNumberWithCommas(value));
});
// Calculate the increment for each counter
const duration = 5000; // 5 seconds in milliseconds
const updateInterval = 50; // Update every 50 milliseconds for smoother animation

const incrementValues = targetValues.map((value, index) => {
  const frames = duration / updateInterval;
  return value / frames;
});

// Function to update the counters
function updateCounters() {
  let allFinished = true;

  numberElements.forEach((element, index) => {
    const currentValue = parseInt(element.textContent);
    if (currentValue < targetValues[index]) {
      const newValue = Math.min(
        currentValue + incrementValues[index],
        targetValues[index]
      );
      if (index === 2) {
        element.textContent = newValue.toLocaleString("en-US");
        console.log(element.textContent);
      } else {
        element.textContent = Math.round(newValue);
      }
      allFinished = false;
    }
  });

  if (!allFinished) {
    requestAnimationFrame(updateCounters);
  }
}

// Start the counting process
setTimeout(updateCounters, updateInterval);
