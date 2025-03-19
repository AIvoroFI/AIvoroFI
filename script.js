gsap.registerPlugin(ScrollTrigger);

// Particles Background
const particlesDiv = document.getElementById('particles');
for (let i = 0; i < 150; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #8a2be2;
        border-radius: 50%;
    `;
    particlesDiv.appendChild(particle);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    gsap.to(particle, {
        x: '+=50',
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
