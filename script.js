
(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduce){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

  document.querySelectorAll('.service-card,.feature-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(reduce || window.innerWidth<900) return;
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(950px) rotateX(${(-y*3.5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });

  // Mobile navigation: existing site previously hid all links below 1000px.
  const toggle=document.querySelector('.nav-toggle');
  const menu=document.getElementById('site-nav');
  if(toggle && menu){
    const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');menu.classList.remove('menu-open')};
    toggle.addEventListener('click',()=>{
      const opening=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',String(opening));
      toggle.setAttribute('aria-label',opening?'Close navigation':'Open navigation');
      menu.classList.toggle('menu-open',opening);
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu()});
    document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target)) closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>1190) closeMenu()});
  }

  // Silent cinematic welcome: once per session, only on Home, skip immediately possible.
  const intro=document.getElementById('arcverse-intro');
  if(intro && document.documentElement.classList.contains('intro-pending')){
    let completed=false;
    let finishTimer;
    const complete=()=>{
      if(completed) return;
      completed=true;
      clearTimeout(finishTimer);
      intro.classList.add('intro-out');
      document.documentElement.classList.remove('intro-pending');
      intro.setAttribute('aria-hidden','true');
      window.setTimeout(()=>intro.remove(),570);
    };
    try { sessionStorage.setItem('arcverse_intro_seen','1'); } catch(e) { /* Browsers can disable session storage. */ }
    intro.setAttribute('aria-hidden','false');
    const skip=intro.querySelector('.intro-skip');
    if(skip) skip.addEventListener('click',complete);
    finishTimer=window.setTimeout(complete,3550);
  }
})();
