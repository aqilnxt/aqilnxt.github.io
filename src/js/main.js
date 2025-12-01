// =====================================
// IMPORTS
// =====================================
import "../css/input.css";
import AOS from "aos";
import "aos/dist/aos.css";
// import '../css/style.css'
import Typed from "typed.js";

// =====================================
// UTILITY FUNCTIONS
// =====================================
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// =====================================
// CONSTANTS
// =====================================
const SCROLL_THRESHOLD = 50;
const THEME_KEY = "theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

// =====================================
// APP INITIALIZATION
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 App initialized!");

  initAOS();
  initNavbar();
  initHamburgerMenu();
  initThemeToggle();
  initBackToTop();
  initTypingEffect();

  console.log("✅ All features loaded!");
});

// =====================================
// AOS ANIMATION
// =====================================
function initAOS() {
  AOS.init({
    duration: 1000, // Durasi animasi lebih smooth
    once: true, // Animasi hanya sekali
    offset: 120, // Offset untuk trigger animasi
    easing: "ease-out-cubic", // Easing yang smooth
    delay: 0, // Delay default
    anchorPlacement: "top-bottom", // Trigger saat elemen mencapai bagian bawah viewport
    mirror: false, // Tidak perlu animasi saat scroll kembali
  });
  console.log("✨ AOS initialized with professional animations");
}

// =====================================
// NAVBAR FIXED & SCROLL EFFECTS
// =====================================
function initNavbar() {
  const header = document.querySelector("header");

  if (!header) {
    console.warn("⚠️ Header element not found");
    return;
  }

  const handleScroll = throttle(() => {
    if (window.pageYOffset > SCROLL_THRESHOLD) {
      header.classList.add("navbar-fixed");
    } else {
      header.classList.remove("navbar-fixed");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });
  console.log("📍 Navbar scroll effect initialized");
}

// =====================================
// HAMBURGER MENU
// =====================================
function initHamburgerMenu() {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");

  if (!hamburger || !navMenu) {
    console.warn("⚠️ Hamburger or nav-menu not found");
    return;
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  function toggleMenu() {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");

    const isExpanded = !navMenu.classList.contains("hidden");
    hamburger.setAttribute("aria-expanded", isExpanded);
  }

  function closeMenu() {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
    hamburger.setAttribute("aria-expanded", "false");
  }

  console.log("🍔 Hamburger menu initialized");
}

// =====================================
// DARK MODE THEME TOGGLE
// =====================================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const html = document.documentElement;

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.warn("⚠️ Theme toggle elements not found");
    return;
  }

  function getCurrentTheme() {
    return (
      localStorage.getItem(THEME_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEME_DARK
        : THEME_LIGHT)
    );
  }

  function updateIcons(theme) {
    if (theme === THEME_DARK) {
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleDarkIcon.classList.add("hidden");
    } else {
      themeToggleLightIcon.classList.add("hidden");
      themeToggleDarkIcon.classList.remove("hidden");
    }
  }

  function applyTheme(theme) {
    if (theme === THEME_DARK) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
    updateIcons(theme);
  }

  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
    console.log(`🎨 Theme switched to: ${newTheme}`);
  }

  const initialTheme = getCurrentTheme();
  applyTheme(initialTheme);

  themeToggleBtn.addEventListener("click", toggleTheme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });

  console.log("🌓 Dark mode initialized");
}

// =====================================
// BACK TO TOP BUTTON
// =====================================
function initBackToTop() {
  const toTopBtn = document.querySelector("#to-top");

  if (!toTopBtn) {
    console.warn("⚠️ Back to top button not found");
    return;
  }

  const handleScroll = throttle(() => {
    if (window.pageYOffset > SCROLL_THRESHOLD) {
      toTopBtn.classList.remove("hidden");
      toTopBtn.classList.add("flex");
    } else {
      toTopBtn.classList.add("hidden");
      toTopBtn.classList.remove("flex");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });

  toTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  console.log("⬆️ Back to top button initialized");
}

// =====================================
// TYPING EFFECT
// =====================================
function initTypingEffect() {
  const typed = new Typed("#typed", {
    strings: [
      "a Thinker",
      "Frontend Developer",
      "Tech Enthusiast",
      "Problem Solver",
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
  console.log("⌨️ Typing effect initialized");
}
