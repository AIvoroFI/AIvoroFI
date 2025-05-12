document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.burger-icon');
    const menuContent = document.querySelector('.menu-content');
    const navLinks = document.querySelectorAll('.nav-link');

    burgerIcon.addEventListener('click', () => {
        menuContent.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
                menuContent.classList.remove('active');
            }
        });
    });

    const translations = {
        en: {
            slogan: "Revolutionizing DeFi with AI and NFTs",
            featuresTitle: "What We Offer",
            aggregator: "<strong><span class=\"highlight\">AI-Driven Aggregator:</span></strong> Seamlessly connects multi-chain liquidity pools, using real-time AI analysis to boost your returns.",
            nftUtilities: "<strong><span class=\"highlight\">NFT Utilities:</span></strong> Our NFTs grant access to premium pools, staking opportunities, and a rental system-unlocking benefits without ownership barriers.",
            ecosystems: "<strong><span class=\"highlight\">Partnered Ecosystems:</span></strong> Integration with top NFT projects expands liquidity and creates a thriving DeFi network.",
            nftTitle: "Our NFT Collection",
            roadmapTitle: "Roadmap",
            q4_2024: "Q4 2024: Launch of AI-driven liquidity aggregator on Somnia blockchain.",
            q1_2025: "Q1 2025: NFT collection release with utility features.",
            q2_2025: "Q2 2025: Integration with top NFT projects for expanded liquidity.",
            q3_2025: "Q3 2025: Staking and rental system launch for NFT holders.",
            footerTitle: "Join the Future",
            footerText: "Follow us on Twitter for updates and community events.",
            aiName: "Evangelina",
            aiMessages: [
                "Hello! I'm Evangelina, your AI assistant for AIvoroFI.",
                "We're revolutionizing DeFi with AI and NFTs on the Somnia blockchain.",
                "Explore our AI-driven liquidity aggregator, NFT utilities, and partnered ecosystems.",
                "Check out our NFT collection and roadmap for more details!"
            ]
        },
        es: {
            slogan: "Revolucionando DeFi con IA y NFTs",
            featuresTitle: "¿Qué ofrecemos?",
            aggregator: "<strong><span class=\"highlight\">Agregador impulsado por IA:</span></strong> Conecta sin problemas grupos de liquidez multi-cadena, utilizando análisis de IA en tiempo real para aumentar tus retornos.",
            nftUtilities: "<strong><span class=\"highlight\">Utilidades de NFT:</span></strong> Nuestros NFTs otorgan acceso a grupos premium, oportunidades de staking y un sistema de alquiler, desbloqueando beneficios sin barreras de propiedad.",
            ecosystems: "<strong><span class=\"highlight\">Ecosistemas asociados:</span></strong> La integración con los principales proyectos NFT amplía la liquidez y crea una red DeFi próspera.",
            nftTitle: "Nuestra colección de NFT",
            roadmapTitle: "Hoja de ruta",
            q4_2024: "Q4 2024: Lanzamiento del agregador de liquidez impulsado por IA en la blockchain Somnia.",
            q1_2025: "Q1 2025: Lanzamiento de la colección NFT con funciones de utilidad.",
            q2_2025: "Q2 2025: Integración con los principales proyectos NFT para expandir la liquidez.",
            q3_2025: "Q3 2025: Lanzamiento del sistema de staking y alquiler para titulares de NFT.",
            footerTitle: "Únete al futuro",
            footerText: "Síguenos en Twitter para actualizaciones y eventos de la comunidad.",
            aiName: "Evangelina",
            aiMessages: [
                "¡Hola! Soy Evangelina, tu asistente de IA para AIvoroFI.",
                "Estamos revolucionando DeFi con IA y NFTs en la blockchain Somnia.",
                "Explora nuestro agregador de liquidez impulsado por IA, utilidades de NFT y ecosistemas asociados.",
                "¡Mira nuestra colección de NFT y la hoja de ruta para más detalles!"
            ]
        },
        fr: {
            slogan: "Révolutionner DeFi avec l'IA et les NFT",
            featuresTitle: "Ce que nous offrons",
            aggregator: "<strong><span class=\"highlight\">Agrégateur alimenté par l'IA :</span></strong> Connecte de manière transparente les pools de liquidité multi-chaînes, en utilisant l'analyse IA en temps réel pour augmenter vos rendements.",
            nftUtilities: "<strong><span class=\"highlight\">Utilitaires NFT :</span></strong> Nos NFT donnent accès à des pools premium, des opportunités de staking et un système de location, débloquant des avantages sans barrières de propriété.",
            ecosystems: "<strong><span class=\"highlight\">Écosystèmes partenaires :</span></strong> L'intégration avec les principaux projets NFT élargit la liquidité et crée un réseau DeFi florissant.",
            nftTitle: "Notre collection NFT",
            roadmapTitle: "Feuille de route",
            q4_2024: "T4 2024 : Lancement de l'agrégateur de liquidité alimenté par l'IA sur la blockchain Somnia.",
            q1_2025: "T1 2025 : Sortie de la collection NFT avec des fonctionnalités utilitaires.",
            q2_2025: "T2 2025 : Intégration avec les principaux projets NFT pour élargir la liquidité.",
            q3_2025: "T3 2025 : Lancement du système de staking et de location pour les détenteurs de NFT.",
            footerTitle: "Rejoignez l'avenir",
            footerText: "Suivez-nous sur Twitter pour des mises à jour et des événements communautaires.",
            aiName: "Evangelina",
            aiMessages: [
                "Bonjour ! Je suis Evangelina, votre assistante IA pour AIvoroFI.",
                "Nous révolutionnons DeFi avec l'IA et les NFT sur la blockchain Somnia.",
                "Explorez notre agrégateur de liquidité alimenté par l'IA, les utilitaires NFT et les écosystèmes partenaires.",
                "Découvrez notre collection NFT et notre feuille de route pour plus de détails !"
            ]
        },
        zh: {
            slogan: "用AI和NFT革新DeFi",
            featuresTitle: "我们提供什么",
            aggregator: "<strong><span class=\"highlight\">AI驱动的聚合器：</span></strong>无缝连接多链流动性池，使用实时AI分析提升你的回报。",
            nftUtilities: "<strong><span class=\"highlight\">NFT实用性：</span></strong>我们的NFT提供高级池访问、质押机会和租赁系统，无需拥有即可解锁福利。",
            ecosystems: "<strong><span class=\"highlight\">合作生态系统：</span></strong>与顶级NFT项目整合，扩展流动性和创建繁荣的DeFi网络。",
            nftTitle: "我们的NFT收藏",
            roadmapTitle: "路线图",
            q4_2024: "2024年第四季度：在Somnia区块链上推出AI驱动的流动性聚合器。",
            q1_2025: "2025年第一季度：发布带有实用功能的NFT收藏。",
            q2_2025: "2025年第二季度：与顶级NFT项目整合以扩展流动性。",
            q3_2025: "2025年第三季度：为NFT持有者推出质押和租赁系统。",
            footerTitle: "加入未来",
            footerText: "在Twitter上关注我们以获取更新和社区活动。",
            aiName: "Evangelina",
            aiMessages: [
                "你好！我是Evangelina，AIvoroFI的AI助手。",
                "我们在Somnia区块链上用AI和NFT革新DeFi。",
                "探索我们的AI驱动流动性聚合器、NFT实用性和合作生态系统。",
                "查看我们的NFT收藏和路线图以了解更多详情！"
            ]
        },
        ru: {
            slogan: "Революция в DeFi с помощью ИИ и NFT",
            featuresTitle: "Что мы предлагаем",
            aggregator: "<strong><span class=\"highlight\">Агрегатор на базе ИИ:</span></strong> Бесшовно соединяет пулы ликвидности разных блокчейнов, используя анализ ИИ в реальном времени для повышения доходности.",
            nftUtilities: "<strong><span class=\"highlight\">Утилиты NFT:</span></strong> Наши NFT дают доступ к премиум-пулам, возможностям стейкинга и системе аренды, открывая преимущества без барьеров владения.",
            ecosystems: "<strong><span class=\"highlight\">Партнерские экосистемы:</span></strong> Интеграция с топовыми NFT-проектами расширяет ликвидность и создает процветающую сеть DeFi.",
            nftTitle: "Наша коллекция NFT",
            roadmapTitle: "Дорожная карта",
            q4_2024: "4-й квартал 2024: Запуск агрегатора ликвидности на базе ИИ на блокчейне Somnia.",
            q1_2025: "1-й квартал 2025: Релиз коллекции NFT с утилитарными функциями.",
            q2_2025: "2-й квартал 2025: Интеграция с топовыми NFT-проектами для расширения ликвидности.",
            q3_2025: "3-й квартал 2025: Запуск системы стейкинга и аренды для держателей NFT.",
            footerTitle: "Присоединяйтесь к будущему",
            footerText: "Следите за нами в Twitter для обновлений и событий сообщества.",
            aiName: "Евангелина",
            aiMessages: [
                "Привет! Я Евангелина, твой ИИ-ассистент на AIvoroFI.",
                "Мы совершаем революцию в DeFi с помощью ИИ и NFT на блокчейне Somnia.",
                "Исследуй наш агрегатор ликвидности на базе ИИ, утилиты NFT и партнерские экосистемы.",
                "Ознакомься с нашей коллекцией NFT и дорожной картой для получения подробностей!"
            ]
        }
    };

    const languageSwitcher = document.getElementById('language-switcher');
    const slogan = document.querySelector('.hero-slogan');
    const featuresTitle = document.querySelector('.features h2');
    const aggregatorText = document.querySelector('.features p:nth-child(2)');
    const nftUtilitiesText = document.querySelector('.features p:nth-child(3)');
    const ecosystemsText = document.querySelector('.features p:nth-child(4)');
    const nftTitle = document.querySelector('.nft h2');
    const roadmapTitle = document.querySelector('.roadmap h2');
    const roadmapItems = document.querySelectorAll('.roadmap-box p');
    const footerTitle = document.querySelector('.footer h2');
    const footerText = document.querySelector('.footer p:nth-child(2)');

    const setLanguage = (lang) => {
        const t = translations[lang];
        slogan.textContent = t.slogan;
        featuresTitle.textContent = t.featuresTitle;
        aggregatorText.innerHTML = t.aggregator;
        nftUtilitiesText.innerHTML = t.nftUtilities;
        ecosystemsText.innerHTML = t.ecosystems;
        nftTitle.textContent = t.nftTitle;
        roadmapTitle.textContent = t.roadmapTitle;
        roadmapItems[0].textContent = t.q4_2024;
        roadmapItems[1].textContent = t.q1_2025;
        roadmapItems[2].textContent = t.q2_2025;
        roadmapItems[3].textContent = t.q3_2025;
        footerTitle.textContent = t.footerTitle;
        footerText.textContent = t.footerText;

        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.innerHTML = '';
        const hasChatHistory = localStorage.getItem('chatHistory');
        if (hasChatHistory) {
            chatMessages.innerHTML = hasChatHistory;
        } else {
            t.aiMessages.forEach((msg, index) => {
                setTimeout(() => {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');
                    messageDiv.textContent = msg;
                    chatMessages.appendChild(messageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    localStorage.setItem('chatHistory', chatMessages.innerHTML);
                }, index * 1000);
            });
        }
    };

    const savedLang = localStorage.getItem('language') || 'en';
    languageSwitcher.value = savedLang;
    setLanguage(savedLang);

    languageSwitcher.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('language', lang);
        setLanguage(lang);
    });

    const assistantIcon = document.querySelector('.assistant-icon');
    const chatOverlay = document.querySelector('.chat-overlay');
    const chatMessages = document.querySelector('.chat-messages');
    const chatClose = document.querySelector('.chat-close');

    assistantIcon.addEventListener('click', () => {
        chatOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');

        const hasChatHistory = localStorage.getItem('chatHistory');
        if (hasChatHistory) {
            chatMessages.innerHTML = hasChatHistory;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            const lang = languageSwitcher.value;
            const messages = translations[lang].aiMessages;
            chatMessages.innerHTML = '';
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');
                    messageDiv.textContent = msg;
                    chatMessages.appendChild(messageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    localStorage.setItem('chatHistory', chatMessages.innerHTML);
                }, index * 1000);
            });
        }
    });

    chatClose.addEventListener('click', () => {
        chatOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    const nftCards = document.querySelectorAll('.nft-card');
    let currentIndex = 0;

    const positions = ['left', 'center', 'right'];

    const updatePositions = () => {
        nftCards.forEach((card, index) => {
            const positionIndex = (index + currentIndex) % 3;
            const wrapper = card.closest('.nft-position-wrapper');
            wrapper.setAttribute('data-position', positions[positionIndex]);
            card.classList.remove('zoomed', 'flipped');
        });
    };

    const autoRotate = () => {
        currentIndex = (currentIndex + 1) % 3;
        updatePositions();
    };

    setInterval(autoRotate, 3000);

    nftCards.forEach(card => {
        card.addEventListener('click', () => {
            const isCenter = card.closest('.nft-position-wrapper').getAttribute('data-position') === 'center';
            if (isCenter) {
                card.classList.toggle('zoomed');
                card.classList.toggle('flipped');
            }
        });
    });

    updatePositions();

    gsap.registerPlugin(ScrollTrigger);

    const animateOnScroll = (elements, delay = 0) => {
        gsap.from(elements, {
            scrollTrigger: {
                trigger: elements,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.2,
            delay
        });
    };

    document.querySelectorAll('h2, p, .roadmap-item').forEach(element => {
        animateOnScroll(element);
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => element.classList.add('visible')
        });
    });

    const mintBtn = document.querySelector('.mint-btn');
    const modal = document.getElementById('mint-modal');
    const closeModal = document.querySelector('.close');

    mintBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
