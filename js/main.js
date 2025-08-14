document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        langButtons: document.querySelectorAll('.language-switcher button'),
        accordions: document.querySelectorAll('.accordion-section'),
        navLinks: document.querySelectorAll('.main-nav ul li a'),
        mainHeader: document.getElementById('mainHeader'),
        currentYearElement: document.getElementById('currentYear'),
        backHomeBtn: document.getElementById('backHomeBtn')
    };
    if (elements.currentYearElement) {
        elements.currentYearElement.textContent = new Date().getFullYear();
    }
    if (elements.backHomeBtn) {
        elements.backHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    function applyTranslations(lang) {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        const favicon = document.getElementById("dynamic-favicon");
        if (favicon) {
            let iconFile = "favicon.ico";
            if (lang === "ar") {
                iconFile = "favicon-ar.ico";
            }
            favicon.href = "images/" + iconFile;
        }
        const t = window.translations;
        if (!t) return;
        requestAnimationFrame(() => {
            const metaTags = {
                'pageTitle': 'meta-title',
                'description': 'meta-description',
                'ogTitle': 'og-title',
                'ogDesc': 'og-description',
                'ogImageAlt': 'og-image-alt'
            };
            for (const id in metaTags) {
                const element = document.getElementById(id) || document.querySelector(`meta[name="${id}"]`) || document.querySelector(`meta[property="${id}"]`);
                if (element && t[metaTags[id]]) {
                    element.textContent = t[metaTags[id]];
                }
            }
            const titleElement = document.getElementById('pageTitle');
            if (titleElement && t['meta-title']) {
                titleElement.textContent = t['meta-title'];
            }
            document.querySelectorAll('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (t[key]) {
                    el.textContent = t[key];
                }
            });
            document.querySelectorAll('.certificate-icon, .education-icon, .language-icon').forEach(img => {
                const imgKey = img.getAttribute('data-lang-src');
                if (imgKey && t[imgKey]) {
                    img.src = t[imgKey];
                }
            });
            const profileImage = document.getElementById('profileImage');
            if (profileImage) {
                const newSrc = profileImage.getAttribute(`data-lang-${lang}`);
                if (newSrc) {
                    profileImage.src = newSrc;
                }
            }
            updateDownloadButton(lang);
            localStorage.setItem('preferredLanguage', lang);
            adjustBodyPadding();
        });
    }
    function loadLanguage(lang) {
        const script = document.createElement('script');
        script.src = `lang/${lang}.js`;
        script.onload = () => {
            console.log(`✅ Loaded language file: ${lang}.js`);
            applyTranslations(lang);
        };
        script.onerror = () => {
            console.error(`❌ Failed to load lang/${lang}.js`);
        };
        document.head.appendChild(script);
    }
    function updateDownloadButton(lang) {
        const downloadBtn = document.querySelector('.download-cv-btn');
        const t = window.translations;
        if (downloadBtn && t) {
            const filePath = t[`cv-filename-${lang}`] || downloadBtn.dataset[`lang${lang.charAt(0).toUpperCase()}${lang.slice(1)}`];
            if (filePath) {
                downloadBtn.href = filePath;
            }
            if (t['download-cv-btn']) {
                downloadBtn.textContent = t['download-cv-btn'];
            }
        }
    }
    elements.langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            elements.langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadLanguage(selectedLang);
        });
    });
    elements.accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');
        const shortDescription = accordion.querySelector('.short-description');
        const toggleAccordion = () => {
            const isActive = accordion.classList.contains('active');
            elements.accordions.forEach(acc => {
                if (acc !== accordion) {
                    acc.classList.remove('active');
                    acc.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            accordion.classList.toggle('active');
            header.setAttribute('aria-expanded', String(!isActive));
            content.style.maxHeight = !isActive ? `${content.scrollHeight}px` : null;
            if (!isActive) {
                setTimeout(() => {
                    accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };
        if (header) {
            header.addEventListener('click', toggleAccordion);
            header.addEventListener('keypress', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion();
                }
            });
        }
        if (shortDescription) {
            shortDescription.addEventListener('click', toggleAccordion);
            shortDescription.addEventListener('keypress', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion();
                }
            });
        }
    });
    const adjustBodyPadding = () => {
        if (elements.mainHeader) {
            const headerHeight = elements.mainHeader.offsetHeight;
            document.body.style.paddingTop = `${headerHeight + 10}px`;
            document.documentElement.style.scrollPaddingTop = `${headerHeight + 10}px`;
        }
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                elements.navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { threshold: 0.5 });
    elements.accordions.forEach(section => observer.observe(section));
    const initLang = localStorage.getItem('preferredLanguage') || 'en';
    const activeBtn = document.querySelector(`.language-switcher button[data-lang="${initLang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    loadLanguage(initLang);
    window.addEventListener('resize', adjustBodyPadding);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    window.addEventListener('scroll', () => {
        if (window.location.hash) {
            history.replaceState(null, null, ' ');
        }
    });
});