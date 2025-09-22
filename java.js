let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list");
let seeMoreButtons = document.querySelectorAll(".seeMore");
let backButton = document.getElementById("back");

nextButton.onclick = function () {
  showSlider("next");
};
prevButton.onclick = function () {
  showSlider("prev");
};
let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    
    window.location.href = "page2.html";
  };
});
backButton.onclick = function () {
  
  window.location.href = "page2.html";
};


function calculate() {
  
  const ageEl = document.getElementById("age");
  const genderEl = document.getElementById("gender");
  const heightEl = document.getElementById("height");
  const weightEl = document.getElementById("weight");
  const activityEl = document.getElementById("activity");
  const resultBox = document.getElementById("result");

  if (!ageEl || !genderEl || !heightEl || !weightEl || !activityEl) {
    alert("Calculator elements not found on page.");
    return;
  }

  
  const age = parseInt(ageEl.value, 10);
  const gender = (genderEl.value || "").toLowerCase();
  const height = parseFloat(heightEl.value);
  const weight = parseFloat(weightEl.value);
  const activity = parseFloat(activityEl.value);

  if (!age || !height || !weight || !activity || (gender !== "male" && gender !== "female")) {
    alert("Please fill all fields with valid values.");
    return;
  }

  // BMR
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // tdee
  const tdee = bmr * activity;

  // macros
  const carbs = (tdee * 0.5) / 4;
  const protein = (tdee * 0.2) / 4;
  const fat = (tdee * 0.3) / 9;

  
  const setIfExists = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerText = Math.round(value);
  };

  setIfExists("bmr", bmr);
  setIfExists("tdee", tdee);
  setIfExists("carbs", carbs);
  setIfExists("protein", protein);
  setIfExists("fat", fat);

  
  if (resultBox) resultBox.style.display = "block";

  
  const carbsBar = document.getElementById("carbsBar");
  const proteinBar = document.getElementById("proteinBar");
  const fatBar = document.getElementById("fatBar");
  if (carbsBar) carbsBar.style.width = "50%";
  if (proteinBar) proteinBar.style.width = "20%";
  if (fatBar) fatBar.style.width = "30%";
}
// footer
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("footer a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); 
      const text = link.textContent.trim();

      
      navigator.clipboard.writeText(text).then(() => {
        alert(`${text} copied to clipboard!`);
      });
    });
  });
});

