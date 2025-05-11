gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin); // Добавляем ScrollToPlugin
gsap.ticker.fps(60);

document.addEventListener('DOMContentLoaded', () => {
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

    // Меню
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuClose = document.getElementById('menu-close');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuToggle.addEventListener('click', () => {
        menuOverlay.style.display = 'flex';
    });

    menuClose.addEventListener('click', () => {
        menuOverlay.style.display = 'none';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                gsap.to(window, {
                    scrollTo: { y: targetElement, offsetY: 50 },
                    duration: 1,
                    ease: 'power2.inOut'
                });
                menuOverlay.style.display = 'none';
            } else {
                console.error(`Element with ID ${targetId} not found`);
            }
        });
    });

    // Intersection Observer для плавного появления секций
    const elementsToReveal = document.querySelectorAll('h2, p, .roadmap-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});
