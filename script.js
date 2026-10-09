
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (hamburgerBtn && navLinks) {
        const toggleMenu = (open) => {
            const isOpen = typeof open === "boolean" ? open : !navLinks.classList.contains("active");
            navLinks.classList.toggle("active", isOpen);
            hamburgerBtn.setAttribute("aria-expanded", isOpen.toString());

            const icon = hamburgerBtn.querySelector("i");
            if (icon) {
                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        };

        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when a navigation link is clicked
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                if (navLinks.classList.contains("active")) {
                    toggleMenu(false);
                }
            }
        });

        // Close menu if window is resized past mobile breakpoint
        window.addEventListener("resize", () => {
            if (window.innerWidth > 920 && navLinks.classList.contains("active")) {
                toggleMenu(false);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Testimonial Carousel Controls
    // ----------------------------------------------------------------------
    const slides = document.querySelectorAll(".testimonial-carousel-slides");
    const rightButton = document.querySelector(".right-btn");
    const leftButton = document.querySelector(".left-btn");

    if (slides.length > 0 && rightButton && leftButton) {
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide) => slide.classList.remove("active"));
            slides[index].classList.add("active");
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        rightButton.addEventListener("click", nextSlide);
        leftButton.addEventListener("click", prevSlide);

        // Keyboard navigation for accessibility
        document.addEventListener("keydown", (e) => {
            const carousel = document.querySelector(".testimonial-carousel");
            if (carousel && carousel.getBoundingClientRect().top < window.innerHeight && carousel.getBoundingClientRect().bottom > 0) {
                if (e.key === "ArrowRight") {
                    nextSlide();
                } else if (e.key === "ArrowLeft") {
                    prevSlide();
                }
            }
        });
    }
});