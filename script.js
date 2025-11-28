// Бургер и мобильное меню
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--active');
    const isOpen = mobileNav.style.display === 'flex';
    mobileNav.style.display = isOpen ? 'none' : 'flex';
    document.body.style.overflow = isOpen ? '' : 'hidden';
});

// Закрывать мобильное меню по клику на ссылку
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
        burgerBtn.classList.remove('burger--active');
        document.body.style.overflow = '';
    });
});

// Плавный скролл для всех ссылок-якорей (главное меню)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Модальное окно "Записаться" из карточек услуг
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalServiceButtons = document.querySelectorAll('.js-open-modal');

modalServiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceName = btn.dataset.service;
        modalTitle.textContent = `Записаться: ${serviceName}`;
        modal.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

// Фейковая отправка форм (просто alert вместо реального сервера)
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

document.getElementById('modalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Заявка отправлена! Мастер свяжется с вами для уточнения времени.');
    this.reset();
    closeModal();
});
