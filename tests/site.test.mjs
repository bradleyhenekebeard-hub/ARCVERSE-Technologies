import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
