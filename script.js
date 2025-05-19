document.addEventListener('DOMContentLoaded',()=>{
    const chatToggle=document.getElementById('chat-toggle');
    const chatOverlay=document.getElementById('chat-overlay');
    const chatClose=document.getElementById('chat-close');
    const chatMessages=document.getElementById('chat-messages');

    const openChat=()=>{chatOverlay.style.display='flex';document.body.classList.add('no-scroll')};
    const closeChat=()=>{chatOverlay.style.display='none';document.body.classList.remove('no-scroll')};

    chatToggle.addEventListener('click',openChat);
    chatClose.addEventListener('click',closeChat);
    chatOverlay.addEventListener('click',e=>{if(e.target===chatOverlay)closeChat()});

    const monologue=[
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

    let currentStep=0;

    const typeMessage=(text,el,cb)=>{
        let i=0;
        el.textContent='';
        const t=()=>{
            if(i<text.length){
                el.textContent+=text.charAt(i);
                i++;
                chatMessages.scrollTop=chatMessages.scrollHeight;
                setTimeout(t,30);
            }else if(cb){cb()}
        };
        t();
    };

    const addMessage=(text,cb)=>{
        const m=document.createElement('div');
        m.classList.add('message');
        chatMessages.appendChild(m);
        chatMessages.scrollTop=chatMessages.scrollHeight;
        typeMessage(text,m,cb);
    };

    const showNext=()=>{
        if(currentStep<monologue.length){
            addMessage(monologue[currentStep],()=>{
                currentStep++;
                setTimeout(showNext,2000);
            });
        }
    };

    chatToggle.addEventListener('click',()=>{
        chatMessages.innerHTML='';
        currentStep=0;
        setTimeout(()=>{
            addMessage("Hi, my name is Evangelina, your AI assistant. I’ll help you learn more about the AIvoroFI project.",()=>{
                setTimeout(showNext,2000);
            });
        },500);
    });

    const nftContainer=document.querySelector('.nft-cards');
    const nftWrappers=[...document.querySelectorAll('.nft-position-wrapper')];

    const updatePositions=dir=>{
        nftWrappers.forEach(w=>{
            const pos=w.getAttribute('data-position');
            let newPos;
            if(dir==='left')newPos=pos==='center'?'right':pos==='left'?'center':'left';
            else newPos=pos==='center'?'left':pos==='right'?'center':'right';
            w.setAttribute('data-position',newPos);
        });
    };

    let startX=0;let swapped=false;const threshold=60;
    nftContainer.addEventListener('touchstart',e=>{startX=e.touches[0].clientX});
    nftContainer.addEventListener('touchmove',e=>{if(swapped)return;const dx=e.touches[0].clientX-startX;if(Math.abs(dx)>threshold){updatePositions(dx>0?'right':'left');swapped=true}});
    nftContainer.addEventListener('touchend',()=>{swapped=false});

    nftWrappers.forEach(w=>{
        const card=w.querySelector('.nft-card');
        card.addEventListener('click',()=>{
            if(w.getAttribute('data-position')==='center'){
                let state=parseInt(card.dataset.clickState||'0');
                if(state===0){card.classList.add('zoomed');state=1}
                else if(state===1){card.classList.add('flipped');state=2}
                else{card.classList.remove('zoomed','flipped');state=0}
                card.dataset.clickState=state.toString();
            }
        });
    });

    document.getElementById('mint-btn').addEventListener('click',()=>{window.location.href='nft.html'});

    gsap.from('.hero-slogan',{opacity:0,y:40,duration:1});
    document.querySelectorAll('h2,p,.roadmap-item').forEach(el=>{
        gsap.from(el,{scrollTrigger:{trigger:el,start:'top 80%'},opacity:0,y:40,duration:.5});
    });
});
