# ARCVERSE Premium Enterprise Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a premium, enterprise-grade ARCVERSE homepage and shared presentation layer that leads with business problem diagnosis, covers the requested use cases, and describes VELA safely as proposed/in development.

**Architecture:** Keep the existing dependency-free static site. Replace the homepage information hierarchy in `index.html`, consolidate the premium visual system in `redesign.css`, and add dependency-free Node contract tests that validate the rendered artifact’s content, links, metadata, accessibility hooks, and responsive CSS.

**Tech Stack:** HTML5, CSS3, existing vanilla JavaScript, Node.js built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-23-premium-enterprise-website-design.md`

## Global Constraints

- Preserve the ARCVERSE emblem and the exact slogan “Powered by AI. Guided by Faith.”
- Keep the existing email, WhatsApp, KAYA, Business Solutions, Websites & Branding, Pricing, and illustrative walkthrough destinations.
- VELA must be labeled “Proposed / In development” and must not claim confirmed capabilities, integrations, certifications, availability, or production readiness.
- Do not deploy, merge to `main`, change DNS, modify live systems, or incur spend.
- Add no runtime dependency and no remote font, script, or image.

## Review Focus

- At 320–390 px widths, the hero, cards, navigation, and form must not create horizontal scrolling.
- With JavaScript unavailable or reduced motion enabled, content and navigation remain understandable and visible.
- VELA wording must not imply emergency readiness, certification, integration, or availability.
- All internal links and fragment targets must resolve within the static project.
- The enquiry buttons must continue preparing a local draft for user review rather than submitting data automatically.

---

### Task 1: Homepage content, claim safety, and SEO contract

**Files:**
- Create: `package.json`
- Create: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing contact form IDs and `script.js`/`contact-enquiry.js` behaviour.
- Produces: semantic homepage sections and stable IDs consumed by shared CSS and browser checks.

- [ ] **Step 1: Write failing contract tests** for required visible business domains, exact brand slogan, VELA development label/disclaimer, preserved destinations, one `h1`, landmarks, canonical metadata, JSON-LD, and local fragment targets.
- [ ] **Step 2: Run `npm test` and verify the new homepage tests fail because the requested domains, VELA section, and JSON-LD are absent.**
- [ ] **Step 3: Rewrite `index.html`** with the approved information hierarchy while retaining the contact form IDs, safe-send note, scripts, existing destinations, and logo asset.
- [ ] **Step 4: Run `npm test` and verify Task 1 tests pass.**
- [ ] **Step 5: Commit with message `feat: reposition ARCVERSE around enterprise problems`.**

### Task 2: Premium visual system and responsive behaviour

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `redesign.css`

**Interfaces:**
- Consumes: homepage class names and section IDs from Task 1 plus established classes used by secondary pages.
- Produces: the shared premium colour, typography, spacing, card, navigation, form, responsive, focus, and reduced-motion styles.

- [ ] **Step 1: Add failing tests** for visible keyboard focus, reduced-motion handling, responsive breakpoints, fluid type, content containment, and the new VELA/tender layouts.
- [ ] **Step 2: Run `npm test` and verify the CSS contract fails against the accumulated legacy overrides.**
- [ ] **Step 3: Replace `redesign.css`** with a cohesive shared stylesheet that covers the homepage and existing secondary-page classes without new assets or dependencies.
- [ ] **Step 4: Run `npm test` and verify all tests pass.**
- [ ] **Step 5: Commit with message `style: deliver premium responsive ARCVERSE system`.**

### Task 3: Site-wide integration and review evidence

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `business.html`
- Modify: `personal.html`
- Modify: `pricing.html`
- Modify: `websites.html`
- Create: `docs/reviews/2026-10-23-premium-redesign-review.md`

**Interfaces:**
- Consumes: `redesign.css` from Task 2 and every root HTML page.
- Produces: cache-safe stylesheet references, whole-site link validation, and the before/after handoff.

- [ ] **Step 1: Add failing whole-site tests** for local page destinations, stylesheet version consistency, and preservation of the draft-only enquiry behaviour.
- [ ] **Step 2: Run `npm test` and verify failures identify stale stylesheet versions or integration gaps.**
- [ ] **Step 3: Update secondary pages to the new stylesheet version and write the before/after review with exact production gates.**
- [ ] **Step 4: Run `npm test` and a local browser review at desktop and phone widths.**
- [ ] **Step 5: Commit with message `test: verify ARCVERSE redesign across the static site`.**

