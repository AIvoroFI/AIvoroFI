gsap.registerPlugin(ScrollTrigger);

// Particles Background (равномерное распределение по всей площади)
const particlesDiv = document.getElementById('particles');
for (let i = 0; i < 150; i++) { // Увеличил количество для равномерного покрытия
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #8a2be2;
        border-radius: 50%;
    `;
    particlesDiv.appendChild(particle);

    // Равномерное распределение с начальной позицией по всему экрану
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    gsap.to(particle, {
        x: '+=50', // Небольшое случайное смещение
        y: '+=50',
        opacity: Math.random() * 0.5 + 0.2,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Hero Logo Pulse Animation
gsap.to('.hero-logo', {
    scale: 1.05,
    opacity: 0.9,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// Scroll Down Animation
gsap.from('.scroll-down', { opacity: 0, y: 20, duration: 1, delay: 1 });

// Section Cards Animation (появление с масштабированием и сдвигом)
gsap.utils.toArray('.section-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
        }
    });
});