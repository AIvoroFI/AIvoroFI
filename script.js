gsap.registerPlugin(ScrollTrigger);

// Particles Background
const particlesDiv = document.getElementById('particles');
const particles = [];

console.log('Creating particles...'); // Отладка
for (let i = 0; i < 20; i++) {
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

// Mouse Interaction (ПК)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        // Притяжение к курсору
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

        // Притяжение между звездами (эффект слияния галактик)
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const otherRect = otherParticle.getBoundingClientRect();
                const otherX = otherRect.left + otherRect.width / 2;
                const otherY = otherRect.top + otherRect.height / 2;

                const distanceBetween = Math.sqrt((particleX - otherX) ** 2 + (particleY - otherY) ** 2);
                if (distanceBetween < 50) {
                    const angleBetween = Math.atan2(otherY - particleY, otherX - particleX);
                    const pullStrengthBetween = (50 - distanceBetween) / 50 * 10;
                    const translateXBetween = Math.cos(angleBetween) * pullStrengthBetween;
                    const translateYBetween = Math.sin(angleBetween) * pullStrengthBetween;
                    particle.style.transform = `translate(${translateXBetween}px, ${translateYBetween}px)`;
                    particle.style.boxShadow = '0 0 20px rgba(0, 204, 255, 1)';
                }
            }
        });
    });
});

// Touch Interaction (Мобильные)
let lastTouchX = 0;
let lastTouchY = 0;

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        // Притяжение к пальцу
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

        // Притяжение между звездами
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const otherRect = otherParticle.getBoundingClientRect();
                const otherX = otherRect.left + otherRect.width / 2;
                const otherY = otherRect.top + otherRect.height / 2;

                const distanceBetween = Math.sqrt((particleX - otherX) ** 2 + (particleY - otherY) ** 2);
                if (distanceBetween < 50) {
                    const angleBetween = Math.atan2(otherY - particleY, otherX - particleX);
                    const pullStrengthBetween = (50 - distanceBetween) / 50 * 10;
                    const translateXBetween = Math.cos(angleBetween) * pullStrengthBetween;
                    const translateYBetween = Math.sin(angleBetween) * pullStrengthBetween;
                    particle.style.transform = `translate(${translateXBetween}px, ${translateYBetween}px)`;
                    particle.style.boxShadow = '0 0 20px rgba(0, 204, 255, 1)';
                }
            }
        });
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
