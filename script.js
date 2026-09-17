
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length>1){
        const el=document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
      }
    });
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, {threshold:0.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  document.querySelectorAll('.service-card, .pillar-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - .5) * -4;
      const ry = ((x / rect.width) - .5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
  });
})();
