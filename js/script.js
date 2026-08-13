document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.top-nav a');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (current && href && href.includes(current)) {
                link.classList.add("active");
            }
        });
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const btnEn = document.getElementById('btn-en');
    const btnFr = document.getElementById('btn-fr');
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');

    function setLanguage(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-en][data-fr]').forEach(el => {
            const value = el.getAttribute('data-' + lang);
            if (value !== null) {
                el.innerHTML = value;
            }
        });

        btnEn.classList.toggle('active', lang === 'en');
        btnFr.classList.toggle('active', lang === 'fr');
        localStorage.setItem('lang', lang);
    }

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        btnLight.classList.toggle('active', theme === 'light');
        btnDark.classList.toggle('active', theme === 'dark');
        localStorage.setItem('theme', theme);
    }

    btnEn.addEventListener('click', () => setLanguage('en'));
    btnFr.addEventListener('click', () => setLanguage('fr'));
    btnLight.addEventListener('click', () => setTheme('light'));
    btnDark.addEventListener('click', () => setTheme('dark'));

    const savedLang = localStorage.getItem('lang') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    setLanguage(savedLang);
    setTheme(savedTheme);

    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedEl.textContent = now.toLocaleDateString('en-US', options);
    }
});
