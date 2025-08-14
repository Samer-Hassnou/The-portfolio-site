 

  
// main-p.js  

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        langButtons: document.querySelectorAll('.language-switcher button'),
        accordions: document.querySelectorAll('.accordion-section'),
        navLinks: document.querySelectorAll('.main-nav ul li a'),
        mainHeader: document.getElementById('mainHeader'),
        currentYearElement: document.getElementById('currentYear'),
        backHomeBtn: document.getElementById('backHomeBtn') 
    
    
    };

    
    // سنة التذييل
    if (elements.currentYearElement) {
        elements.currentYearElement.textContent = new Date().getFullYear();
    }

   if (elements.backHomeBtn) {
    elements.backHomeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

    // تطبيق الترجمة من window.translations
    function applyTranslations(lang) {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';


         const favicon = document.getElementById("dynamic-favicon");
    if (favicon) {
        let iconFile = "favicon.ico"; // default
        if (lang === "ar") iconFile = "favicon-ar.ico";
        else if (lang === "de") iconFile = "favicon.ico";
        favicon.href = "../images/" + iconFile;
    }


       


            const t = window.translations;
            if (!t) return;
         requestAnimationFrame(() => {
            
            
             // تحديث العنوان
        const titleElement = document.getElementById('pageTitle');
           if (titleElement && t['meta-title']) titleElement.textContent = t['meta-title'];

            // meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && t['meta-description']) metaDesc.content = t['meta-description'];
            
        const ogDesc = document.getElementById('ogDesc');
        if (ogDesc && t['og-description']) {
            ogDesc.content = t['og-description'];
        }

const ogTitle = document.getElementById('ogTitle');
     
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    
    if (ogTitle && t['og-title']) ogTitle.content = t['og-title'];
    if (ogDesc && t['og-description']) ogDesc.content = t['og-description'];
    if (ogImageAlt && t['og-image-alt']) ogImageAlt.content = t['og-image-alt'];




 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // قم بإزالة الهاش بعد فترة قصيرة من بدء التمرير
        setTimeout(() => {
            history.replaceState(null, null, ' ');
        }, 1000); // 1000 ميلي ثانية = 1 ثانية
    });
});




            // صورة البروفايل حسب اللغة
            const profileImage = document.getElementById('profileImage');
            if (profileImage) {
                const newSrc = profileImage.getAttribute(`data-lang-${lang}`);
                if (newSrc) profileImage.src = newSrc;
            }
            

            // النصوص العامة
            document.querySelectorAll('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (t[key]) el.textContent = t[key];
            });

            // الصور المترجمة (شهادات مثلاً)
            document.querySelectorAll('.certificate-icon, .education-icon, .language-icon').forEach(img => {
                const imgKey = img.getAttribute('data-lang-src');
                if (imgKey && t[imgKey]) img.src = t[imgKey];
            });

            // زر السيرة الذاتية
            updateDownloadButton(lang);

            localStorage.setItem('preferredLanguage', lang);
            adjustBodyPadding();
        });
    }

    // زر تنزيل السيرة الذاتية
    function updateDownloadButton(lang) {
        const downloadBtn = document.querySelector('.download-cv-btn');
        const t = window.translations;
        if (downloadBtn && t) {
            const filePath = downloadBtn.dataset[`lang${lang.charAt(0).toUpperCase()}${lang.slice(1)}`];
            if (filePath) downloadBtn.href = filePath;
            if (t['download-cv-btn']) downloadBtn.textContent = t['download-cv-btn'];
        }
    }

    // إعداد اتجاه النص + الحشو العلوي
    const adjustBodyPadding = () => {
        if (elements.mainHeader) {
            const headerHeight = elements.mainHeader.offsetHeight;
            document.body.style.paddingTop = `${headerHeight + 10}px`;
            document.documentElement.style.scrollPaddingTop = `${headerHeight + 10}px`;
        }
    };

    // تغيير اللغة عند الضغط
    elements.langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            elements.langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadLanguage(selectedLang);
        });
    });
function loadLanguage(lang) {
    const script = document.createElement('script');
    script.src = `assets/${lang}.js`;
    script.onload = () => {
        console.log(`✅ Loaded language file: assets/${lang}.js`);
        applyTranslations(lang);
    };
    script.onerror = () => {
        console.error(`❌ Failed to load assets/${lang}.js`);
    };
    document.head.appendChild(script);
}

    // أكورديون
    elements.accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');
        const shortDescription = accordion.querySelector('.short-description');

        const toggleAccordion = () => {
            const isActive = accordion.classList.contains('active');
            elements.accordions.forEach(acc => {
                if (acc !== accordion) acc.classList.remove('active');
            });

            accordion.classList.toggle('active');
            header.setAttribute('aria-expanded', String(!isActive));
            content.style.maxHeight = !isActive ? `${content.scrollHeight}px` : null;

             // ✅ التمرير بعد الفتح مباشرة ليكون ظاهرًا بالكامل
    if (!isActive) {
        setTimeout(() => {
            accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // تأخير صغير حتى يُفتح أولًا
    }
        };

        if (header) {
            header.addEventListener('click', toggleAccordion);
            header.addEventListener('keypress', e => {
                if (e.key === 'Enter' || e.key === ' ') e.preventDefault(), toggleAccordion();
            });
        }
        if (shortDescription) {
            shortDescription.addEventListener('click', toggleAccordion);
            shortDescription.addEventListener('keypress', e => {
                if (e.key === 'Enter' || e.key === ' ') e.preventDefault(), toggleAccordion();
            });
        }
    });

    // التنقل النشط
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

    // التهيئة
    const initLang = localStorage.getItem('preferredLanguage') || 'en';
    const activeBtn = document.querySelector(`.language-switcher button[data-lang="${initLang}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    loadLanguage(initLang);

    adjustBodyPadding();
    window.addEventListener('resize', adjustBodyPadding);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // يمنع إضافة الهاش للURL
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    if(window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});

 document.querySelectorAll('.project-screenshots img').forEach(img => {
  img.style.cursor = 'zoom-in'; // مؤشر تكبير

  img.addEventListener('click', () => {
    // إنشاء النافذة المنبثقة
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');

    // صورة كبيرة
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt || '';

    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);

    // إغلاق عند الضغط على الخلفية أو الصورة نفسها
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    // منع التمرير عند فتح النافذة
    document.body.style.overflow = 'hidden';

    // إعادة التمرير عند إغلاق النافذة
    overlay.addEventListener('click', () => {
      document.body.style.overflow = '';
    });
  });
});

