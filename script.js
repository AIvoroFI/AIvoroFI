gsap.registerPlugin(ScrollTrigger);
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

    // === REPLACEMENT: MINT redirects to nft.html ===
    const mintBtn = document.getElementById('mint-btn');
    mintBtn.addEventListener('click', () => {
        window.location.href = 'nft.html';
    });

    // === Assistant ===
    const assistantIcon = document.querySelector('.assistant-icon');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');

    const monologue = [
        "Let me tell you about AIvoroFI. We’re an innovative decentralized finance platform...",
        "What sets us apart from other DeFi projects? Unlike most protocols that focus on single-chain...",
        "Here’s how our aggregator works: you deposit funds and select a risk strategy...",
        "Our NFTs play a big role. AIvoroFI NFTs provide real utility...",
        "Don’t worry if you don’t own an NFT — you can still use the aggregator!",
        "Speaking of NFT rentals, here’s how it works...",
        "Let me explain what the AI does...",
        "We support multiple blockchains to ensure broad access...",
        "Wondering which wallets you can use? We support popular wallets like MetaMask...",
        "Is it safe to use AIvoroFI? Absolutely...",
        "Your yield comes from yield-bearing DeFi pools...",
        "Our platform fees are minimal and transparent...",
        "You might be wondering if we’ll have a token. The answer is no...",
        "Why are we called AIvoroFI? The name combines 'AI' and 'FI'...",
        "What makes AIvoroFI truly unique?...",
        "That’s all I wanted to share! Stay tuned!"
    ];

    let currentStep = 0;

    const typeMessage = (text, element, callback) => {
        let index = 0;
        element.textContent = '';
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                chatMessages.scrollTop = chatMessages.scrollHeight;
                setTimeout(type, 30);
            } else if (callback) {
                callback();
            }
        };
        type();
    };

    const addMessage = (text, callback) => {
        const message = document.createElement('div');
        message.classList.add('message');
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        typeMessage(text, message, callback);
    };

    const showNextMessage = () => {
        if (currentStep < monologue.length) {
            addMessage(monologue[currentStep], () => {
                currentStep++;
                setTimeout(showNextMessage, 2000);
            });
        }
    };

    assistantIcon.addEventListener('click', () => {
        chatOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
        chatMessages.innerHTML = '';
        currentStep = 0;
        setTimeout(() => {
            addMessage("Hi, my name is Evangelina, your AI assistant. I’ll help you learn more about the AIvoroFI project.", () => {
                setTimeout(showNextMessage, 2000);
            });
        }, 500);
    });

    chatClose.addEventListener('click', () => {
        chatOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        chatMessages.innerHTML = '';
        currentStep = 0;
    });

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
