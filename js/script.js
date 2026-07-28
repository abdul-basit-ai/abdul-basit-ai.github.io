/**
 * Abdul Basit - Portfolio Script
 * Handles: 
 * 1. Active Navigation Highlighting 
 * 2. News Scroller Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.top-nav a');
    const sections = document.querySelectorAll('section, header');

    // 1. ACTIVE LINK HIGHLIGHTING
    // This updates the top menu as you scroll to different sections
    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Checks if the user has scrolled into the section
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            // If the section ID matches the link's href, highlight it
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 2. SMOOTH SCROLL FALLBACK
    // Ensures clicking a nav link glides to the section
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only scroll if it's an internal link (starts with #)
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});