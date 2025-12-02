document.addEventListener('DOMContentLoaded', function() {
            // Обработчик бургер-меню
            const burgerButton = document.querySelector('.burger-button');
            const mobileMenu = document.querySelector('.mobile-menu');
            const header = document.querySelector('.first-section header');
            
            if (burgerButton && mobileMenu && header) {
                burgerButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    mobileMenu.classList.toggle('active');
                    burgerButton.classList.toggle('active');
                    header.classList.toggle('menu-opened');
                    
                    // Синхронизируем класс scrolled с мобильным меню
                    if (header.classList.contains('scrolled')) {
                        mobileMenu.classList.add('scrolled');
                    } else {
                        mobileMenu.classList.remove('scrolled');
                    }
                });
                
                // Закрытие меню при клике на ссылки
                document.querySelectorAll('.mobile-nav-link, .mobile-application-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        closeMenu();
                    });
                });
                
                // Закрытие меню при клике вне области
                document.addEventListener('click', function(event) {
                    if (!event.target.closest('.burger-button') && 
                        !event.target.closest('.mobile-menu') &&
                        mobileMenu.classList.contains('active')) {
                        closeMenu();
                    }
                });
                
                function closeMenu() {
                    mobileMenu.classList.remove('active');
                    burgerButton.classList.remove('active');
                    header.classList.remove('menu-opened');
                    mobileMenu.classList.remove('scrolled');
                }
            }

            // Функция для обработки прокрутки
            function handleHeaderScroll() {
                const header = document.querySelector('.first-section header');
                const mobileMenu = document.querySelector('.mobile-menu');
                if (!header) return;
                
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    header.classList.add('scrolled');
                    // Если меню открыто, добавляем класс scrolled к мобильному меню
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.add('scrolled');
                    }
                } else {
                    header.classList.remove('scrolled');
                    mobileMenu.classList.remove('scrolled');
                }
            }

            // Оптимизация производительности с помощью requestAnimationFrame
            let ticking = false;
            function updateHeader() {
                handleHeaderScroll();
                ticking = false;
            }

            function onScroll() {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }

            // Добавляем обработчик прокрутки
            window.addEventListener('scroll', onScroll, { passive: true });
            
            // Инициализируем состояние при загрузке
            handleHeaderScroll();
        });

        function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Или с проверкой на главную страницу
document.addEventListener('DOMContentLoaded', function() {
    const logoLink = document.querySelector('.logo-link');
    
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            // Если мы на главной странице
            if (window.location.pathname === '/' || 
                window.location.pathname.includes('index.html')) {
                e.preventDefault();
                
                // Плавная прокрутка к верху
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            // Если не на главной - переход на главную произойдет по ссылке
        });
    }
});




document.getElementById('exam-input').addEventListener('input', function(e) {
    // Неправильная валидация, которая блокирует выбор
    if (e.target.value !== 'ОГЭ' && e.target.value !== 'ЕГЭ') {
        e.target.value = ''; // Сбрасывает значение
    }
});





document.addEventListener('DOMContentLoaded', function() {
            console.log('Скрипт запущен');
            
            // Находим все прогресс-бары
            const progressFills = document.querySelectorAll('.progress-fill');
            console.log('Найдено прогресс-баров:', progressFills.length);
            
            // Проверяем начальное состояние прогресс-баров
            progressFills.forEach((fill, index) => {
                console.log(`Прогресс-бар ${index}:`, {
                    element: fill,
                    computedStyle: window.getComputedStyle(fill),
                    clipPath: window.getComputedStyle(fill).clipPath
                });
            });
            
            // Создаем Intersection Observer для анимации при скролле
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('Секция видима, запускаем анимацию прогресс-баров');
                        
                        // Сначала сбрасываем все прогресс-бары (скрываем)
                        progressFills.forEach(fill => {
                            fill.style.clipPath = 'inset(0 100% 0 0)';
                        });
                        
                        // Затем запускаем анимацию
                        setTimeout(() => {
                            progressFills.forEach((fill, index) => {
                                setTimeout(() => {
                                    const progress = fill.getAttribute('data-progress');
                                    console.log(`Анимируем прогресс-бар ${index} до ${progress}`);
                                    
                                    if (progress) {
                                        // Рассчитываем процент для clip-path
                                        const percentage = (1 - parseFloat(progress)) * 100;
                                        
                                        // Добавляем класс для анимации
                                        fill.classList.add('animated');
                                        
                                        // Устанавливаем окончательное состояние
                                        setTimeout(() => {
                                            fill.style.clipPath = `inset(0 ${percentage}% 0 0)`;
                                        }, 10);
                                    }
                                }, index * 300); // Задержка между каждым прогресс-баром
                            });
                        }, 100);
                        
                        // Прекращаем наблюдение после анимации
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Начинаем наблюдение за секцией
            const resultsSection = document.querySelector('.results-section');
            if (resultsSection) {
                observer.observe(resultsSection);
                console.log('Начато наблюдение за секцией');
            }
            
            // Фоллбэк: если секция видна при загрузке, анимируем сразу
            setTimeout(() => {
                const rect = resultsSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (isVisible) {
                    console.log('Секция видна при загрузке, запускаем анимацию');
                    
                    // Сбрасываем прогресс-бары
                    progressFills.forEach(fill => {
                        fill.style.clipPath = 'inset(0 100% 0 0)';
                    });
                    
                    // Анимируем
                    setTimeout(() => {
                        progressFills.forEach((fill, index) => {
                            setTimeout(() => {
                                const progress = fill.getAttribute('data-progress');
                                if (progress) {
                                    const percentage = (1 - parseFloat(progress)) * 100;
                                    fill.classList.add('animated');
                                    setTimeout(() => {
                                        fill.style.clipPath = `inset(0 ${percentage}% 0 0)`;
                                    }, 10);
                                }
                            }, index * 300);
                        });
                    }, 100);
                }
            }, 1000);
        });