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

console.log('Creating particles...');
for (let i = 0; i < 100; i++) { // Увеличиваем количество звёзд до 100
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

        if (particleY < 0 || particleY > window.innerHeight) return;

        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const otherRect = otherParticle.getBoundingClientRect();
                const otherX = otherRect.left + otherRect.width / 2;
                const otherY = otherRect.top + otherRect.height / 2;

                const distanceBetween = Math.sqrt((particleX - otherX) ** 2 + (particleY - otherY) ** 2);
                if (distanceBetween < 50) {
                    const angleBetween = Math.atan2(otherY - particleY, otherX - particleX);
                    const pullStrengthBetween = (50 - distanceBetween) / 50 * 15;
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

// NFT Cards Animation
const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];
let lastNFTMouseX = 0;
let lastNFTTouchX = 0;
let mouseStartX = 0;
let touchStartX = 0;
const threshold = 50; // Порог для переключения (в пикселях)

// Инициализация начальных позиций
nftCards.forEach((card, index) => {
    card.setAttribute('data-position', positions[index]);
});

// Функция для обновления позиций
const updatePositions = (direction) => {
    if (direction === 'right') {
        positions = positions.slice(1).concat(positions[0]);
    } else if (direction === 'left') {
        positions = [positions[2], positions[0], positions[1]];
    }
    nftCards.forEach((card, index) => {
        card.setAttribute('data-position', positions[index]);
    });
};

// На ПК: движение курсора для NFT
const nftContainer = document.querySelector('.nft-cards');
nftContainer.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
});

nftContainer.addEventListener('mousemove', throttle((e) => {
    const mouseX = e.clientX;
    const deltaX = mouseX - mouseStartX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        mouseStartX = mouseX; // Сбрасываем начальную позицию
    }
}, 300));

nftContainer.addEventListener('mouseup', () => {
    mouseStartX = 0; // Сбрасываем начальную позицию
});

// На мобильных: свайп для NFT
nftContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

nftContainer.addEventListener('touchmove', throttle((e) => {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        touchStartX = touchX; // Сбрасываем начальную позицию
    }
}, 300));

nftContainer.addEventListener('touchend', () => {
    touchStartX = 0; // Сбрасываем начальную позицию
});

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

// Roadmap Items Animation
gsap.utils.toArray('.roadmap-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%' },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});
