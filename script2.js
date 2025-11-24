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