// VOSK PLACE – ИНТЕРАКТИВНОСТЬ САЙТА

document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================
    // MOBILE MENU TOGGLE
    // ==============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-list a');

    function openMobileMenu() {
        mobileMenuPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuPanel.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Закрыть меню при клике на ссылку
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Закрыть меню при клике вне панели
    mobileMenuPanel.addEventListener('click', function(e) {
        if (e.target === mobileMenuPanel) {
            closeMobileMenu();
        }
    });

    // Закрыть меню при нажатии ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==============================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==============================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Обновить активный пункт меню
                updateActiveNavItem(href);
            }
        });
    });

    // ==============================
    // ACTIVE NAVIGATION ITEM
    // ==============================
    function updateActiveNavItem(activeHref) {
        document.querySelectorAll('.nav-list a, .mobile-nav-list a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }

    // ==============================
    // HEADER SCROLL EFFECT
    // ==============================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Скрыть/показать header при скролле вниз/вверх
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // Обновить активный пункт меню при скролле
        updateActiveSectionOnScroll();
    });

    // ==============================
    // ANIMATIONS ON SCROLL
    // ==============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдать за секциями и карточками
    document.querySelectorAll('section, .category-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // ==============================
    // LAZY LOADING IMAGES
    // ==============================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ==============================
    // UTILITY FUNCTIONS
    // ==============================
    function updateActiveSectionOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavItem(`#${sectionId}`);
            }
        });
    }

    // ==============================
    // CONTACT LINKS HANDLER
    // ==============================
    document.querySelectorAll('.contact-link, .social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.toLowerCase();
            
            if (text.includes('telegram')) {
                e.preventDefault();
                window.open('tg://resolve?domain=voskplace', '_blank');
            } else if (text.includes('whatsapp')) {
                e.preventDefault();
                window.open('https://wa.me/79810458515', '_blank');
            }
        });
    });

    // ==============================
    // INITIALIZATION
    // ==============================
    // Добавить CSS класс для анимаций
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .header-scrolled {
            box-shadow: 0 4px 20px rgba(42, 40, 36, 0.1);
        }
        
        .nav-list a.active,
        .mobile-nav-list a.active {
            color: var(--color-secondary) !important;
        }
        
        img.loaded {
            opacity: 1;
        }
        
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.5s;
        }
    `;
    document.head.appendChild(style);

    // Установить активный пункт при загрузке
    updateActiveNavItem('#hero');

    console.log('Vosk Place – сайт успешно загружен');
});