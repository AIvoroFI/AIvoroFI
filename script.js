gsap.registerPlugin(ScrollTrigger);
gsap.ticker.fps(60);
ScrollTrigger.config({ limitCallbacks: true });

const nftPositionWrappers = document.querySelectorAll('.nft-position-wrapper');
const nftCards = document.querySelectorAll('.nft-card');
let positions = ['center', 'right', 'left'];
let startX = 0;
let hasSwapped = false;
const threshold = 50;

nftCards.forEach(card => {
    card.dataset.clickState = '0';
});

nftPositionWrappers.forEach((wrapper, index) => {
    wrapper.setAttribute('data-position', positions[index]);
});

const updatePositions = (direction) => {
    if (direction === 'right') {
        positions = positions.slice(1).concat(positions[0]);
    } else if (direction === 'left') {
        positions = [positions[2], ...positions.slice(0, 2)];
    }
    nftPositionWrappers.forEach((wrapper, index) => {
        wrapper.setAttribute('data-position', positions[index]);
        const card = wrapper.querySelector('.nft-card');
        card.dataset.clickState = '0';
        card.classList.remove('zoomed', 'flipped');
    });
};

const nftContainer = document.querySelector('.nft-cards');
let isDragging = false;

nftContainer.addEventListener('mousedown', (e) => {
    if (e.target.closest('.nft-position-wrapper') && e.target.closest('.nft-position-wrapper').getAttribute('data-position') === 'center') {
        return;
    }
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

nftCards.forEach(card => {
    card.addEventListener('click', () => {
        const parentWrapper = card.closest('.nft-position-wrapper');
        if (parentWrapper && parentWrapper.getAttribute('data-position') === 'center') {
            let clickState = parseInt(card.dataset.clickState);

            if (clickState === 0) {
                card.classList.add('zoomed');
                card.dataset.clickState = '1';
            } else if (clickState === 1) {
                card.classList.add('flipped');
                card.dataset.clickState = '2';
            } else if (clickState === 2) {
                card.classList.remove('flipped', 'zoomed');
                card.dataset.clickState = '0';
            }
        }
    });
});

const mintBtn = document.getElementById('mint-btn');
const mintModal = document.getElementById('mint-modal');
const closeModal = document.getElementById('close-modal');

mintBtn.addEventListener('click', () => {
    mintModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    mintModal.style.display = 'none';
});

const logo = document.querySelector('.hero-logo');
logo.addEventListener('load', () => {
    gsap.to('.hero-logo', {
        scale: 1.05,
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
});

gsap.utils.toArray('.section-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        x: -100,
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
