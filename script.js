gsap.registerPlugin(ScrollTrigger);
gsap.ticker.fps(60);

document.addEventListener('DOMContentLoaded', () => {
    // NFT Carousel Logic
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

    // Mint Modal Logic
    const mintBtn = document.getElementById('mint-btn');
    const mintModal = document.getElementById('mint-modal');
    const closeModal = document.getElementById('close-modal');

    mintBtn.addEventListener('click', () => {
        mintModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        mintModal.style.display = 'none';
    });

    // Chat Assistant Logic
    const assistantIcon = document.querySelector('.assistant-icon');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatButtons = document.getElementById('chat-buttons');

    const qaFlow = [
        { question: "What is AIvoroFI?", answer: "AIvoroFI is an innovative decentralized finance platform. We’re building a smart liquidity aggregator that connects DeFi pools across multiple blockchains, powered by AI and enhanced with utility-driven NFTs." },
        { question: "How is AIvoroFI different from other DeFi projects?", answer: "Unlike most protocols focused on single-chain or manual yield farming, AIvoroFI integrates multi-chain liquidity, automated AI-based optimization, NFT-based privileges, and an accessible interface for all levels of users." },
        { question: "How does the aggregator work?", answer: "Users deposit funds and select a risk strategy — conservative, balanced, or aggressive. The AI module then analyzes dozens of pools and automatically reallocates funds for maximum yield, all from a single interface." },
        { question: "What role do NFTs play?", answer: "AIvoroFI NFTs provide real utility: access to premium pools with higher yields, lower fees, and exclusive tools. They can also be staked or rented to generate passive income." },
        { question: "Can I use the aggregator without owning an NFT?", answer: "Yes. While NFTs unlock more features and better rates, users can still participate in the aggregator and earn without owning one." },
        { question: "How does NFT rental work?", answer: "Users can temporarily rent NFTs and gain all associated benefits without buying. NFT owners earn passive income from rentals. The process is safe and fully managed by smart contracts." },
        { question: "What does the AI actually do?", answer: "The AI continuously monitors pool performance, risk, volatility, and user strategy. It rebalances funds across chains to achieve the best possible APR, automatically and transparently." },
        { question: "Which blockchains will be supported?", answer: "The base network is Somnia, but we plan to support Ethereum, Arbitrum, Polygon, BNB Chain and others to ensure broad multi-chain access." },
        { question: "Which wallets can I use?", answer: "Popular wallets like MetaMask, WalletConnect, and Tonkeeper will be supported. Mobile-friendly connection options will also be available for easy access." },
        { question: "Is it safe to use?", answer: "Yes. All core functionality is secured by smart contracts. We’ll have audits, a bug bounty program, and no custody of your keys — only you control your funds." },
        { question: "How is my yield calculated?", answer: "Your returns come from yield-bearing DeFi pools, boosted by compounding and NFT-based bonuses. The AI ensures you're always positioned for optimal yield based on your selected strategy." },
        { question: "What are the platform fees?", answer: "Fees will be minimal and transparent. They only apply to profits, not deposits. NFT holders receive lower or zero fees depending on pool access level." },
        { question: "Will there be a token?", answer: "No. We chose not to issue a native token because most tokens are used as speculative assets, and many people lose money on them. AIvoroFI is focused on creating real, sustainable earning opportunities — not speculation." },
        { question: "Why is it called AIvoroFI?", answer: "The name combines 'AI' for artificial intelligence and 'FI' for finance — reflecting our mission to build intelligent, transparent and user-friendly financial tools for everyone." },
        { question: "What makes AIvoroFI truly unique?", answer: "AIvoroFI combines smart automation, cross-chain liquidity, and NFT-based privileges into one seamless ecosystem. It’s designed to be both powerful and accessible, removing complexity from DeFi without sacrificing performance." }
    ];

    let currentStep = 0;

    const addMessage = (text, type) => {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showNextQuestion = () => {
        chatButtons.innerHTML = '';
        if (currentStep < qaFlow.length) {
            const button = document.createElement('button');
            button.classList.add('chat-button');
            button.textContent = qaFlow[currentStep].question;
            button.addEventListener('click', () => {
                addMessage(qaFlow[currentStep].question, 'user');
                setTimeout(() => {
                    addMessage(qaFlow[currentStep].answer, 'ai');
                    currentStep++;
                    setTimeout(showNextQuestion, 500);
                }, 1000);
            });
            chatButtons.appendChild(button);
        } else {
            setTimeout(() => {
                addMessage("That’s all I wanted to share! If you’d like to learn more, stay tuned for our updates.", 'ai');
            }, 1000);
        }
    };

    assistantIcon.addEventListener('click', () => {
        chatOverlay.style.display = 'flex';
        chatMessages.innerHTML = '';
        currentStep = 0;
        setTimeout(() => {
            addMessage("Hi, my name is Evangelina, your AI assistant. I’ll help you learn more about the AIvoroFI project.", 'ai');
            setTimeout(showNextQuestion, 500);
        }, 500);
    });

    chatClose.addEventListener('click', () => {
        chatOverlay.style.display = 'none';
        chatMessages.innerHTML = '';
        chatButtons.innerHTML = '';
        currentStep = 0;
    });

    // Intersection Observer for Section Animations
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
