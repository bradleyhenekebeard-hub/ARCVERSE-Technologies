/* ARCVERSE marketing-site WhatsApp enquiries. No changes to the separate KAYA application. */
(function () {
  'use strict';
  const phone = '27764224935';
  const enquiries = {
    general: 'Hi ARCVERSE, I would like to enquire about your services.',
    business: 'Hi ARCVERSE, I would like more information about Business AI and to arrange a demonstration.',
    personal: 'Hi ARCVERSE, I would like more information about your home and personal finance application.',
    websites: 'Hi ARCVERSE, I am interested in a professional website and matching letterhead. Please send me more information.'
  };
  const href = type => `https://wa.me/${phone}?text=${encodeURIComponent(enquiries[type] || enquiries.general)}`;
  const makeLink = (type, label, className) => {
    const a = document.createElement('a');
    a.href = href(type);
    a.className = className;
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `${label} — opens WhatsApp with an ARCVERSE ${type === 'general' ? '' : type + ' '}enquiry message`);
    a.dataset.arcWhatsapp = type;
    return a;
  };
  const add = (parent, type, label = 'Enquire on WhatsApp') => {
    if (parent && !parent.querySelector('[data-arc-whatsapp]')) {
      parent.appendChild(makeLink(type, label, 'btn-ghost arc-whatsapp-cta'));
    }
  };
  const style = document.createElement('style');
  style.textContent = `
    .arc-whatsapp-cta{border-color:#49d58c!important;gap:.45rem}
    .arc-whatsapp-cta::before{content:'\u25cf';color:#49d58c;font-size:.85em}
    .arc-whatsapp-cta:hover,.arc-whatsapp-cta:focus-visible{background:rgba(37,211,102,.15)!important;border-color:#25d366!important}
    .arc-whatsapp-float{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:150;display:inline-flex;align-items:center;justify-content:center;gap:9px;background:#1a9c50;color:#fff;border:2px solid #c7f8d9;border-radius:999px;padding:13px 19px;font:700 15px/1.2 Inter,'Segoe UI',Arial,sans-serif;box-shadow:0 6px 26px rgba(0,0,0,.45);text-decoration:none}
    .arc-whatsapp-float::before{content:'\u2709';font-size:20px;line-height:1}
    .arc-whatsapp-float:hover{background:#157c40;transform:translateY(-2px);color:#fff}
    .arc-whatsapp-float:focus-visible,.arc-whatsapp-cta:focus-visible{outline:3px solid #fff;outline-offset:3px}
    @media(max-width:600px){.arc-whatsapp-float{padding:12px 16px;font-size:13px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom))}}
  `;
  document.head.appendChild(style);

  if (document.querySelector('.hero-home')) {
    add(document.querySelector('.hero-home .actions'), 'general', 'Chat to ARCVERSE on WhatsApp');
    document.querySelectorAll('.service-card').forEach(card => {
      const label = card.querySelector('.service-kicker')?.textContent.trim();
      const type = label === 'Business AI' ? 'business' : label === 'Personal Finance' ? 'personal' : label === 'Websites & Branding' ? 'websites' : null;
      if (type) add(card.querySelector('.service-body'), type, 'Ask about this on WhatsApp');
    });
    add(document.querySelector('#contact .actions'), 'general', 'Chat on WhatsApp');
  }
  let current = 'general';
  if (document.title.includes('Business AI')) {
    current = 'business';
    add(document.querySelector('.business-hero .actions'), current);
  } else if (document.title.includes('Personal Finance') || document.title.includes('KAYA in Action')) {
    current = 'personal';
    add(document.querySelector('.detail-hero .actions'), current);
  } else if (document.title.includes('Websites & Branding')) {
    current = 'websites';
    add(document.querySelector('.detail-hero .actions'), current);
  }
  if (current !== 'general') add(document.querySelector('main section:last-of-type .actions'), current);
  if (!document.querySelector('.arc-whatsapp-float')) {
    const floating = makeLink(current, 'Chat on WhatsApp', 'arc-whatsapp-float');
    document.body.appendChild(floating);
  }

  // Load the independent, in-house website portfolio showcase without modifying service pricing or KAYA.
  if (!document.querySelector('script[data-arc-portfolio-loader]')) {
    const portfolio = document.createElement('script');
    portfolio.src = 'portfolio.js?v=bsh-20260920';
    portfolio.dataset.arcPortfolioLoader = 'true';
    document.body.appendChild(portfolio);
  }
})();
