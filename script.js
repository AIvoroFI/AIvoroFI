gsap.registerPlugin(ScrollTrigger);
gsap.ticker.fps(60);

document.addEventListener('DOMContentLoaded',()=>{
  /* NFT carousel */
  const nftPositionWrappers=document.querySelectorAll('.nft-position-wrapper');
  const nftCards=document.querySelectorAll('.nft-card');
  let positions=['center','right','left'];
  let startX=0;let hasSwapped=false;const threshold=50;

  nftCards.forEach(card=>{card.dataset.clickState='0'});
  nftPositionWrappers.forEach((wrapper,i)=>wrapper.setAttribute('data-position',positions[i]));

  const updatePositions=direction=>{
    if(direction==='right')positions=positions.slice(1).concat(positions[0]);
    else if(direction==='left')positions=[positions[2],...positions.slice(0,2)];
    nftPositionWrappers.forEach((wrapper,i)=>{
      wrapper.setAttribute('data-position',positions[i]);
      const card=wrapper.querySelector('.nft-card');
      card.dataset.clickState='0';
      card.classList.remove('zoomed','flipped');
    });
  };

  const nftContainer=document.querySelector('.nft-cards');
  let isDragging=false;
  const startDrag=x=>{isDragging=true;startX=x;hasSwapped=false};
  const moveDrag=x=>{
    if(!isDragging||hasSwapped)return;const delta=x-startX;if(Math.abs(delta)>threshold){updatePositions(delta>0?'right':'left');hasSwapped=true;}}
  const endDrag=()=>{isDragging=false;hasSwapped=false};

  nftContainer.addEventListener('mousedown',e=>{if(e.target.closest('.nft-position-wrapper')?.dataset.position==='center')return;startDrag(e.clientX)});
  nftContainer.addEventListener('mousemove',e=>moveDrag(e.clientX));
  nftContainer.addEventListener('mouseup',endDrag);
  nftContainer.addEventListener('mouseleave',endDrag);
  nftContainer.addEventListener('touchstart',e=>startDrag(e.touches[0].clientX));
  nftContainer.addEventListener('touchmove',e=>moveDrag(e.touches[0].clientX));
  nftContainer.addEventListener('touchend',endDrag);

  /* click zoom / flip */
  nftCards.forEach(card=>{
    card.addEventListener('click',()=>{
      if(card.closest('.nft-position-wrapper')?.dataset.position!=='center')return;
      const state=parseInt(card.dataset.clickState);
      if(state===0){card.classList.add('zoomed');card.dataset.clickState='1'}
      else if(state===1){card.classList.add('flipped');card.dataset.clickState='2'}
      else{card.classList.remove('flipped','zoomed');card.dataset.clickState='0'}
    });
  });

  /* Mint btn -> nft.html */
  document.getElementById('mint-btn').addEventListener('click',()=>{window.location.href='nft.html'});

  /* AI Chat */
  const chatToggle=document.getElementById('chat-toggle');
  const chatOverlay=document.getElementById('chat-overlay');
  const chatClose=document.getElementById('chat-close');
  const chatMessages=document.getElementById('chat-messages');

  const monologue=[
    "Let me tell you about AIvoroFI. We’re an innovative decentralized finance platform merging AI with yield aggregation…",
    "What sets us apart from other DeFi projects? Unlike protocols that focus on a single chain, we optimise across many…",
    "Our NFTs provide real utility — boosted APR, rental markets, governance tiers and more…",
    "That’s all for now! If you’d like more details, just reach out on our socials."
  ];
  let currentStep=0;

  const typeMessage=(text,el,cb)=>{let i=0;el.textContent='';const tick=()=>{if(i<text.length){el.textContent+=text.charAt(i++);chatMessages.scrollTop=chatMessages.scrollHeight;setTimeout(tick,25)}else if(cb)cb();};tick();};
  const addMessage=(text,cb)=>{const div=document.createElement('div');div.className='message';chatMessages.appendChild(div);typeMessage(text,div,cb);};
  const showNextMsg=()=>{if(currentStep<monologue.length){addMessage(monologue[currentStep++],()=>setTimeout(showNextMsg,1500));}};

  chatToggle.addEventListener('click',()=>{chatOverlay.style.display='flex';document.body.classList.add('no-scroll');chatMessages.innerHTML='';currentStep=0;setTimeout(()=>{addMessage('Hi, I’m Evangelina, your AI assistant.',()=>setTimeout(showNextMsg,1500));},400);});
  chatClose.addEventListener('click',()=>{chatOverlay.style.display='none';document.body.classList.remove('no-scroll');});
  chatOverlay.addEventListener('click',e=>{if(e.target===chatOverlay){chatOverlay.style.display='none';document.body.classList.remove('no-scroll');}});

  /* GSAP reveals */
  gsap.from('.hero-slogan',{opacity:0,y:40,duration:1});
  gsap.utils.toArray('h2, p, .roadmap-item').forEach(el=>{ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:()=>el.classList.add('visible')});});
});
