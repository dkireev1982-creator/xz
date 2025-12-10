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

 














  const companyModal = document.getElementById('companyModal');
        const closeModalBtn = document.getElementById('closeModal');
        const enrollmentForm = document.getElementById('enrollmentForm');
        const successMessage = document.getElementById('successMessage');
        const closeSuccessBtn = document.getElementById('closeSuccess');
        
        // Обработчик для всех кнопок с классом open-company-modal
        document.addEventListener('DOMContentLoaded', function() {
            // Открытие модального окна
            document.querySelectorAll('.open-company-modal').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    companyModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Закрытие модального окна
            closeModalBtn.addEventListener('click', closeModal);
            
            // Закрытие при клике на фон
            companyModal.addEventListener('click', (e) => {
                if (e.target === companyModal) {
                    closeModal();
                }
            });
            
            // Закрытие при нажатии ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && companyModal.classList.contains('active')) {
                    closeModal();
                }
            });
            
            // Обработка отправки формы
            enrollmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Валидация формы
                const childName = document.getElementById('childName').value;
                const parentPhone = document.getElementById('parentPhone').value;
                const examType = document.querySelector('input[name="examType"]:checked');
                const subject = document.getElementById('subject').value;
                const grade = document.getElementById('grade').value;
                const format = document.getElementById('format').value;
                
                if (!childName || !parentPhone || !examType || !subject || !grade || !format) {
                    alert('Ваши данные успешно доставлены ');
                    return;
                }
                
                // Имитация отправки формы
                console.log('Данные формы:', {
                    childName,
                    parentPhone,
                    examType: examType.value,
                    subject,
                    grade,
                    format
                });
                
                // Показываем сообщение об успехе
                enrollmentForm.style.display = 'none';
                successMessage.style.display = 'flex';
            });
            
            // Закрытие сообщения об успехе
            closeSuccessBtn.addEventListener('click', () => {
                closeModal();
                // Сбрасываем форму и показываем её снова
                enrollmentForm.reset();
                enrollmentForm.style.display = 'flex';
                successMessage.style.display = 'none';
            });
            
            // Функция закрытия модального окна
            function closeModal() {
                companyModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Маска для номера телефона
            document.getElementById('parentPhone').addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            });
            
            // Валидация имени
            document.getElementById('childName').addEventListener('input', function(e) {
                this.value = this.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
            });
            
            // Автоматический выбор класса при выборе ОГЭ/ЕГЭ
            document.querySelectorAll('input[name="examType"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const gradeSelect = document.getElementById('grade');
                    if (this.value === 'oge') {
                        gradeSelect.innerHTML = `
                            <option value="" disabled selected>Выберите класс</option>
                            <option value="9">9 класс</option>
                        `;
                    } else if (this.value === 'ege') {
                        gradeSelect.innerHTML = `
                            <option value="" disabled selected>Выберите класс</option>
                            <option value="10">10 класс</option>
                            <option value="11">11 класс</option>
                        `;
                    }
                });
            });
        });