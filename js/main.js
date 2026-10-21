// منوی موبایل
var navToggle = document.querySelector(".nav-toggle");
var navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        var open = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
}

// نمایش تدریجی بخش‌ها هنگام اسکرول
var revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
} else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
}

// نوار لوگوهای متحرک: لیست دوبار تکرار می‌شود تا حلقه بی‌وقفه باشد
var marquee = document.querySelector(".marquee");
if (marquee && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var track = marquee.querySelector(".logo-track");
    Array.prototype.slice.call(track.children).forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });
    marquee.classList.add("animated");
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
