gsap.registerPlugin(ScrollTrigger);

// Particles Background (оптимизировано)
const particlesDiv = document.getElementById('particles');
const particles = [];

console.log('Creating particles...');
for (let i = 0; i < 80; i++) { // Уменьшаем до 80 звёзд
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

// Mouse Interaction (упрощено)
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
            const pullStrength = (100 - distanceToMouse) / 100 * 20; // Уменьшаем силу притяжения
            const translateX = Math.cos(angle) * pullStrength;
            const translateY = Math.sin(angle) * pullStrength;
            particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
            particle.style.boxShadow = '0 0 10px rgba(0, 204, 255, 0.8)';
        } else {
            particle.style.transform = 'translate(0, 0)';
            particle.style.boxShadow = '0 0 5px rgba(178, 60, 255, 0.5)';
        }
    });
});

// Touch Interaction (упрощено)
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
            const pullStrength = (100 - distanceToTouch) / 100 * 20;
            const translateX = Math.cos(angle) * pullStrength;
            const translateY = Math.sin(angle) * pullStrength;
            particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
            particle.style.boxShadow = '0 0 10px rgba(0, 204, 255, 0.8)';
        } else {
            particle.style.transform = 'translate(0, 0)';
            particle.style.boxShadow = '0 0 5px rgba(178, 60, 255, 0.5)';
        }
    });
});

// NFT Cards Animation
const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];
let startX = 0;
const threshold = 50; // Порог для переключения

// Инициализация начальных позиций
nftCards.forEach((card, index) => {
    card.setAttribute('data-position', positions[index]);
});

// Функция для обновления позиций (работает в обе стороны)
const updatePositions = (direction) => {
    if (direction === 'right') {
        positions = positions.slice(1).concat(positions[0]); // Вправо
    } else if (direction === 'left') {
        positions = [positions[2], ...positions.slice(0, 2)]; // Влево
    }
    nftCards.forEach((card, index) => {
        card.setAttribute('data-position', positions[index]);
    });
};

// На ПК: движение курсора для NFT
const nftContainer = document.querySelector('.nft-cards');
let isDragging = false;

nftContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

nftContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        startX = currentX; // Обновляем начальную позицию
    }
});

nftContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

nftContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

// На мобильных: свайп для NFT
nftContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

nftContainer.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        startX = currentX; // Обновляем начальную позицию
    }
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
