
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

  // Mobile navigation.
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

  // Remove the skip button entirely, while preserving the brief intro and automatic transition.
  document.querySelectorAll('.intro-skip').forEach(button=>button.remove());

  // Link the marketing website to the EXISTING KAYA application. Authentication stays in KAYA:
  // each customer uses their own email and receives a secure magic link (no ChatGPT login).
  const kayaUrl='https://kaya-household-finance.bradleyhenekebeard.chatgpt.site';
  const addKayaSignIn=(parent,classes='btn-ghost')=>{
    if(!parent || parent.querySelector('[data-kaya-signin]'))return;
    const link=document.createElement('a');
    link.href=kayaUrl;
    link.className=classes;
    link.textContent='KAYA Sign In';
    link.setAttribute('aria-label','Sign in to KAYA Personal Finance with your own email');
    link.dataset.kayaSignin='true';
    parent.appendChild(link);
    return link;
  };
  if(menu){
    const signIn=addKayaSignIn(menu,'btn-ghost');
    if(signIn)signIn.addEventListener('click',()=>{
      menu.classList.remove('menu-open');
      if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}
    });
  }
  if(document.querySelector('.hero-home')){
    addKayaSignIn(document.querySelector('.hero-home .actions'),'btn-ghost');
    const personalCard=[...document.querySelectorAll('.service-card')].find(card=>card.querySelector('.service-kicker')?.textContent.trim()==='Personal Finance');
    const body=personalCard?.querySelector('.service-body');
    if(body){
      const signIn=addKayaSignIn(body,'service-link kaya-signin-link');
      if(signIn)signIn.textContent='Already using KAYA? Sign in →';
    }
  }
  if(document.title.includes('Personal Finance')){
    addKayaSignIn(document.querySelector('.detail-hero .actions'),'btn');
    const closingActions=document.querySelector('main section:last-of-type .actions');
    addKayaSignIn(closingActions,'btn-ghost');
  }

  // Homepage service overview (the full website and matching letterhead offer lives in websites.html).
  if(document.querySelector('.hero-home')){
    const branding=[...document.querySelectorAll('.service-card')].find(card=>card.querySelector('.service-kicker')?.textContent.trim()==='Websites & Branding');
    const summary=branding?.querySelector('.service-body p');
    if(summary)summary.textContent='We design professional websites and matching company letterheads, with coordinated colours, logos and branded documents so your business looks consistent online and on paper.';
  }

  // Homepage introduction. The animation completes automatically.
  const intro=document.getElementById('arcverse-intro');
  if(intro){
    let finishTimer=null,hideTimer=null,running=false;
    const finish=()=>{
      if(!running)return;
      running=false;clearTimeout(finishTimer);
      intro.classList.add('intro-out');
      document.documentElement.classList.remove('intro-pending');
      intro.setAttribute('aria-hidden','true');
      hideTimer=window.setTimeout(()=>{intro.classList.remove('intro-out');intro.style.display='';},560);
    };
    const start=()=>{
      if(reduce)return;
      clearTimeout(finishTimer);clearTimeout(hideTimer);
      intro.style.display='';intro.classList.remove('intro-out');
      document.documentElement.classList.remove('intro-pending');
      void intro.offsetWidth;
      document.documentElement.classList.add('intro-pending');
      intro.setAttribute('aria-hidden','false');
      running=true;
      finishTimer=window.setTimeout(finish,3900);
    };
    document.querySelectorAll('.intro-replay').forEach(b=>b.addEventListener('click',start));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&running)finish()});
    if(document.documentElement.classList.contains('intro-pending'))start();
    else intro.setAttribute('aria-hidden','true');
  }

  // KAYA walkthrough chapter controls seek within the actual recorded video.
  const chapters=[
    {at:0,name:'Welcome'},{at:13,name:'Sign in securely'},
    {at:34,name:'Set up your household'}, {at:54,name:'Record income'},
    {at:74,name:'Record expenses / receipts'}, {at:94,name:'Monthly bills'},
    {at:109,name:'Accounts and cards'}, {at:129,name:'Check bank statement'},
    {at:149,name:'Export monthly report'}, {at:174,name:'Closing'}
  ];
  document.querySelectorAll('video.kaya-video').forEach(video=>{
    const shell=video.closest('.kaya-video-shell');if(!shell)return;
    const nav=document.createElement('div');
    nav.className='kaya-player-nav';nav.setAttribute('role','group');
    nav.setAttribute('aria-label','KAYA walkthrough chapter controls');
    nav.innerHTML='<button type="button" data-action="start">↺ Start again</button><button type="button" data-action="prev">← Previous screen</button><span class="kaya-current-step" aria-live="polite">01 / 10 · Welcome</span><button type="button" data-action="next">Next screen →</button>';
    video.before(nav);
    const label=nav.querySelector('.kaya-current-step');
    const marks=document.createElement('div');marks.className='kaya-jump-list';
    marks.setAttribute('role','group');marks.setAttribute('aria-label','Jump to a walkthrough screen');
    chapters.forEach((c,i)=>{
      const btn=document.createElement('button');btn.type='button';btn.textContent=`${String(i+1).padStart(2,'0')} · ${c.name}`;
      btn.setAttribute('aria-label',`Jump to screen ${i+1}: ${c.name}`);
      btn.addEventListener('click',()=>seekTo(i));marks.appendChild(btn);
    });
    shell.after(marks);
    let requested=null;
    function currentIndex(){
      let index=0;chapters.forEach((c,i)=>{if(video.currentTime>=c.at-.5)index=i});return index;
    }
    function update(){
      const n=currentIndex();label.textContent=`${String(n+1).padStart(2,'0')} / 10 · ${chapters[n].name}`;
      nav.querySelector('[data-action="prev"]').disabled=n===0;
      nav.querySelector('[data-action="next"]').disabled=n===chapters.length-1;
      marks.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-current',String(i===n))});
    }
    function seekTo(i){
      i=Math.max(0,Math.min(chapters.length-1,i));
      requested=chapters[i].at;
      if(video.readyState===0){video.load();return}
      video.currentTime=requested;
      video.pause();
      requested=null;update();
      const rect=video.getBoundingClientRect();
      if(rect.top<0||rect.top>window.innerHeight-100)nav.scrollIntoView({behavior:'smooth',block:'start'});
    }
    video.addEventListener('loadedmetadata',()=>{if(requested!==null){const t=requested;requested=null;video.currentTime=t;video.pause()}update()});
    video.addEventListener('seeked',update);video.addEventListener('timeupdate',update);
    nav.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;
      if(b.dataset.action==='start')seekTo(0);
      if(b.dataset.action==='prev')seekTo(currentIndex()-1);
      if(b.dataset.action==='next')seekTo(currentIndex()+1);
    });
    update();
  });

  // Load the separate pricing and client-terms module.
  const pricingScript=document.createElement('script');
  pricingScript.src='pricing.js';
  document.body.appendChild(pricingScript);

  // Cloudflare Web Analytics for this ARCVERSE marketing site only (not the separate KAYA app).
  // The token is a public site identifier provided by Cloudflare's manual-install snippet.
  if(!document.querySelector('script[data-cf-beacon]')){
    const analytics=document.createElement('script');
    analytics.type='module';
    analytics.src='https://static.cloudflareinsights.com/beacon.min.js';
    analytics.setAttribute('data-cf-beacon','{"token":"f74b2f0a13594fd7a91d873b880b9d6a"}');
    document.body.appendChild(analytics);
  }

  // Install context-aware WhatsApp enquiry links across marketing pages.
  if(!document.querySelector('script[data-arc-whatsapp-loader]')){
    const whatsapp=document.createElement('script');
    whatsapp.src='whatsapp.js';
    whatsapp.dataset.arcWhatsappLoader='true';
    document.body.appendChild(whatsapp);
  }
})();
