const langBtn = document.querySelector("#langBtn");
const translatableElements = document.querySelectorAll("[data-ar][data-en]");
const year = document.querySelector("#year");

let currentLanguage = "ar";

if (langBtn) {
    langBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === "ar" ? "en" : "ar";

        document.documentElement.lang = currentLanguage;
        document.documentElement.dir =
            currentLanguage === "ar" ? "rtl" : "ltr";

        translatableElements.forEach((element) => {
            element.textContent = element.dataset[currentLanguage];
        });

        langBtn.textContent =
            currentLanguage === "ar" ? "English" : "العربية";
    });
}

if (year) {
    year.textContent = new Date().getFullYear();
}
