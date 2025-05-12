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

    const mintBtn = document.getElementById('mint-btn');
    const mintModal = document.getElementById('mint-modal');
    const closeModal = document.getElementById('close-modal');

    mintBtn.addEventListener('click', () => {
        mintModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        mintModal.style.display = 'none';
    });

    const assistantIcon = document.querySelector('.assistant-icon');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');

    const monologue = [
        "Let me tell you about AIvoroFI. We’re an innovative decentralized finance platform, building a smart liquidity aggregator that connects DeFi pools across multiple blockchains, powered by AI and enhanced with utility-driven NFTs.",
        "What sets us apart from other DeFi projects? Unlike most protocols that focus on single-chain or manual yield farming, we integrate multi-chain liquidity, automated AI-based optimization, NFT-based privileges, and an accessible interface for users of all levels.",
        "Here’s how our aggregator works: you deposit funds and select a risk strategy — conservative, balanced, or aggressive. Our AI module then analyzes dozens of pools and automatically reallocates funds for maximum yield, all from a single interface.",
        "Our NFTs play a big role. AIvoroFI NFTs provide real utility: access to premium pools with higher yields, lower fees, and exclusive tools. They can also be staked or rented to generate passive income.",
        "Don’t worry if you don’t own an NFT — you can still use the aggregator! While NFTs unlock more features and better rates, users can participate and earn without owning one.",
        "Speaking of NFT rentals, here’s how it works: users can temporarily rent NFTs and gain all associated benefits without buying. NFT owners earn passive income from rentals, and the process is safe, fully managed by smart contracts.",
        "Let me explain what the AI does. It continuously monitors pool performance, risk, volatility, and your chosen strategy. Then, it rebalances funds across chains to achieve the best possible APR, automatically and transparently.",
        "We support multiple blockchains to ensure broad access. Our base network is Somnia, but we plan to support Ethereum, Arbitrum, Polygon, BNB Chain, and others.",
        "Wondering which wallets you can use? We support popular wallets like MetaMask, WalletConnect, and Tonkeeper. Mobile-friendly connection options will also be available for easy access.",
        "Is it safe to use AIvoroFI? Absolutely. All core functionality is secured by smart contracts. We’ll have audits, a bug bounty program, and we never take custody of your keys — only you control your funds.",
        "Your yield comes from yield-bearing DeFi pools, boosted by compounding and NFT-based bonuses. The AI ensures you’re always positioned for optimal yield based on your selected strategy.",
        "Our platform fees are minimal and transparent. They only apply to profits, not deposits. NFT holders receive lower or zero fees depending on their pool access level.",
        "You might be wondering if we’ll have a token. The answer is no. We chose not to issue a native token because most tokens are used as speculative assets, and many people lose money on them. AIvoroFI is focused on creating real, sustainable earning opportunities — not speculation.",
        "Why are we called AIvoroFI? The name combines 'AI' for artificial intelligence and 'FI' for finance — reflecting our mission to build intelligent, transparent, and user-friendly financial tools for everyone.",
        "What makes AIvoroFI truly unique? We combine smart automation, cross-chain liquidity, and NFT-based privileges into one seamless ecosystem. It’s designed to be both powerful and accessible, removing complexity from DeFi without sacrificing performance.",
        "That’s all I wanted to share! If you’d like to learn more, stay tuned for our updates."
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
