gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.roadmap-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 90%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
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

const mintBtn = document.querySelector('.mint-btn');
const modal = document.getElementById('mint-modal');
const closeBtn = modal.querySelector('.close');

mintBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
