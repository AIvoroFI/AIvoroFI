gsap.registerPlugin(ScrollTrigger);

// Throttle функция для оптимизации событий
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Particles Background
const particlesDiv = document.getElementById('particles');
const particles = [];

console.log('Creating particles...'); // Отладка
for (let i = 0; i < 40; i++) { // Увеличиваем до 40 частиц
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: linear-gradient(45deg, #b23cff, #00ccff, #b23cff);
        background-size: 200%;
        border-radius: 50%;
    `;
    particlesDiv.appendChild(particle);
    particles.push(particle);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.animation = `float ${5 + Math.random() * 5}s infinite ease-in-out, glow 3s infinite alternate`;
}

// Оптимизированное притяжение частиц
const updateParticles = throttle(() => {
    particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        // Проверяем, видима ли частица на экране
        if (particleY < 0 || particleY > window.innerHeight) return;

        // Притяжение между звездами (эффект слияния галактик)
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const otherRect = otherParticle.getBoundingClientRect();
                const otherX = otherRect.left + otherRect.width / 2;
                const otherY = otherRect.top + otherRect.height / 2;

                const distanceBetween = Math.sqrt((particleX - otherX) ** 2 + (particleY - otherY) ** 2);
                if (distanceBetween < 50) {
                    const angleBetween = Math.atan2(otherY - particleY, otherX - particleX);
                    const pullStrengthBetween = (50 - distanceBetween) / 50 * 15; // Увеличиваем силу притяжения
                    const translateXBetween = Math.cos(angleBetween) * pullStrengthBetween;
                    const translateYBetween = Math.sin(angleBetween) * pullStrengthBetween;
                    particle.style.transform = `translate(${translateXBetween}px, ${translateYBetween}px)`;
                    particle.style.boxShadow = '0 0 20px rgba(0, 204, 255, 1)';
                }
            }
        });
    });
}, 100);

// Mouse Interaction (ПК)
let lastMouseX = 0;
document.addEventListener('mousemove', throttle((e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        const distanceToMouse = Math.sqrt((mouseX - particleX) ** 2 + (mouseY - particleY) ** 2);
        if (distanceToMouse < 100) {
            const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
            const pullStrength = (100 - distanceToMouse) / 100 * 40;
            const translateX = Math.cos(angle) * pullStrength;
            const translateY = Math.sin(angle) * pullStrength;
            particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
            particle.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.8)';
        } else {
            particle.style.transform = 'translate(0, 0)';
            particle.style.boxShadow = '0 0 5px rgba(178, 60, 255, 0.5)';
        }
    });

    lastMouseX = mouseX;
}, 50));

// Touch Interaction (Мобильные)
let lastTouchX = 0;
document.addEventListener('touchmove', throttle((e) => {
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        const distanceToTouch = Math.sqrt((touchX - particleX) ** 2 + (touchY - particleY) ** 2);
        if (distanceToTouch < 100) {
            const angle = Math.atan2(touchY - particleY, touchX - particleX);
            const pullStrength = (100 - distanceToTouch) / 100 * 40;
            const translateX = Math.cos(angle) * pullStrength;
            const translateY = Math.sin(angle) * pullStrength;
            particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
            particle.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.8)';
        } else {
            particle.style.transform = 'translate(0, 0)';
            particle.style.boxShadow = '0 0 5px rgba(178, 60, 255, 0.5)';
        }
    });

    lastTouchX = touchX;
}, 50));

// Запускаем обновление частиц
setInterval(updateParticles, 100);

// NFT Cards Animation
const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];
let lastNFTMouseX = 0;
let lastNFTTouchX = 0;

// Инициализация начальных позиций
nftCards.forEach((card, index) => {
    card.setAttribute('data-position', positions[index]);
});

// Функция для обновления позиций
const updatePositions = (direction) => {
    if (direction === 'right') {
        positions = positions.slice(1).concat(positions[0]); // Сдвиг вправо
    } else if (direction === 'left') {
        positions = [positions[2], positions[0], positions[1]]; // Сдвиг влево
    }
    nftCards.forEach((card, index) => {
        card.setAttribute('data-position', positions[index]);
    });
};

// На ПК: движение курсора
const nftContainer = document.querySelector('.nft-cards');
nftContainer.addEventListener('mousemove', throttle((e) => {
    const mouseX = e.clientX;
    const direction = mouseX > lastNFTMouseX ? 'right' : 'left';
    updatePositions(direction);
    lastNFTMouseX = mouseX;
}, 300));

// На мобильных: свайп
let touchStartX = 0;
nftContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

nftContainer.addEventListener('touchmove', throttle((e) => {
    const touchX = e.touches[0].clientX;
    const direction = touchX > lastNFTTouchX ? 'right' : 'left';
    updatePositions(direction);
    lastNFTTouchX = touchX;
}, 300));

// Hero Logo Pulse Animation
gsap.to('.hero-logo', {
    scale: 1.05,
    opacity: 0.9,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// Section Cards Animation
gsap.utils.toArray('.section-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});
