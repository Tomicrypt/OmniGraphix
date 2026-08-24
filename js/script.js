/*
=========================================
 OMNI GRAPHIX
 script.js - Part 1
 Loader • Sticky Navbar • Mobile Menu
 Smooth Scroll • Back To Top
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
        LOADER
    =====================================*/

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 600);

    });

    /*=====================================
        STICKY NAVBAR
    =====================================*/

    const header = document.querySelector("header");

    function handleNavbar() {

        if (!header) return;

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    handleNavbar();

    window.addEventListener("scroll", handleNavbar);

    /*=====================================
        MOBILE MENU
    =====================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            });

        });

    }

    /*=====================================
        SMOOTH SCROLL
    =====================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            const offset = 80;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top: position,
                behavior: "smooth"

            });

        });

    });

    /*=====================================
        BACK TO TOP BUTTON
    =====================================*/

    const backToTop = document.getElementById("backToTop");

    function toggleBackButton() {

        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    toggleBackButton();

    window.addEventListener("scroll", toggleBackButton);

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

});
/*
=========================================
 OMNI GRAPHIX
 script.js - Part 2
 Scroll Reveal • Counter Animation
 Testimonial Slider • Active Nav Links
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
        SCROLL REVEAL ANIMATIONS
    =====================================*/

    const revealElements = document.querySelectorAll(
        ".service-card, .gallery-item, .price-card, .testimonial-card, .faq-item, .about-content, .section-title"
    );

    revealElements.forEach(element => {
        element.classList.add("fade-up");
    });

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /*=====================================
        ANIMATED COUNTERS
    =====================================*/

    const counters = document.querySelectorAll(".stat h2");

    function animateCounter(counter) {

        const rawValue = counter.textContent.trim();

        const target = parseInt(rawValue.replace(/\D/g, ""), 10);

        if (isNaN(target)) return;

        const suffix = rawValue.replace(/[0-9]/g, "");

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 120));

        function update() {

            current += increment;

            if (current >= target) {

                counter.textContent = target + suffix;

                return;

            }

            counter.textContent = current + suffix;

            requestAnimationFrame(update);

        }

        update();

    }

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.6
    });

    counters.forEach(counter => {

        counter.textContent = "0";

        counterObserver.observe(counter);

    });

    /*=====================================
        TESTIMONIAL SLIDER
    =====================================*/

    const testimonials = document.querySelectorAll(".testimonial-card");

    if (testimonials.length > 1) {

        let currentIndex = 0;

        testimonials.forEach((card, index) => {

            if (index !== 0) {

                card.style.display = "none";

            }

        });

        function showTestimonial(index) {

            testimonials.forEach(card => {

                card.style.display = "none";

            });

            testimonials[index].style.display = "block";

        }

        setInterval(() => {

            currentIndex++;

            if (currentIndex >= testimonials.length) {

                currentIndex = 0;

            }

            showTestimonial(currentIndex);

        }, 5000);

    }

    /*=====================================
        ACTIVE NAVIGATION LINK
    =====================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    const href = link.getAttribute("href");

                    if (
                        href === `#${sectionId}` ||
                        href === `${sectionId}.html` ||
                        (sectionId === "about" && href === "about.html") ||
                        (sectionId === "services" && href === "services.html") ||
                        (sectionId === "pricing" && href === "pricing.html")
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

});
/*
=========================================
 OMNI GRAPHIX
 script.js - Part 3
 Utilities • FAQ • Performance
 Final Initialization
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
        FAQ ACCORDION
    =====================================*/

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            // Close all other FAQ items
            faqItems.forEach(faq => {

                if (faq !== item) {
                    faq.classList.remove("active");
                }

            });

            // Toggle current FAQ
            item.classList.toggle("active");

        });

    });

    /*=====================================
        LAZY IMAGE FADE-IN
    =====================================*/

    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "scale(1)";

                observer.unobserve(entry.target);

            }

        });

    });

    images.forEach(img => {

        img.style.opacity = "0";
        img.style.transform = "scale(.95)";
        img.style.transition = "all .6s ease";

        if (img.complete) {
            img.style.opacity = "1";
            img.style.transform = "scale(1)";
        } else {
            imageObserver.observe(img);
        }

    });

    /*=====================================
        BUTTON RIPPLE EFFECT
    =====================================*/

    const buttons = document.querySelectorAll(
        ".primary-btn, .secondary-btn, .btn-nav"
    );

    buttons.forEach(button => {

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            ripple.style.width = ripple.style.height = `${diameter}px`;

            ripple.style.left =
                `${e.clientX - this.getBoundingClientRect().left - diameter / 2}px`;

            ripple.style.top =
                `${e.clientY - this.getBoundingClientRect().top - diameter / 2}px`;

            ripple.style.position = "absolute";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,.35)";
            ripple.style.transform = "scale(0)";
            ripple.style.animation = "ripple .6s linear";
            ripple.style.pointerEvents = "none";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*=====================================
        PERFORMANCE
    =====================================*/

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            console.log("Layout updated.");

        }, 250);

    });

    /*=====================================
        CURRENT YEAR
    =====================================*/

    const year = document.querySelector("#year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    /*=====================================
        PAGE FADE-IN
    =====================================*/

    document.body.style.opacity = "0";
    document.body.style.transition = "opacity .7s ease";

    requestAnimationFrame(() => {

        document.body.style.opacity = "1";

    });

    /*=====================================
        RIPPLE KEYFRAMES
    =====================================*/

    const style = document.createElement("style");

    style.innerHTML = `
        @keyframes ripple{
            to{
                transform:scale(4);
                opacity:0;
            }
        }
    `;

    document.head.appendChild(style);

    /*=====================================
        CONSOLE MESSAGE
    =====================================*/

    console.log("%cOmni Graphix",
        "color:#1E88E5;font-size:22px;font-weight:bold;"
    );

    console.log("%cCreative Design Agency Website Loaded Successfully.",
        "color:#ffffff;background:#1E88E5;padding:6px 10px;border-radius:4px;"
    );

});