// منوی موبایل
var navToggle = document.querySelector(".nav-toggle");
var navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        var open = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
}

// سال جاری در فوتر
var yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ارسال فرم با AJAX به Formspree و انتقال به صفحه موفقیت
// validate: تابع اختیاری که در صورت خطا متن خطا را برمی‌گرداند
function setupAjaxForm(form, validate) {
    var statusEl = form.querySelector(".form-status");
    var submitButton = form.querySelector("button[type='submit']");
    var buttonText = submitButton.textContent;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        statusEl.textContent = "";

        var error = validate ? validate() : null;
        if (error) {
            statusEl.textContent = error;
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        }).then(function (response) {
            if (!response.ok) {
                throw new Error("Request failed");
            }
            window.location.href = "success.html";
        }).catch(function () {
            statusEl.textContent = "Something went wrong. Please try again.";
            submitButton.disabled = false;
            submitButton.textContent = buttonText;
        });
    });
}

var contactForm = document.getElementById("contact-form");
if (contactForm) {
    setupAjaxForm(contactForm);
}
