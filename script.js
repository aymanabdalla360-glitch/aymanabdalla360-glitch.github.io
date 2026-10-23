
"use strict";

// تحديث السنة الحالية في أسفل الصفحة
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// تغيير اللغة بين العربية والإنجليزية
const languageToggle = document.getElementById("languageToggle");
const translatableElements = document.querySelectorAll("[data-ar][data-en]");

function setLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    translatableElements.forEach((element) => {
        element.textContent =
            language === "ar"
                ? element.dataset.ar
                : element.dataset.en;
    });

    if (languageToggle) {
        languageToggle.textContent = language === "ar" ? "EN" : "عربي";
        languageToggle.setAttribute("aria-label",
            language === "ar" ? "Switch to English" : "التغيير إلى العربية");
    }

    try {
        localStorage.setItem("portfolio-language", language);
    } catch (error) {
        // يستمر الموقع في العمل حتى إذا تعذر استخدام localStorage
    }
}

// تحميل اللغة المحفوظة عند فتح الموقع
let savedLanguage = "ar";

try {
    savedLanguage = localStorage.getItem("portfolio-language") || "ar";
} catch (error) {
    savedLanguage = "ar";
}

setLanguage(savedLanguage);

// الاستماع إلى زر تغيير اللغة
if (languageToggle) {
    languageToggle.addEventListener("click", () => {
        const currentLanguage = document.documentElement.lang || "ar";
        const newLanguage = currentLanguage === "ar" ? "en" : "ar";

        setLanguage(newLanguage);
    });
}

// قائمة الهاتف المحمول
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // إغلاق القائمة بعد الضغط على أحد الروابط
    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// تحديد رابط القسم الظاهر أثناء التمرير
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#mainNav a[href^='#']");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}
