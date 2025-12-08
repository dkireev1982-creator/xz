// JavaScript для работы модальных окон лицензий
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.license-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlay = document.querySelectorAll('.modal-overlay');
    
    // Открытие модального окна
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // Закрываем все открытые модальные окна
                modals.forEach(m => m.classList.remove('active'));
                
                // Открываем нужное модальное окно
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
                
                // Добавляем класс для анимации
                setTimeout(() => {
                    modal.querySelector('.modal-container').classList.add('animate-in');
                }, 10);
            }
        });
    });
    
    // Закрытие модального окна при клике на крестик
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.license-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Закрытие модального окна при клике на оверлей
    overlay.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.license-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.license-modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    // Функция закрытия модального окна
    function closeModal(modal) {
        modal.querySelector('.modal-container').classList.remove('animate-in');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Возвращаем скролл страницы
    }
    
    // Обработка кнопки скачивания
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const fileName = this.getAttribute('data-download');
            const modalTitle = this.closest('.license-modal').querySelector('.modal-title').textContent;
            
            // Показываем уведомление о скачивании
            showDownloadNotification(modalTitle);
            
            // В реальном проекте здесь будет:
            // window.location.href = `/documents/${fileName}`;
            
            // Для демо просто показываем уведомление
            console.log(`Скачивание файла: ${fileName}`);
        });
    });
    
    // Функция показа уведомления о скачивании
    function showDownloadNotification(title) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                    <strong>Документ готов к скачиванию</strong>
                    <p>${title}</p>
                </div>
            </div>
        `;
        
        // Добавляем стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            border-left: 4px solid #10B981;
            z-index: 2000;
            max-width: 350px;
            animation: slideIn 0.3s ease-out;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
        `;
        
        // Добавляем уведомление на страницу
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Добавляем стили для анимации уведомления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Обработка клика на карточке лицензии (открытие модального окна)
    const licenseCards = document.querySelectorAll('.license-card');
    licenseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Открываем модальное окно только если кликнули не на кнопке
            if (!e.target.closest('.license-btn')) {
                const licenseId = this.getAttribute('data-license');
                const modalButton = this.querySelector('.open-modal-btn');
                if (modalButton) {
                    modalButton.click();
                }
            }
        });
    });
});

























document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-btn');
    const partnerCards = document.querySelectorAll('.partner-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Показываем/скрываем карточки в зависимости от категории
            partnerCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    card.style.opacity = '0';
                    card.style.animationDelay = '0.1s';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Обработчики для кнопок "Кейс"
    const partnerBtns = document.querySelectorAll('.partner-btn');
    partnerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const partnerName = this.closest('.partner-card').querySelector('.partner-name').textContent;
            alert(`Открывается кейс по сотрудничеству с ${partnerName}`);
            // Здесь можно добавить логику открытия модального окна или перехода на страницу кейса
        });
    });
    
    // Пауза анимации карусели при наведении
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }
});