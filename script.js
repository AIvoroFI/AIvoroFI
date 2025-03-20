gsap.registerPlugin(ScrollTrigger);

const particlesDiv = document.getElementById('particles');
const particles = [];

const floatAnimations = ['float1', 'float2', 'float3', 'float4'];

for (let i = 0; i < 50; i++) {
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

    const randomFloat = floatAnimations[Math.floor(Math.random() * floatAnimations.length)];
    particle.style.animation = `${randomFloat} ${5 + Math.random() * 5}s infinite ease-in-out, glow 2s infinite alternate`;
}

const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];
let startX = 0;
let hasSwapped = false;
const threshold = 50;

nftCards.forEach((card, index) => {
    card.setAttribute('data-position', positions[index]);
});

const updatePositions = (direction) => {
    if (direction === 'right') {
        positions = positions.slice(1).concat(positions[0]);
    } else if (direction === 'left') {
        positions = [positions[2], ...positions.slice(0, 2)];
    }
    nftCards.forEach((card, index) => {
        card.setAttribute('data-position', positions[index]);
    });
};

const nftContainer = document.querySelector('.nft-cards');
let isDragging = false;

nftContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    hasSwapped = false;
});

nftContainer.addEventListener('mousemove', (e) => {
    if (!isDragging || hasSwapped) return;
    const currentX = e.clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        hasSwapped = true;
    }
});

nftContainer.addEventListener('mouseup', () => {
    isDragging = false;
    hasSwapped = false;
});

nftContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    hasSwapped = false;
});

nftContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    hasSwapped = false;
});

nftContainer.addEventListener('touchmove', (e) => {
    if (hasSwapped) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        updatePositions(direction);
        hasSwapped = true;
    }
});

nftContainer.addEventListener('touchend', () => {
    hasSwapped = false;
});

const stayTrigger = document.querySelector('.stay-trigger');
const glitchOverlay = document.querySelector('.glitch-overlay');
const matrixRain = document.querySelector('.matrix-rain');

document.addEventListener('DOMContentLoaded', () => {
    glitchOverlay.classList.remove('active');

    stayTrigger.addEventListener('click', () => {
        if (!glitchOverlay.classList.contains('active')) {
            glitchOverlay.classList.add('active');

            matrixRain.innerHTML = '';

            for (let i = 0; i < 50; i++) {
                const char = document.createElement('span');
                char.textContent = String.fromCharCode(33 + Math.random() * 94);
                char.style.left = `${Math.random() * 100}%`;
                char.style.top = `-20px`;
                char.style.animationDuration = `${2 + Math.random() * 3}s`;
                char.style.animationDelay = `${Math.random() * 2}s`;
                matrixRain.appendChild(char);
            }
        }
    });
});

gsap.to('.hero-logo', {
    scale: 1.05,
    opacity: 0.9,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.utils.toArray('.section-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.roadmap-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%' },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});
