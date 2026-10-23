import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const visibleText = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ')
  .trim();

test('homepage visibly covers the operational problems ARCVERSE is asked to solve', async () => {
  const text = visibleText(await read('index.html'));
  const required = [
    /filing/i,
    /document management/i,
    /contracts/i,
    /bookkeeping workflows/i,
    /logistics/i,
    /operational finance/i,
    /automation/i,
    /security/i,
    /tenders/i,
    /RFPs/i,
  ];
  for (const pattern of required) {
    assert.match(text, pattern, `Missing visible use-case language: ${pattern}`);
  }
});

test('VELA is visibly framed as proposed and in development without readiness claims', async () => {
  const html = await read('index.html');
  const vela = html.match(/<section\b[^>]*id=["']vela["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? '';
  const text = visibleText(vela);

  assert.match(text, /Proposed\s*\/\s*In development/i);
  assert.match(text, /capabilities, integrations, certifications and availability are not confirmed/i);
  assert.doesNotMatch(text, /certified|production[- ]ready|available now|fully integrated/i);
});

test('brand, destinations, and draft-only enquiry safeguards remain available', async () => {
  const html = await read('index.html');
  const text = visibleText(html);

  assert.match(text, /Powered by AI\. Guided by Faith\./);
  for (const href of [
    'business.html',
    'personal.html',
    'websites.html',
    'pricing.html',
    'walkthrough.html',
    'mailto:solutions@arcverse.digital',
    'https://wa.me/27764224935',
  ]) {
    assert.match(html, new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  }
  assert.match(text, /does not automatically submit your information/i);
  assert.match(html, /id=["']challenge-form["']/i);
  assert.match(html, /id=["']challenge-whatsapp["']/i);
});

test('homepage has a single primary heading and complete landmarks and fragment targets', async () => {
  const html = await read('index.html');
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  for (const landmark of ['<header', '<nav', '<main', '<footer', '<form']) {
    assert.match(html, new RegExp(landmark, 'i'));
  }

  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  const fragments = [...html.matchAll(/href=["'](?:index\.html)?#([^"']+)["']/gi)].map((match) => match[1]);
  for (const fragment of fragments) {
    assert.ok(ids.has(fragment), `Missing fragment target #${fragment}`);
  }
});

test('landing hero removes the problem brief and restores the motion-safe ARCVERSE welcome', async () => {
  const html = await read('index.html');
  const css = await read('redesign.css');
  const text = visibleText(html);

  assert.match(text, /Turn operational friction into systems that work\./i);
  assert.doesNotMatch(html, /class=["'][^"']*hero-brief/i);
  assert.doesNotMatch(html, /brief-topline|brief-list|brief-outcome/i);
  assert.match(html, /id=["']arcverse-intro["']/i);
  assert.match(html, /class=["'][^"']*intro-overlay/i);
  assert.match(html, /prefers-reduced-motion:\s*reduce/i);
  assert.match(html, /classList\.add\(["']intro-pending["']\)/i);
  assert.match(html, /setTimeout\([\s\S]*classList\.remove\(["']intro-pending["']\)/i);
  assert.match(css, /\.hero-shell\s*\{[^}]*display\s*:\s*grid/is);
});

test('landing hero uses one intentionally centred composition', async () => {
  const css = await read('redesign.css');

  assert.match(css, /\.hero-shell\s*\{[^}]*place-items\s*:\s*center[^}]*text-align\s*:\s*center/is);
  assert.match(css, /\.hero-copy-block\s*\{[^}]*margin\s*:\s*0\s+auto/is);
  assert.match(css, /\.hero-copy-block\s+\.eyebrow\s*\{[^}]*text-align\s*:\s*center/is);
  assert.match(css, /\.hero-copy-block\s+h1\s*\{[^}]*margin\s*:\s*0\s+auto[^}]*text-align\s*:\s*center/is);
  assert.match(css, /\.hero-lead\s*\{[^}]*margin\s*:\s*28px\s+auto\s+0[^}]*text-align\s*:\s*center/is);
  assert.match(css, /\.hero-actions\s*\{[^}]*justify-content\s*:\s*center/is);
  assert.match(css, /\.hero-principles\s*\{[^}]*justify-content\s*:\s*center[^}]*margin\s*:\s*38px\s+auto\s+0/is);
  assert.match(css, /\.hero-copy-block\s+\.brand-tagline\s*\{[^}]*text-align\s*:\s*center!important/is);
});

test('landing hero opens without oversized vertical dead space', async () => {
  const css = await read('redesign.css');

  assert.match(css, /\.hero-home\.solution-hero\s*\{[^}]*padding\s*:\s*clamp\(52px,5\.5vw,76px\)\s+0\s+clamp\(64px,6vw,84px\)[^}]*min-height\s*:\s*0/is);
  assert.doesNotMatch(css, /\.hero-home\.solution-hero\s*\{[^}]*min-height\s*:\s*720px/is);
});

test('welcome screen uses one clean text colour without highlighted words', async () => {
  const html = await read('index.html');
  const css = await read('styles.css');

  assert.match(html, /href=["']styles\.css\?v=20261023a["']/i);
  assert.match(css, /\.intro-message\s+strong\s+em\s*\{[^}]*background\s*:\s*none[^}]*color\s*:\s*#f4fbff/is);
  assert.doesNotMatch(css, /\.intro-message\s+strong\s+em\s*\{[^}]*linear-gradient/is);
  assert.match(css, /\.intro-tagline\s+b\s*\{[^}]*color\s*:\s*inherit/is);
});

test('problems section presents its introduction as one centred composition', async () => {
  const html = await read('index.html');
  const css = await read('redesign.css');
  const problems = html.match(/<section\b[^>]*id=["']problems["'][\s\S]*?<\/section>/i)?.[0] ?? '';

  assert.match(problems, /class=["'][^"']*section-head[^"']*["']/i);
  assert.doesNotMatch(problems, /section-head-split/i);
  assert.match(css, /\.section-head\s*\{[^}]*max-width\s*:\s*920px[^}]*text-align\s*:\s*center/is);
});

test('homepage exposes canonical search and social metadata plus structured organisation data', async () => {
  const html = await read('index.html');
  assert.match(html, /<title>[^<]*ARCVERSE TECHNOLOGIES[^<]*<\/title>/i);
  assert.match(html, /<meta\s+name=["']description["']\s+content=["'][^"']{100,}/i);
  assert.match(html, /<link\s+rel=["']canonical["']\s+href=["']https:\/\/arcverse\.digital\/["']/i);
  assert.match(html, /property=["']og:title["']/i);
  assert.match(html, /property=["']og:description["']/i);
  assert.match(html, /<script\s+type=["']application\/ld\+json["']>/i);
  assert.match(html, /"@type"\s*:\s*"ProfessionalService"/i);
  assert.doesNotMatch(html, /"@type"\s*:\s*"Product"[\s\S]*VELA/i);
});

test('premium stylesheet defines the new responsive homepage components', async () => {
  const css = await read('redesign.css');
  for (const selector of [
    '.hero-shell',
    '.premium-grid',
    '.tender-layout',
    '.vela-shell',
    '.nav-status',
  ]) {
    assert.match(css, new RegExp(selector.replace('.', '\\.')));
  }
  assert.match(css, /font-size\s*:\s*clamp\(/i);
  assert.match(css, /@media\s*\(max-width\s*:\s*(?:7\d\d|6\d\d)px\)/i);
  assert.match(css, /overflow-x\s*:\s*(?:clip|hidden)/i);
  assert.match(css, /\.board-header\s*\{[^}]*display\s*:\s*flex[^}]*border-bottom/is);
});

test('premium stylesheet keeps keyboard focus and reduced-motion behaviour explicit', async () => {
  const css = await read('redesign.css');
  assert.match(css, /:focus-visible/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion\s*:\s*reduce\)/i);
  assert.match(css, /\.reveal\s*\{[^}]*opacity\s*:\s*1[^}]*transform\s*:\s*none/is);
});

test('shared stylesheet continues to cover established secondary-page components', async () => {
  const css = await read('redesign.css');
  for (const selector of ['.solution-detail-hero', '.service-truth', '.price-card', '.terms-panel', '.demo-preview', '.new-footer']) {
    assert.match(css, new RegExp(selector.replace('.', '\\.')));
  }
});

test('homepage presents one floating WhatsApp path without injecting a third hero action', async () => {
  const html = await read('index.html');
  const whatsapp = await read('whatsapp.js');
  const staticFloat = /class=["'][^"']*whatsapp-float/.test(html) ? 1 : 0;
  const injectedFloat = /arc-whatsapp-float/.test(whatsapp) ? 1 : 0;

  assert.equal(staticFloat + injectedFloat, 1, 'Exactly one floating WhatsApp implementation should be active');
  assert.doesNotMatch(whatsapp, /add\(document\.querySelector\('\.hero-home \.actions'\)/);
  assert.match(whatsapp, /arc-whatsapp-float/);
  assert.match(await read('script.js'), /whatsapp\.js\?v=20261023a/);
});

test('every marketing page that uses the premium system loads the current version', async () => {
  const pages = ['index.html', 'business.html', 'personal.html', 'pricing.html', 'websites.html', 'kaya-walkthrough.html'];
  for (const page of pages) {
    const html = await read(page);
    assert.match(html, /href=["']redesign\.css\?v=20261023e["']/i, `${page} has a stale premium stylesheet reference`);
    assert.match(html, /src=["']script\.js\?v=20261023b["']/i, `${page} has a stale main-script reference`);
  }
});

test('root HTML pages do not link to missing local files', async () => {
  const pages = (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name);

  for (const page of pages) {
    const html = await read(page);
    const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
    for (const href of hrefs) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(href)) continue;
      const target = decodeURIComponent(href.split(/[?#]/, 1)[0]);
      if (!target) continue;
      await assert.doesNotReject(access(new URL(target, root)), `${page} links to missing local file ${target}`);
    }
  }
});

test('enquiry helper prepares user-controlled drafts without background submission', async () => {
  const html = await read('index.html');
  const script = await read('contact-enquiry.js');
  assert.doesNotMatch(html, /<button\s+type=["']submit["']/i);
  assert.match(html, /id=["']challenge-email["'][^>]*\bdisabled\b/i);
  assert.match(html, /id=["']challenge-whatsapp["'][^>]*\bdisabled\b/i);
  assert.match(html, /<noscript>[\s\S]*direct email or WhatsApp links/i);
  assert.match(script, /preventDefault\(\)/);
  assert.match(script, /challenge-email/);
  assert.match(script, /\.disabled\s*=\s*false/);
  assert.match(script, /mailto:/);
  assert.match(script, /window\.open\(/);
  assert.doesNotMatch(script, /\bfetch\s*\(|XMLHttpRequest|sendBeacon/i);
});

test('essential content and navigation remain visible before JavaScript enhancement', async () => {
  const css = await read('redesign.css');
  const script = await read('script.js');

  assert.match(css, /\.reveal\s*\{[^}]*opacity\s*:\s*1[^}]*transform\s*:\s*none/is);
  assert.match(css, /\.js\s+\.reveal\s*\{[^}]*opacity\s*:\s*0/is);
  assert.match(css, /@media\s*\(max-width\s*:\s*1160px\)[\s\S]*?\.nav\s+\.nav-links\s*\{[^}]*display\s*:\s*flex/is);
  assert.match(css, /\.js\s+\.nav\s+\.nav-links\s*\{[^}]*display\s*:\s*none/is);
  assert.match(script, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
});
