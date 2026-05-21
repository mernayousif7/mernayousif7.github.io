const typingWords = [
  "Software Developer",
  "Data & SQL Enthusiast",
  "QA & Testing Enthusiast",
  "Full-Stack Project Builder"
];

const typedText = document.querySelector(".typed-text");

let typingWordIndex = 0;
let typingCharIndex = 0;
let typingDeleting = false;

function typeRoleText() {
  if (!typedText) return;

  const currentWord = typingWords[typingWordIndex];

  if (typingDeleting) {
    typedText.textContent = currentWord.substring(0, typingCharIndex - 1);
    typingCharIndex--;
  } else {
    typedText.textContent = currentWord.substring(0, typingCharIndex + 1);
    typingCharIndex++;
  }

  let speed = typingDeleting ? 45 : 85;

  if (!typingDeleting && typingCharIndex === currentWord.length) {
    speed = 1300;
    typingDeleting = true;
  } else if (typingDeleting && typingCharIndex === 0) {
    typingDeleting = false;
    typingWordIndex = (typingWordIndex + 1) % typingWords.length;
    speed = 350;
  }

  setTimeout(typeRoleText, speed);
}

typeRoleText();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

const portrait = document.querySelector(".portrait");
const fallback = document.querySelector(".portrait-fallback");

if (portrait) {
  const testImage = new Image();
  testImage.onload = () => {
    portrait.style.display = "block";
    fallback.style.display = "none";
  };
  testImage.onerror = () => {
    portrait.style.display = "none";
    fallback.style.display = "grid";
  };
  testImage.src = "profile.jpg";
}
