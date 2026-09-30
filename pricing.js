/* ARCVERSE pricing and client terms: review branch only. The marketing page does not process payments or enforce AI limits. */
(function () {
  'use strict';
  const email = 'solutions@arcverse.digital';
  const oldEmail = 'solutions@arcverse.co.za';
  const enquiry = (subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'pricing.css';
  document.head.appendChild(style);

  // The .co.za address was a placeholder and is not owned by ARCVERSE.
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(oldEmail)) link.setAttribute('href', href.replaceAll(oldEmail, email));
    if (link.textContent.includes(oldEmail)) link.textContent = link.textContent.replaceAll(oldEmail, email);
  });

  const main = document.querySelector('main');
  if (!main) return;
  const beforeClosingCTA = (section) => {
    const closing = main.querySelector('section:last-of-type');
    if (closing) closing.before(section);
    else main.append(section);
  };
  const section = (id, heading, intro, markup, kicker = 'ARCVERSE PRICING') => {
    const el = document.createElement('section');
    el.id = id;
    el.className = 'section arc-pricing-section';
    el.setAttribute('aria-labelledby', `${id}-heading`);
    el.innerHTML = `<div class="container"><div class="section-head"><p class="kicker">${kicker}</p><h2 id="${id}-heading">${heading}</h2><p class="lead">${intro}</p></div>${markup}</div>`;
    return el;
  };
  const card = ({title, label, price, detail, setup, features, link, button = 'Enquire about this package'}) =>
    `<article class="arc-price-card"><p class="service-kicker">${label}</p><h3>${title}</h3><p class="arc-price">${price}</p><p class="arc-price-detail">${detail}</p>${setup ? `<p class="arc-setup">${setup}</p>` : ''}<ul>${features.map(f => `<li>${f}</li>`).join('')}</ul><a class="btn" href="${link}">${button}</a></article>`;
  const nav = document.querySelector('#site-nav');
  if (nav && !nav.querySelector('[data-arc-pricing-link]')) {
    const item = document.createElement('a');
    item.dataset.arcPricingLink = 'true';
    item.href = main.querySelector('.hero-home') ? '#pricing' :
      (document.title.includes('Business AI') || document.title.includes('Personal Finance') || document.title.includes('Websites & Branding')) ? '#pricing' : 'index.html#pricing';
    item.textContent = 'Pricing';
    nav.insertBefore(item, nav.querySelector('.btn-ghost') || null);
    // The existing mobile navigation code was bound before this link was added.
    item.addEventListener('click', () => {
      nav.classList.remove('menu-open');
      document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }

  if (main.querySelector('.hero-home')) {
    beforeClosingCTA(section('pricing', 'Clear prices for three distinct services.', 'Choose a service to see exactly what is included. Monthly software subscriptions are payable in advance; website and branding projects are priced once-off.',
      `<div class="arc-price-grid">${[
        card({title:'Business AI',label:'Business operating system',price:'Tailored quotation',detail:'Pricing is based on your business requirements and agreed scope',features:['Built around your workflows, users and operational needs','Modules, automations and integrations scoped before implementation','Written proposal and quotation provided after consultation'],link:'business.html#pricing',button:'Request a Business AI consultation'}),
        card({title:'Personal Finance',label:'KAYA household finance',price:'From R199 / month',detail:'14-day free trial · No setup fee · Monthly in advance',features:['Personal and Family options','Up to five household members on Family','No annual subscription required or offered'],link:'personal.html#pricing',button:'Compare Personal Finance packages'}),
        card({title:'Websites & Branding',label:'One-off project pricing',price:'From R2,999',detail:'One-off project fee · Scope confirmed by quotation',features:['One-page websites to complete brand packages','Matching editable letterheads in selected packages','Domain, hosting and email costs separate unless quoted'],link:'websites.html#pricing',button:'Compare website packages'})
      ].join('')}</div><p class="arc-pricing-footnote">Package availability, implementation scope, any applicable VAT and third-party charges are confirmed in your quotation. No payment or subscription is taken through this website.</p>`));
  }

  if (document.title.includes('Business AI')) {
    main.querySelector('.business-hero .actions')?.insertAdjacentHTML('beforeend', '<a class="btn-ghost" href="#pricing">Request a Tailored Quote</a>');
    beforeClosingCTA(section('pricing', 'Business AI is priced to your requirements.', 'There is no fixed Business AI price. Every system is scoped around your business, the number of users, required modules, automations, integrations, implementation complexity and support requirements.',
      `<div class="arc-price-grid"><article class="arc-price-card"><p class="service-kicker">TAILORED BUSINESS SYSTEM</p><h3>Custom Business AI Solution</h3><p class="arc-price">Quotation based</p><p class="arc-price-detail">We first understand what your business needs, then define the system and price it accordingly.</p><ul><li>Business workflows, users and permissions</li><li>Required modules, dashboards and automations</li><li>Third-party integrations where technically supported</li><li>AI usage, implementation, support and ongoing requirements</li></ul><a class="btn" href="${enquiry('ARCVERSE Business AI consultation and quotation')}">Request a Business AI consultation</a></article></div><div class="arc-terms"><h3>How Business AI pricing works</h3><p>ARCVERSE does not use a single fixed price for Business AI because one company may need a focused system while another may require multiple departments, integrations, automations and advanced workflows.</p><p>After a consultation, we provide a written scope and quotation covering the agreed implementation, any recurring subscription or support charges, third-party costs where applicable, and the functionality included.</p><p>Capabilities and delivery dates are confirmed in the written scope. Demonstrations and planned features must not be treated as proof that every integration or feature is already operational.</p></div>`));
    const changes = section('change-requests', 'Your system can grow with your business.', 'Request additional functionality as your needs change. Your agreed subscription or support arrangement covers the defined system, not unlimited software development.',
      `<div class="arc-price-grid arc-change-grid"><article class="arc-price-card"><p class="service-kicker">A · Included</p><h3>Everyday use & defect correction</h3><p>Use existing features to add employees or suppliers, update company details and create documents. Faults in functionality ARCVERSE has agreed to deliver are handled under the applicable support terms, not reclassified as paid enhancements.</p><p class="arc-setup">No additional development charge for these included activities.</p></article><article class="arc-price-card"><p class="service-kicker">B · Assessed</p><h3>Minor modifications</h3><p>Examples include adding a field to an existing form, adjusting a report, changing a document template or modifying an existing workflow.</p><p class="arc-setup">If outside your agreed scope, we provide a quotation for written approval before work begins.</p></article><article class="arc-price-card"><p class="service-kicker">C · Separate quotation</p><h3>New modules & integrations</h3><p>Examples include warehouse management, stock control, new dashboards, additional departments and third-party or paid-API integrations.</p><p class="arc-setup">Scope, price, timing and any recurring costs must be approved in writing before development.</p></article></div><div class="arc-terms"><h3>How a change request works</h3><ol><li>Submit your request.</li><li>ARCVERSE assesses whether it is included support, a defect or additional work.</li><li>For chargeable work, you receive a written scope and quotation including any ongoing or third-party costs.</li><li>An authorised customer representative approves the quote and agreed payment terms are satisfied.</li><li>ARCVERSE develops and tests the agreed change.</li><li>You review and accept the completed deliverables.</li></ol><p>Subscription price increases require your agreement. Delivery dates, ownership of custom work and detailed support commitments are defined in the customer contract.</p><a class="btn" href="${enquiry('ARCVERSE system change request')}">Request a System Change</a></div>`, 'CUSTOMISATION & SUPPORT');
    main.querySelector('#pricing')?.after(changes);
  }

  if (document.title.includes('Personal Finance')) {
    main.querySelector('.detail-hero .actions')?.insertAdjacentHTML('beforeend', '<a class="btn-ghost" href="#pricing">View Personal Finance Pricing</a>');
    beforeClosingCTA(section('pricing', 'Simple monthly household pricing.', 'Choose Personal or Family. Pay at the beginning of each subscription month, before using the paid service. No annual plans and no setup fees.',
      `<div class="arc-price-grid">${[
        card({title:'Free Trial',label:'Explore KAYA',price:'R0',detail:'14 days · No setup fee',features:['Try the available demonstration or trial features','Trial access and limitations confirmed at sign-up','No automatic conversion to paid access without your agreement'],link:enquiry('KAYA free trial enquiry'),button:'Ask about the free trial'}),
        card({title:'Personal',label:'One person',price:'R199 / month',detail:'Prepaid monthly · No setup fee · 1 user',features:['Income and expense tracking','Receipt uploads, budgets and basic reports','Defined document and AI usage allowance'],link:enquiry('KAYA Personal enquiry')}),
        card({title:'Family',label:'Whole household',price:'R249 / month',detail:'Prepaid monthly · No setup fee · Up to 5 members',features:['Shared budget and household receipt capture','Bank statement reconciliation and unmatched transactions','Savings goals and Excel exports','Defined shared document and AI usage allowance'],link:enquiry('KAYA Family enquiry')})
      ].join('')}</div><div class="arc-terms"><h3>Pay first, then use</h3><p>All paid subscriptions are billed <strong>monthly in advance</strong>. Your selected paid subscription begins after successful payment and lasts for the paid subscription period. Payment for the following period is due before it begins; billing is not in arrears. Annual subscriptions are not offered.</p><p>The free trial does not automatically become a paid subscription without your agreement. Each paid package includes defined document and AI usage, to be confirmed before sign-up. Extra usage is never charged automatically without authorisation.</p><p>This page presents package information only: it does not collect payments, start trials or activate a subscription. Availability and the exact service terms must be confirmed before purchase.</p></div>`));
  }

  if (document.title.includes('Websites & Branding')) {
    main.querySelector('.detail-hero .actions')?.insertAdjacentHTML('beforeend', '<a class="btn-ghost" href="#pricing">View Website Packages</a>');
    beforeClosingCTA(section('pricing', 'Websites & Branding packages.', 'Once-off project pricing. Choose a website or a coordinated identity with a matching editable letterhead. Your deliverables and schedule are confirmed in a quotation.',
      `<div class="arc-price-grid">${[
        card({title:'Digital Starter',label:'Launch package',price:'R2,999 once-off',detail:'One-page website · 2 revision rounds',features:['Professional mobile-responsive one-page website','Contact details and WhatsApp link','Basic SEO setup and domain connection'],link:enquiry('ARCVERSE Digital Starter quotation'),button:'Request a quotation'}),
        card({title:'Business Identity',label:'Website + letterhead',price:'R7,999 once-off',detail:'Up to 5 pages · 2 revision rounds',features:['Custom colours, styling and mobile optimisation','Matching, editable Microsoft Word letterhead','Contact and enquiry features','Basic SEO configuration'],link:enquiry('ARCVERSE Business Identity quotation'),button:'Request a quotation'}),
        card({title:'Premium Brand',label:'Complete business presence',price:'R11,999 once-off',detail:'Up to 8 pages · 3 revision rounds',features:['Coordinated brand identity and scoped logo work','Matching editable letterhead and email signature','Branded quote and invoice templates','Basic company profile template'],link:enquiry('ARCVERSE Premium Brand quotation'),button:'Request a quotation'})
      ].join('')}</div><div class="arc-terms"><h3>One identity across your website and paperwork</h3><p>Business Identity and Premium Brand include matching, editable letterheads. We coordinate website design, logo, colours and typography so business correspondence and digital presence look consistent.</p><p><strong>Not automatically included:</strong> domain registration or renewal, hosting, email hosting, premium third-party services, extra pages, revisions beyond the agreed number, ongoing maintenance and future custom development. These are charged separately unless your written quotation expressly includes them.</p><p>Project milestones, payment schedule, scope, ownership and any applicable VAT are confirmed in your quotation. No ongoing website-maintenance price is offered on this page.</p></div>`));
  }
})();
