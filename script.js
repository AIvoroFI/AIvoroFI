gsap.registerPlugin(ScrollTrigger);

// Particles Background
const particlesDiv = document.getElementById('particles');
const particles = [];

console.log('Creating particles...'); // Отладка
for (let i = 0; i < 20; i++) { // Уменьшаем до 20 частиц
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
