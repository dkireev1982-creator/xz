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




document.addEventListener('DOMContentLoaded', function() {
    const courseButtons = document.querySelectorAll('.select-course-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseType = this.getAttribute('data-course');
            const courseName = courseType === 'oge' ? 'ОГЭ' : 'ЕГЭ';
            
            // Показываем подтверждение выбора
            if (confirm(`Вы выбрали подготовку к ${courseName}. Перейти к оформлению?`)) {
                // Здесь можно добавить переход к форме заявки
                window.location.href = `application.html?course=${courseType}`;
            }
        });
    });
    
    // Анимация появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации появления
    document.querySelectorAll('.course-option, .advantage-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.courses-hero__info img');
    const glows = document.querySelectorAll('.image-glow');
    
    // Убираем параллакс если он вызывает проблемы, оставляем только hover
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.animation = 'imageFloat 3s ease-in-out infinite';
            this.style.transform = 'scale(1.03)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.animation = 'imageFloat 4s ease-in-out 1.5s infinite';
            this.style.transform = 'scale(1)';
        });
    }
    
    // Эффект наведения на кнопку
    const heroBtn = document.querySelector('.courses-hero__btn');
    if (heroBtn) {
        heroBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-0.25rem) scale(1.05)';
        });
        
        heroBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});






class ScrollCounter {
    constructor() {
        this.counters = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.getCounters();
        this.setupObserver();
    }
    
    getCounters() {
        const counterElements = document.querySelectorAll('.stat-number');
        counterElements.forEach(counter => {
            this.counters.push({
                element: counter,
                target: parseInt(counter.getAttribute('data-target')),
                counted: false,
                current: 0
            });
        });
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCounting();
                } else {
                    this.resetCounters();
                }
            });
        }, { 
            threshold: 0.6,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            this.observer.observe(statsSection);
        }
    }
    
    resetCounters() {
        this.counters.forEach(counter => {
            counter.counted = false;
            counter.current = 0;
            counter.element.textContent = '0';
            counter.element.classList.remove('counting');
        });
    }
    
    startCounting() {
        this.counters.forEach((counter, index) => {
            if (!counter.counted) {
                setTimeout(() => {
                    this.animateCounterWithEase(counter);
                }, index * 400);
            }
        });
    }
    
    animateCounterWithEase(counter) {
        const element = counter.element;
        const target = counter.target;
        const duration = 2000;
        let startTime = null;
        
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        
        const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            // Замедление в последних 30%
            let currentProgress = progress;
            if (progress > 0.7) {
                const slowDownFactor = 0.3;
                currentProgress = 0.7 + (progress - 0.7) * slowDownFactor;
            }
            
            const currentValue = Math.floor(easedProgress * target);
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.classList.add('counting');
                counter.counted = true;
                counter.current = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    new ScrollCounter();
});










console.log('🕒 Таймер ОГЭ запускается...');

function startTimer() {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    console.log('Найдены элементы:', days, hours, minutes, seconds);
    
    if (!days || !hours || !minutes || !seconds) {
        console.log('❌ Элементы не найдены, пробуем снова...');
        setTimeout(startTimer, 100);
        return;
    }
    
    console.log('✅ Таймер запущен!');
    
    // Устанавливаем дату на 26 дней вперед от текущей даты
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 26);
    examDate.setHours(0, 0, 0, 0);
    
    console.log('Дата экзамена:', examDate);
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = examDate - now;
        
        console.log('Осталось времени:', timeLeft);
        
        if (timeLeft > 0) {
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            days.textContent = daysLeft.toString().padStart(2, '0');
            hours.textContent = hoursLeft.toString().padStart(2, '0');
            minutes.textContent = minutesLeft.toString().padStart(2, '0');
            seconds.textContent = secondsLeft.toString().padStart(2, '0');
            
            console.log(`Осталось: ${daysLeft}д ${hoursLeft}ч ${minutesLeft}м ${secondsLeft}с`);
        } else {
            // Время вышло
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            console.log('⏰ Время вышло!');
        }
    }
    
    // Запускаем сразу и каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Запускаем таймер
startTimer();





document.addEventListener('DOMContentLoaded', function() {
    const points = {
        math: 0,
        physics: 0,
        chemistry: 0,
        biology: 0,
        russian: 0,
        social: 0
    };

    const steps = document.querySelectorAll('.test-step');
    const options = document.querySelectorAll('.test-option');
    const progressFill = document.getElementById('testProgressFill');
    const progressText = document.getElementById('testProgressText');
    const resultSubject = document.getElementById('testResultSubject');
    const restartBtn = document.getElementById('testRestartBtn');
    const chooseBtn = document.getElementById('testChooseBtn');

    let currentStep = 0;

    const subjects = {
        math: {
            name: 'Математика',
            desc: 'Точные науки и вычисления',
            color: '#0019FF'
        },
        physics: {
            name: 'Физика',
            desc: 'Законы природы и явления',
            color: '#7C3AED'
        },
        chemistry: {
            name: 'Химия',
            desc: 'Вещества и реакции',
            color: '#7700FF'
        },
        biology: {
            name: 'Биология',
            desc: 'Живые организмы и природа',
            color: '#00C851'
        },
        russian: {
            name: 'Русский язык',
            desc: 'Грамотность и тексты',
            color: '#FF6B6B'
        },
        social: {
            name: 'Обществознание',
            desc: 'Общество и право',
            color: '#FFA726'
        }
    };

    function updateProgress() {
        const progress = ((currentStep + 1) / 3) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${currentStep + 1} из 3`;
    }

    function goToStep(stepIndex) {
        steps.forEach(step => step.classList.remove('active'));
        steps[stepIndex].classList.add('active');
        currentStep = stepIndex;
        updateProgress();
    }

    function calculateResult() {
        let maxPoints = 0;
        let bestSubject = 'math';
        
        for (const subject in points) {
            if (points[subject] > maxPoints) {
                maxPoints = points[subject];
                bestSubject = subject;
            }
        }
        
        if (maxPoints === 0) {
            bestSubject = 'math';
        }
        
        const subject = subjects[bestSubject];
        resultSubject.innerHTML = `
            <div class="test-subject-name" style="color: ${subject.color}">${subject.name}</div>
            <div class="test-subject-desc">${subject.desc}</div>
        `;
    }

    options.forEach(option => {
        option.addEventListener('click', function() {
            const pointsToAdd = this.getAttribute('data-points').split('-');
            pointsToAdd.forEach(subject => {
                if (points[subject] !== undefined) {
                    points[subject]++;
                }
            });
            
            if (currentStep < 2) {
                goToStep(currentStep + 1);
            } else {
                calculateResult();
                goToStep(3);
            }
        });
    });

    restartBtn.addEventListener('click', function() {
        for (const subject in points) {
            points[subject] = 0;
        }
        goToStep(0);
    });

    chooseBtn.addEventListener('click', function() {
        const subjectName = resultSubject.querySelector('.test-subject-name').textContent;
        alert(`Отлично! Вы выбрали "${subjectName}". Переходите к курсам подготовки!`);
    });

    updateProgress();
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