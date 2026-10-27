"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  const languageToggle = document.getElementById("languageToggle");
  const translatableElements = document.querySelectorAll("[data-ar][data-en]");

  function setLanguage(language) {
    const safeLanguage = language === "en" ? "en" : "ar";
    document.documentElement.lang = safeLanguage;
    document.documentElement.dir = safeLanguage === "ar" ? "rtl" : "ltr";

    translatableElements.forEach((element) => {
      const translated = safeLanguage === "ar" ? element.dataset.ar : element.dataset.en;
      // Only headings whose translation intentionally contains inline <span> markup
      // should be parsed as HTML. Ordinary text is inserted safely as text.
      if (translated.includes("<span") && translated.includes("</span>")) {
        element.innerHTML = translated;
      } else {
        element.textContent = translated;
      }
    });

    if (languageToggle) {
      languageToggle.textContent = safeLanguage === "ar" ? "EN" : "عربي";
      languageToggle.setAttribute(
        "aria-label",
        safeLanguage === "ar" ? "Switch to English" : "التغيير إلى العربية"
      );
    }

    try {
      localStorage.setItem("portfolio-language", safeLanguage);
    } catch (_) {
      // The page remains usable if localStorage is unavailable.
    }
  }

  let savedLanguage = "ar";
  try {
    const stored = localStorage.getItem("portfolio-language");
    if (stored === "ar" || stored === "en") savedLanguage = stored;
  } catch (_) {}

  setLanguage(savedLanguage);

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#mainNav a[href^='#']");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
  }
});
