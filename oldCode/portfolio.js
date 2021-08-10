const sections = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");
const headertest = document.querySelector("header");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const pic1 = document.querySelector(".pic1");

var navIsActive = false;

const gradients = [
  "linear-gradient(to bottom, #B2FEFA, #0ED2F7)",
  "linear-gradient(to bottom, #B2FEFA, #0ED2F7)",
  "linear-gradient(to bottom, #B2FEFA, #0ED2F7)",
  "linear-gradient(to bottom, #B2FEFA, #0ED2F7)",
];

const options = {
  threshold: 0.7,
};

//pic1.style.width = window.innerWidth / 3;

window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    headertest.style.boxShadow = "0px 3px 6px rgba(0, 0, 0, 0.4)";
    bubble.style.opacity = "1";
  } else {
    headertest.style.boxShadow = "0px 3px 10px rgba(0, 0, 0, 0)";
    bubble.style.opacity = "0";
  }
});

sections.forEach((section) => {
  section.addEventListener("click", function () {
    if (navIsActive) {
      navIsActive = false;
      navSlide();
    }
  });
});

burger.addEventListener("click", () => {
  navIsActive = true;
  navSlide();
});

const navSlide = () => {
  nav.classList.toggle("nav-active");

  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.4s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
  entries.forEach((entry) => {
    const className = entry.target.className;
    const activeAnchor = document.querySelector(`[data-page=${className}]`);
    const gradientIndex = entry.target.getAttribute("data-index");
    const coords = activeAnchor.getBoundingClientRect();

    const directions = {
      height: coords.height,
      width: coords.width,
      top: coords.top,
      left: coords.left,
    };
    if (entry.isIntersecting) {
      var testme = directions.left - directions.width / 2;
      var testme2 = directions.left - testme;
      //console.log(testme);
      bubble.style.setProperty(
        "left",
        `${directions.left - directions.width / 2}px`
      );
      bubble.style.setProperty("top", `${directions.top + 47}px`);
      bubble.style.setProperty("width", `${testme2 * 2 + directions.width}px`);
      bubble.style.setProperty("height", `${10}px`);
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});

//navSlide();
