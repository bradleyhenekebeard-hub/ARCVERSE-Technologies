/* ARCVERSE website portfolio: showcase a completed in-house website without implying an independent client engagement. */
(function () {
  'use strict';
  const main = document.querySelector('main');
  if (!main || document.getElementById('our-work')) return;
  const home = main.querySelector('#solutions');
  const websites = document.title.includes('Websites & Branding');
  const placement = websites ? main.querySelector('#presence') : home;
  if (!placement) return;
  const styles = document.createElement('style');
  styles.textContent = `
    .arc-portfolio-section{background:radial-gradient(ellipse at 50% 50%,rgba(43,109,216,.15),transparent 68%);border-block:1px solid rgba(119,215,255,.12)}
    .arc-portfolio-layout{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:28px;align-items:stretch;max-width:1120px;margin:auto}
    .arc-portfolio-preview{position:relative;min-height:360px;overflow:hidden;border:1px solid rgba(114,214,255,.38);border-radius:26px;background:radial-gradient(circle at 72% 24%,rgba(68,161,255,.3),transparent 34%),linear-gradient(145deg,#061326,#0d2543 62%,#020814);box-shadow:0 20px 65px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.1);display:flex;flex-direction:column}
    .arc-portfolio-preview:before{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(131,207,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(131,207,255,.07) 1px,transparent 1px);background-size:30px 30px;mask-image:linear-gradient(to bottom,black,transparent 84%)}
    .arc-portfolio-browser{position:relative;display:flex;align-items:center;gap:7px;padding:15px 19px;border-bottom:1px solid rgba(145,219,255,.18);color:#b8d9ff;font-size:11px;letter-spacing:.09em}
    .arc-portfolio-browser i{width:8px;height:8px;border-radius:50%;background:#4c80aa}.arc-portfolio-browser span{margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .arc-portfolio-preview-body{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 24px}
    .arc-portfolio-mark{width:108px;height:108px;display:grid;place-items:center;border:1px solid rgba(144,221,255,.66);border-radius:27px;transform:rotate(-8deg);background:linear-gradient(135deg,rgba(72,165,250,.22),rgba(11,20,49,.94));box-shadow:0 0 60px rgba(54,166,255,.24)}
    .arc-portfolio-mark strong{transform:rotate(8deg);font-size:29px;letter-spacing:.11em;color:#eaf7ff}
    .arc-portfolio-preview-body p{font-size:11px;letter-spacing:.25em;font-weight:800;color:#78d7ff;margin:23px 0 10px}
    .arc-portfolio-preview-body h3{font-size:clamp(1.35rem,2.3vw,2rem);line-height:1.1;color:white;max-width:430px;margin:0 auto}
    .arc-portfolio-preview-body small{color:#b0cce3;font-size:12px;letter-spacing:.08em;margin-top:17px}
    .arc-portfolio-copy{display:flex;flex-direction:column;justify-content:center;padding:24px 4px;text-align:center}
    .arc-portfolio-label{font-size:12px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#84dfff;margin:0 auto 14px}
    .arc-portfolio-copy h3{font-size:clamp(1.7rem,3vw,2.35rem);margin:0 auto 14px}
    .arc-portfolio-copy>p{color:var(--muted,#a9b9cf);line-height:1.78;font-size:1rem;margin:0 auto 16px;max-width:470px}
    .arc-portfolio-copy .actions{margin-top:16px}.arc-portfolio-note{font-size:.79rem!important;color:#8299b9!important;line-height:1.5!important;margin-top:15px!important}
    @media(max-width:850px){.arc-portfolio-layout{grid-template-columns:1fr}.arc-portfolio-preview{min-height:320px}.arc-portfolio-copy{padding:12px 0}}
  `;
  document.head.appendChild(styles);
  const section = document.createElement('section');
  section.className = 'section arc-portfolio-section';
  section.id = 'our-work';
  section.setAttribute('aria-labelledby', 'arc-portfolio-heading');
  section.innerHTML = `
    <div class="container">
      <div class="section-head"><p class="kicker">OUR WORK · LIVE WEBSITE SHOWCASE</p><h2 id="arc-portfolio-heading">See a website we've built.</h2><p class="lead">A real, completed corporate website you can explore for yourself.</p></div>
      <div class="arc-portfolio-layout">
        <a class="arc-portfolio-preview" href="https://beardstrategicholdings.net/" target="_blank" rel="noopener noreferrer" aria-label="Open the live BSH corporate website in a new tab">
          <div class="arc-portfolio-browser"><i></i><i></i><i></i><span>beardstrategicholdings.net ↗</span></div>
          <div class="arc-portfolio-preview-body"><div class="arc-portfolio-mark"><strong>BSH</strong></div><p>GLOBAL COMMODITIES</p><h3>CONNECTED BY TECHNOLOGY.</h3><small>BSH / ARCVERSE TECHNOLOGIES</small></div>
        </a>
        <div class="arc-portfolio-copy"><p class="arc-portfolio-label">FEATURED PROJECT · WEBSITE DESIGN</p><h3>BSH — a professional website for a commodities trading company.</h3><p>ARCVERSE TECHNOLOGIES designed this in-house corporate website for Beard Strategic Holdings. Explore its branding, mobile-responsive pages, commodities information, international buyer enquiries and WhatsApp contact options.</p><p>See how a complete business website can bring company information, services and enquiries together in one professional digital presence.</p><div class="actions"><a class="btn" href="https://beardstrategicholdings.net/" target="_blank" rel="noopener noreferrer">View the live BSH website ↗</a><a class="btn-ghost" href="${websites ? 'index.html#contact' : 'websites.html'}">${websites ? 'Enquire about your website' : 'Explore our website services'}</a></div><p class="arc-portfolio-note">In-house portfolio project. The remote-deal workflow described on BSH is a concept, not a claim that a transaction platform or inspection service is operational.</p></div>
      </div>
    </div>`;
  placement.after(section);
  if (websites) {
    const actions = main.querySelector('.detail-hero .actions');
    if (actions && !actions.querySelector('[data-arc-portfolio-cta]')) {
      const link = document.createElement('a');
      link.className = 'btn-ghost';
      link.href = '#our-work';
      link.textContent = 'View Our Completed Work →';
      link.dataset.arcPortfolioCta = 'true';
      actions.appendChild(link);
    }
  }
  if (home) {
    const websiteCard = Array.from(main.querySelectorAll('.service-card')).find(card => card.querySelector('.service-kicker')?.textContent.trim() === 'Websites & Branding');
    const body = websiteCard?.querySelector('.service-body');
    if (body && !body.querySelector('[data-arc-portfolio-cta]')) {
      const link = document.createElement('a');
      link.className = 'service-link';
      link.href = '#our-work';
      link.textContent = 'See a completed website →';
      link.dataset.arcPortfolioCta = 'true';
      body.appendChild(link);
    }
  }
})();
