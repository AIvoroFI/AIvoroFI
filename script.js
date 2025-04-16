gsap.registerPlugin(ScrollTrigger);

const startBtn = document.getElementById('start-btn');
const skipBtn = document.getElementById('skip-btn');
const terminal = document.getElementById('terminal');
const startScreen = document.getElementById('start-screen');
const terminalContent = document.getElementById('terminal-content');
const readyMessage = document.getElementById('ready-message');
const launchBtn = document.getElementById('launch-btn');
const terminalOverlay = document.getElementById('terminal-overlay');
const mainContent = document.getElementById('main-content');

let typeSound = new Audio('assets/sounds/type.mp3');
typeSound.volume = 0.15;
typeSound.onerror = () => {
    console.error("Failed to load type.mp3. Check file path or file integrity.");
    typeSound = new Audio('assets/sounds/click.mp3');
    typeSound.volume = 0.15;
};
typeSound.oncanplaythrough = () => {
    console.log("type.mp3 loaded successfully and ready to play.");
};

let backgroundSound = new Audio('assets/sounds/background_hum.mp3');
backgroundSound.volume = 0.03;
backgroundSound.loop = true;

const terminalLines = [
    '> Initializing AIvoroFI Neural Core...',
    '> Connecting to Somnia blockchain...',
    '> Optimizing DeFi liquidity protocols...',
    '> Syncing NFT utility contracts...',
    '> Validating multi-chain aggregators...',
    '> AIvoroFI deployment complete.'
];

function blinkCursor(element, callback) {
    let cursorVisible = true;
    const cursorInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        element.innerHTML = `<span class="cursor">${cursorVisible ? '_' : ' '}</span>`;
    }, 350);
    return () => clearInterval(cursorInterval);
}

function typeLine(element, text, callback) {
    let index = 0;
    element.innerHTML = '';
    let cursorVisible = true;
    const cursorInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        const cursorText = cursorVisible ? '_' : ' ';
        element.innerHTML = text.slice(0, index) + `<span class="cursor">${cursorText}</span>`;
    }, 350);

    function typeChar() {
        if (index < text.length) {
            index++;
            element.innerHTML = text.slice(0, index) + `<span class="cursor">${cursorVisible ? '_' : ' '}</span>`;
            typeSound.play().catch(error => {
                console.error("Error playing type.mp3:", error);
            });
            setTimeout(typeChar, 80);
        } else {
            clearInterval(cursorInterval);
            element.innerHTML = text;
            typeSound.pause();
            typeSound.currentTime = 0;
            callback();
        }
    }
    typeChar();
}

startBtn.addEventListener('click', () => {
    playSound('click.mp3');
    backgroundSound.play();
    gsap.to(startScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            startScreen.style.display = 'none';
            terminal.style.display = 'flex';
            gsap.to(terminal, { opacity: 1, duration: 1, ease: 'power3.out' });

            terminalContent.innerHTML = '';
            let lineIndex = 0;

            function typeNextLine() {
                if (lineIndex < terminalLines.length) {
                    const newLine = document.createElement('p');
                    terminalContent.appendChild(newLine);
                    typeLine(newLine, terminalLines[lineIndex], () => {
                        const pauseLine = document.createElement('p');
                        terminalContent.appendChild(pauseLine);
                        const stopBlink = blinkCursor(pauseLine, () => {});
                        setTimeout(() => {
                            stopBlink();
                            pauseLine.remove();
                            lineIndex++;
                            typeNextLine();
                        }, 800);
                    });
                } else {
                    typeSound.pause();
                    typeSound.currentTime = 0;
                    gsap.to(readyMessage.querySelector('p'), { opacity: 1, duration: 0.5 });
                    gsap.to(launchBtn, { opacity: 1, duration: 0.5, delay: 0.5 });
                }
            }
            typeNextLine();
        }
    });
});

skipBtn.addEventListener('click', () => {
    playSound('click.mp3');
    gsap.to(terminalOverlay, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            terminalOverlay.style.display = 'none';
            mainContent.style.display = 'block';
            gsap.fromTo(mainContent, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' });
        }
    });
});

launchBtn.addEventListener('click', () => {
    playSound('confirm.mp3');
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    gsap.to(terminalOverlay, {
        opacity: 0,
        duration: 0.5,
        onStart: () => {
            playSound('confirm.mp3');
        },
        onComplete: () => {
            terminalOverlay.style.display = 'none';
            mainContent.style.display = 'block';
            gsap.fromTo(mainContent, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' });
        }
    });
});

function playSound(file) {
    const sound = new Audio('assets/sounds/' + file);
    sound.play();
}

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
