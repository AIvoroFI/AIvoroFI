gsap.registerPlugin(ScrollTrigger);

// Particles Background
const particlesDiv = document.getElementById('particles');
const particles = [];

for (let i = 0; i < 50; i++) { // Уменьшаем количество частиц до 50
    const particle = document.createElement('div');
    particle.classList.add('particle'); // Добавляем класс для отладки
    particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
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

    gsap.to(particle, {
        x: '+=30', // Уменьшаем амплитуду движения
        y: '+=30',
        opacity: Math.random() * 0.5 + 0.2,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Mouse Interaction (ПК)
document.addEventListener('mousemove', (e) => {
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
            gsap.to(particle, {
                x: Math.cos(angle) * pullStrength,
                y: Math.sin(angle) * pullStrength,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
            gsap.to(particle, {
                boxShadow: '0 0 15px rgba(0, 204, 255, 0.8)',
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        }
    });
});

// Touch Interaction (Мобильные)
let lastTouchX = 0;
let lastTouchY = 0;

document.addEventListener('touchmove', (e) => {
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
            gsap.to(particle, {
                x: Math.cos(angle) * pullStrength,
                y: Math.sin(angle) * pullStrength,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
            gsap.to(particle, {
                boxShadow: '0 0 15px rgba(0, 204, 255, 0.8)',
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        }
    });

    lastTouchX = touchX;
    lastTouchY = touchY;
});

// NFT Cards Animation
const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];

// Инициализация начальных позиций
nftCards.forEach((card, index) => {
    card.setAttribute('data-position', positions[index]);
});

nftCards.forEach(card => {
    const updatePosition = (newPosition) => {
        card.setAttribute('data-position', newPosition);
    };

    // На ПК: при наведении
    card.addEventListener('mouseenter', () => {
        positions = positions.slice(1).concat(positions[0]);
        nftCards.forEach((c, index) => {
            c.setAttribute('data-position', positions[index]);
        });
    });

    // На мобильных: при касании
    card.addEventListener('touchstart', () => {
        positions = positions.slice(1).concat(positions[0]);
        nftCards.forEach((c, index) => {
            c.setAttribute('data-position', positions[index]);
        });
    });
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
