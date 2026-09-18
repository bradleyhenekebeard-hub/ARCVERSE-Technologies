
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

  // Website and letterhead design are offered as one coordinated visual identity.
  if(document.querySelector('main .detail-hero') && document.title.includes('Websites & Branding')){
    const sections=document.querySelectorAll('main section.section');
    const presence=sections[1];
    if(presence){
      const section=document.createElement('section');
      section.className='section';
      section.id='matching-brand-design';
      section.innerHTML='<div class="container"><div class="section-head reveal visible"><p class="kicker">One brand. One professional look.</p><h2>Your website and letterhead, designed to match.</h2><p class="lead">Starting a new business or refreshing an existing one? We can create your website and design a matching company letterhead at the same time. Your logo, colours, typography and overall style carry consistently from your website to quotations, invoices, proposals and official correspondence.</p></div><div class="credibility-strip"><div class="feature-card reveal visible"><h3>Coordinated website design</h3><p>A responsive website built around your company and its visual identity.</p></div><div class="feature-card reveal visible"><h3>Matching letterhead</h3><p>A professional, editable letterhead designed to complement your website and make your business correspondence look consistent.</p></div><div class="feature-card reveal visible"><h3>Consistent brand materials</h3><p>Carry the same identity through company profiles, document templates and other branded materials.</p></div></div></div>';
      presence.after(section);
    }
  }
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
})();
