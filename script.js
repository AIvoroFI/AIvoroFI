// Инициализация анимаций GSAP + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-slogan", {
    scrollTrigger: {
        trigger: ".hero-slogan",
        start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 1
});

gsap.utils.toArray(".feature-card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%"
        },
        opacity: 0,
        y: 30,
        duration: 0.6
    });
});

gsap.from(".nft-cards", {
    scrollTrigger: {
        trigger: ".nft-cards",
        start: "top 80%"
    },
    opacity: 0,
    y: 60,
    duration: 1
});

gsap.from(".roadmap .step", {
    scrollTrigger: {
        trigger: ".roadmap .step",
        start: "top 85%"
    },
    opacity: 0,
    x: -50,
    duration: 0.6,
    stagger: 0.2
});

// ==== Ассистент Монолог ====
const monologue = [
    "What is AIvoroFI? AIvoroFI is an innovative decentralized finance platform. We’re building a smart liquidity aggregator that connects DeFi pools across multiple blockchains, powered by AI and enhanced with utility-driven NFTs.",
    "How is AIvoroFI different from other DeFi projects? Unlike most protocols focused on single-chain or manual yield farming, AIvoroFI integrates multi-chain liquidity, automated AI-based optimization, NFT-based privileges, and an accessible interface for all levels of users.",
    "How does the aggregator work? Users deposit funds and select a risk strategy — conservative, balanced, or aggressive. The AI module then analyzes dozens of pools and automatically reallocates funds for maximum yield, all from a single interface.",
    "What role do NFTs play? AIvoroFI NFTs provide real utility: access to premium pools with higher yields, lower fees, and exclusive tools. They can also be staked or rented to generate passive income.",
    "Can I use the aggregator without owning an NFT? Yes. While NFTs unlock more features and better rates, users can still participate in the aggregator and earn without owning one.",
    "How does NFT rental work? Users can temporarily rent NFTs and gain all associated benefits without buying. NFT owners earn passive income from rentals. The process is safe and fully managed by smart contracts.",
    "What does the AI actually do? The AI continuously monitors pool performance, risk, volatility, and user strategy. It rebalances funds across chains to achieve the best possible APR, automatically and transparently.",
    "Which blockchains will be supported? The base network is Somnia, but we plan to support Ethereum, Arbitrum, Polygon, BNB Chain and others to ensure broad multi-chain access.",
    "Which wallets can I use? Popular wallets like MetaMask, WalletConnect, and Tonkeeper will be supported. Mobile-friendly connection options will also be available for easy access.",
    "Is it safe to use? Yes. All core functionality is secured by smart contracts. We’ll have audits, a bug bounty program, and no custody of your keys — only you control your funds.",
    "How is my yield calculated? Your returns come from yield-bearing DeFi pools, boosted by compounding and NFT-based bonuses. The AI ensures you're always positioned for optimal yield based on your selected strategy.",
    "What are the platform fees? Fees will be minimal and transparent. They only apply to profits, not deposits. NFT holders receive lower or zero fees depending on pool access level.",
    "Will there be a token? No. We chose not to issue a native token because most tokens are used as speculative assets, and many people lose money on them. AIvoroFI is focused on creating real, sustainable earning opportunities — not speculation.",
    "Why is it called AIvoroFI? The name combines 'AI' for artificial intelligence and 'FI' for finance — reflecting our mission to build intelligent, transparent and user-friendly financial tools for everyone.",
    "What makes AIvoroFI truly unique? AIvoroFI combines smart automation, cross-chain liquidity, and NFT-based privileges into one seamless ecosystem. It’s designed to be both powerful and accessible, removing complexity from DeFi without sacrificing performance."
];

// Открытие/закрытие окна чата
const assistantIcon = document.querySelector('.assistant-icon');
const chatOverlay = document.querySelector('.chat-overlay');
const chatClose = document.querySelector('.chat-close');

assistantIcon.addEventListener('click', () => {
    document.body.classList.add('no-scroll');
    chatOverlay.style.display = 'flex';
    startMonologue();
});

chatClose.addEventListener('click', () => {
    document.body.classList.remove('no-scroll');
    chatOverlay.style.display = 'none';
    resetMessages();
});

const chatMessages = document.querySelector('.chat-messages');
let currentLine = 0;
let charIndex = 0;

function startMonologue() {
    if (currentLine >= monologue.length) return;
    const line = monologue[currentLine];
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    chatMessages.appendChild(messageEl);

    function typeChar() {
        if (charIndex < line.length) {
            messageEl.textContent += line.charAt(charIndex++);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(typeChar, 30);
        } else {
            charIndex = 0;
            currentLine++;
            setTimeout(startMonologue, 500);
        }
    }
    typeChar();
}

function resetMessages() {
    chatMessages.innerHTML = '';
    currentLine = 0;
    charIndex = 0;
}

// Логика Drag & Flip для NFT-карточек
const cards = document.querySelectorAll('.nft-card');
cards.forEach(card => {
    let startX, currentX, isDragging = false;

    card.addEventListener('mousedown', e => {
        startX = e.clientX;
        isDragging = true;
        card.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        card.style.transform = `translateX(${currentX}px)`;
    });
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        card.style.cursor = 'grab';
        if (currentX > 50) card.classList.add('right');
        else if (currentX < -50) card.classList.add('left');
        else card.classList.add('center');
        card.style.transform = '';
        currentX = 0;
    });

    card.addEventListener('click', () => {
        if (card.classList.contains('center')) {
            card.classList.toggle('flipped');
        }
    });
});

// Кнопка Mint
const mintBtn = document.querySelectorAll('.mint-btn');
mintBtn.forEach(btn =>
    btn.addEventListener('click', () => window.location.href = 'nft.html')
);

// Инициализация появления при скролле
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('h2, p').forEach(el => observer.observe(el));
