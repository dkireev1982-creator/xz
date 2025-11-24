const switchButtons = document.querySelectorAll('.switch-btn');


const imagePaths = {
    oge: [
        './img/react.svg',
        './img/react2.svg', 
        './img/react3.svg'
    ],
    ege: [
        './img/zx.svg',
        './img/q1.svg',
        './img/cv.svg'
    ]
};

switchButtons.forEach(button => {
    button.onclick = function() {
        const hF = document.querySelector('.hFirst');
        const hS = document.querySelector('.hSecond');
        const h2Elements = document.querySelectorAll('.h2');
        const images = document.querySelectorAll('.card img');

        if (this === hF && !hF.classList.contains('active')) {
            hF.classList.add('active');
            hF.classList.remove('unactive');
            hS.classList.remove('active');
            hS.classList.add('unactive');
            
            
            updateImages('oge');
            updateText('ОГЭ ТЕХНО');
            updateH2Color('oge'); 
        }
        else if (this === hS && !hS.classList.contains('active')) {
            hS.classList.add('active');
            hS.classList.remove('unactive');
            hF.classList.remove('active');
            hF.classList.add('unactive');
            
            
            updateImages('ege');
            updateText('ЕГЭ ТЕХНО');
            updateH2Color('ege'); 
        }
    }
});

function updateImages(mode) {
    const images = document.querySelectorAll('.card img');
    images.forEach((img, index) => {
        img.src = imagePaths[mode][index];
    });
}

function updateText(text) {
    const h2Elements = document.querySelectorAll('.h2');
    h2Elements.forEach(h2 => {
        h2.textContent = text;
    });
}


function updateH2Color(mode) {
    const h2Elements = document.querySelectorAll('.h2');
    h2Elements.forEach(h2 => {
        if (mode === 'oge') {
            h2.style.color = '#0019ff'; 
        } else {
            h2.style.color = '#7C3AED'; 
        }
    });
}



 document.addEventListener('DOMContentLoaded', function() {
            const accordionItems = document.querySelectorAll('.accordion-item');
            
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                
                header.addEventListener('click', function() {
                    // Закрываем все остальные элементы
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Переключаем текущий элемент
                    item.classList.toggle('active');
                });
            });

            // Авто-открытие первого активного элемента
            const activeItem = document.querySelector('.accordion-item.active');
            if (activeItem) {
                setTimeout(() => {
                    activeItem.classList.add('active');
                }, 1000);
            }
        });





  // Advanced Scroll Animations with Physics
class AdvancedScrollAnimator {
    constructor() {
        this.elements = new Map();
        this.scrollY = 0;
        this.lastScrollY = 0;
        this.direction = 'down';
        this.rafId = null;
        this.init();
    }

    init() {
        this.gatherElements();
        this.setupScrollListener();
        this.setInitialStates();
        this.animate();
    }

    gatherElements() {
        const selectors = [
            '.hero--info',
            '.benefits__item', 
            '.cards-section .switch',
            '.cards-section .cards-block .card',
            '.fourth-section .map-block .circle',
            '.fourth-section .map-block p',
            '.accordion-item'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                const id = `${selector}-${index}`;
                this.elements.set(element, {
                    id,
                    inView: false,
                    progress: 0,
                    direction: this.getRandomDirection(),
                    delay: index * 0.1,
                    distance: 50 + Math.random() * 50
                });
            });
        });
    }

    getRandomDirection() {
        const directions = [
            { x: 0, y: 1 },    
            { x: 0, y: -1 },     
            { x: 1, y: 0 },    
            { x: -1, y: 0 },   
            { x: 0.7, y: 0.7 }, 
            { x: -0.7, y: 0.7 } 
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    setupScrollListener() {
        let ticking = false;
        
        const updateScroll = () => {
            this.scrollY = window.scrollY;
            this.direction = this.scrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = this.scrollY;

            if (!ticking) {
                this.rafId = requestAnimationFrame(() => {
                    this.updateElements();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', updateScroll, { passive: true });
    }

    setInitialStates() {
        this.elements.forEach((data, element) => {
            const { direction, distance } = data;
            const translateX = direction.x * distance;
            const translateY = direction.y * distance;
            
            element.style.opacity = '0';
            element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            element.style.transition = 'none';
            element.style.willChange = 'transform, opacity';
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const threshold = 0.15;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    }

    calculateProgress(rect) {
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        
      
        const visiblePart = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const progress = visiblePart / elementHeight;
        
        return Math.max(0, Math.min(1, progress));
    }

    updateElements() {
        this.elements.forEach((data, element) => {
            const rect = element.getBoundingClientRect();
            const isInView = this.isElementInViewport(element);
            const progress = this.calculateProgress(rect);
            
            if (isInView && !data.inView) {
                
                this.animateElementIn(element, data);
            } else if (!isInView && data.inView && this.direction === 'up') {
               
                this.animateElementOut(element, data);
            } else if (isInView) {
               
                this.updateElementProgress(element, data, progress);
            }
            
            data.inView = isInView;
            data.progress = progress;
        });
    }

    animateElementIn(element, data) {
        const { direction, distance, delay } = data;
        
        element.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s,
                                   transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0)';
        }, 10);
    }

    animateElementOut(element, data) {
        const { direction, distance } = data;
        const translateX = direction.x * distance * 0.6;
        const translateY = direction.y * distance * 0.6;
        
        element.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                                   transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        
        element.style.opacity = '0';
        element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }

    updateElementProgress(element, data, progress) {
       
        if (element.classList.contains('cards-section .cards-block .card')) {
            const scale = 0.95 + (progress * 0.05);
            element.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
        }
    }

    animate() {
     
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const animator = new AdvancedScrollAnimator();
    
  
    window.addEventListener('beforeunload', () => {
        animator.destroy();
    });
});





// Функция для переключения между курсами ОГЭ и ЕГЭ
function initCourseSwitch() {
    const tabs = document.querySelectorAll('.switch-tab');
    const courseSelections = document.querySelectorAll('.course-selection');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс к текущей вкладке
            tab.classList.add('active');
            
            // Получаем тип курса из data-атрибута
            const courseType = tab.getAttribute('data-course');
            
            // Скрываем все выборы курсов
            courseSelections.forEach(selection => {
                selection.classList.remove('active');
            });
            
            // Показываем соответствующий выбор курса
            const activeSelection = document.querySelector(`[data-course-type="${courseType}"]`);
            if (activeSelection) {
                activeSelection.classList.add('active');
            }
        });
    });
}







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