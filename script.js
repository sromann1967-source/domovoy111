// ============ БУРГЕР-МЕНЮ ============
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });
});

// ============ МОДАЛЬНОЕ ОКНО ============
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openModalBtns = document.querySelectorAll('.open-modal');

    if (!modalOverlay || !modalClose) return;

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
});

// ============ ЛОГИКА ПОШАГОВОГО ОПРОСНИКА ============
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.quiz-step');
    const progressBar = document.getElementById('quizProgressBar');
    const stepCounter = document.getElementById('quizStepCounter');
    const totalSteps = steps.length;
    let currentStep = 1;

    const updateProgress = () => {
        const percent = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${percent}%`;
        stepCounter.textContent = `Вопрос ${currentStep} из ${totalSteps}`;
    };

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            steps[currentStep - 1].classList.remove('active');
            currentStep++;
            steps[currentStep - 1].classList.add('active');
            updateProgress();
        } else {
            document.getElementById('modalOverlay').classList.add('active');
            document.body.classList.add('modal-open');
        }
    };

    const radioButtons = document.querySelectorAll('.quiz-radio-box input[type="radio"]');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            setTimeout(goToNextStep, 300);
        });
    });

    updateProgress();
});

// ============ НАВИГАЦИЯ ПО ПРОЕКТАМ (СТРЕЛКИ) ============
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('projectsTrack');
    const btnPrev = document.getElementById('projectPrev');
    const btnNext = document.getElementById('projectNext');

    if (!track || !btnPrev || !btnNext) return;

    // Ширина карточки (400px на десктопе, 85vw на мобилке) + отступ 30px
    // Для точности просто прокручиваем на ширину одной карточки
    const scrollAmount = 430; 

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    const updateButtons = () => {
        if (track.scrollLeft === 0) {
            btnPrev.style.opacity = '0.3';
            btnPrev.style.pointerEvents = 'none';
        } else {
            btnPrev.style.opacity = '1';
            btnPrev.style.pointerEvents = 'all';
        }

        if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 5) {
            btnNext.style.opacity = '0.3';
            btnNext.style.pointerEvents = 'none';
        } else {
            btnNext.style.opacity = '1';
            btnNext.style.pointerEvents = 'all';
        }
    };

    track.addEventListener('scroll', updateButtons);
    updateButtons();
});

// ============ НАВИГАЦИЯ ПО ОТЗЫВАМ (СТРЕЛКИ) ============
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('reviewsTrack');
    const btnPrev = document.getElementById('reviewPrev');
    const btnNext = document.getElementById('reviewNext');

    if (!track || !btnPrev || !btnNext) return;

    const scrollAmount = 340; // 320px карточка + 20px отступ

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    const updateButtons = () => {
        if (track.scrollLeft === 0) {
            btnPrev.style.opacity = '0.3';
            btnPrev.style.pointerEvents = 'none';
        } else {
            btnPrev.style.opacity = '1';
            btnPrev.style.pointerEvents = 'all';
        }

        if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 5) {
            btnNext.style.opacity = '0.3';
            btnNext.style.pointerEvents = 'none';
        } else {
            btnNext.style.opacity = '1';
            btnNext.style.pointerEvents = 'all';
        }
    };

    track.addEventListener('scroll', updateButtons);
    updateButtons();
});

// ============ РЕГИСТРАЦИЯ SERVICE WORKER (ОФЛАЙН-СТРАНИЦА) ============
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('ServiceWorker успешно зарегистрирован. Область: ', registration.scope);
        }).catch(err => {
            console.log('Ошибка регистрации ServiceWorker: ', err);
        });
    });
}
