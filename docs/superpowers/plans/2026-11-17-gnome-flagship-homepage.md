# Company GNOME Flagship Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the ARCVERSE homepage so Company GNOME is the flagship technology and its governed agentic operating-intelligence value is clear, premium and accurate.

**Architecture:** Keep the static HTML/CSS/JavaScript marketing stack and the approved welcome/heartbeat system. Change the homepage hierarchy and copy in `index.html`, add GNOME-specific responsive components to `redesign.css`, and pin the required copy, safeguards and responsive structure in the existing Node test suite.

**Tech Stack:** Semantic HTML5, CSS, vanilla JavaScript, Node.js built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-17-gnome-flagship-homepage-design.md`

## Global Constraints

- Use the exact term **private, governed agentic operating intelligence layer**.
- Preserve **The heartbeat behind smarter business operations.** and **Powered by AI. Guided by Faith.**
- Preserve the logo, welcome animation, current contact details and VELA readiness wording.
- Do not claim autonomous decision-making, completed customer deployments, production readiness, certifications or unverified integrations.
- Keep integrations and deployment scope explicitly organisation-specific.
- Retain keyboard focus, reduced-motion handling, semantic heading order and mobile responsiveness.
- Do not add third-party dependencies or external runtime assets.
- Do not deploy or merge without explicit approval after preview verification.

## Review Focus

- Long GNOME copy at 390px: headline and capability labels wrap without clipping or horizontal overflow; Task 3 pins width rules and mobile UI verification.
- JavaScript disabled: GNOME content remains visible and navigable; Task 1 extends the essential-content test.
- Reduced motion: heartbeat and GNOME signal animations stop; Task 3 adds explicit reduced-motion assertions.
- Navigation fragments: `#gnome`, `#problems` and existing targets remain valid; Task 1 extends the fragment-target test.
- Readiness language: the page never implies autonomous actions or universal live availability; Task 2 adds negative claim assertions.

---

### Task 1: GNOME-first hero, navigation and metadata

**Files:**
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: existing `.solution-hero`, `.hero-copy-block`, `.hero-heartbeat`, `.hero-orbit`, navigation and structured-data patterns.
- Produces: a minimal semantic `section#gnome` target, GNOME-first hero copy, GNOME-aware metadata and stable semantic hooks for Task 2 and Task 3.

- [ ] **Step 1: Write failing GNOME hero tests**

Add tests named `homepage leads with Company GNOME as the flagship technology` and `GNOME metadata describes governed agentic operating intelligence`. Assert the first `<h1>` contains `Company GNOME` and `The agentic intelligence layer for your entire business.`, visible text contains the exact technical term and heartbeat line, the first main navigation link targets `#gnome`, orbit labels are `KNOWLEDGE`, `EVIDENCE`, `ACTION`, metadata contains Company GNOME, and all fragment targets exist.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test --test-name-pattern="Company GNOME|GNOME metadata" tests/site.test.mjs`

Expected: FAIL because the current hero and metadata are operations-first and there is no `#gnome` target.

- [ ] **Step 3: Implement the GNOME-first hero and metadata**

In `index.html`, update title, description, Open Graph copy, structured `serviceType`, navigation order, hero eyebrow, H1, lead, actions, capability rail and orbit labels. Preserve the existing heartbeat SVG, intro overlay, one-H1 rule, contact links and slogan. Use `#gnome` for the primary hero action and `#contact` for the secondary action. Add a minimal semantic `section#gnome` shell with the approved GNOME heading so all navigation targets remain valid; Task 2 expands this shell into the complete operating-intelligence story.

- [ ] **Step 4: Preserve non-JavaScript and accessibility semantics**

Extend the existing essential-content test to require the GNOME title, hero explanation and actions in raw HTML before JavaScript enhancement.

- [ ] **Step 5: Run focused and full tests**

Run: `node --test --test-name-pattern="Company GNOME|GNOME metadata|essential content|fragment" tests/site.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS with zero failures.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/site.test.mjs
git commit -m "Reframe homepage hero around Company GNOME"
```

### Task 2: GNOME operating-intelligence story and use-case connection

**Files:**
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: the minimal `section#gnome` target and GNOME terminology introduced by Task 1; existing solution-spectrum and system-map patterns.
- Produces: `.gnome-section`, `.gnome-intelligence-map`, `.gnome-differentiators`, and explicit GNOME-to-use-case copy used by Task 3 styling.

- [ ] **Step 1: Write failing GNOME story tests**

Add a test named `GNOME section explains governed intelligence and human control`. Assert the `#gnome` section contains the stages `Company inputs`, `Governed company memory`, `Management intelligence`, `Human-controlled action`; includes `traceable evidence`, `institutional knowledge`, `management attention` and organisation-specific scope wording; and contains the four GNOME differentiator cards.

- [ ] **Step 2: Write failing accuracy tests**

Add a test named `GNOME copy avoids unsupported autonomy and readiness claims`. Assert GNOME copy includes `human-controlled` and `confirmed for each organisation`, and excludes `fully autonomous`, `production-ready`, `available everywhere`, `certified`, and claims of completed customer deployment.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `node --test --test-name-pattern="GNOME section|GNOME copy" tests/site.test.mjs`

Expected: FAIL because the dedicated GNOME section does not yet exist.

- [ ] **Step 4: Implement the GNOME section and capability bridge**

Expand `section#gnome` immediately after the hero/trust strip into a semantic four-stage intelligence map and four concise differentiator cards. Add a bounded scope note. Update the problem-section introduction to state that tenders, finance, logistics, audits, contracts and automation are examples of what GNOME can power while retaining the existing detailed lanes.

- [ ] **Step 5: Run focused and full tests**

Run: `node --test --test-name-pattern="GNOME section|GNOME copy|operational problems|expanded enterprise" tests/site.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS with zero failures.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/site.test.mjs
git commit -m "Explain the GNOME intelligence operating model"
```

### Task 3: Premium GNOME visual system and responsive safeguards

**Files:**
- Modify: `redesign.css`
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `.gnome-section`, `.gnome-intelligence-map`, `.gnome-differentiators` from Task 2 and current ARCVERSE colour/motion tokens.
- Produces: responsive GNOME visual components with reduced-motion behavior and a synchronized `redesign.css` cache version.

- [ ] **Step 1: Write failing CSS contract tests**

Add a test named `GNOME visual system is responsive and motion safe`. Assert CSS defines the three GNOME component hooks, a four-column desktop intelligence flow, one-column mobile flow under `max-width: 760px`, bounded word wrapping, and reduced-motion rules for every GNOME animation.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="GNOME visual system" tests/site.test.mjs`

Expected: FAIL because the GNOME styles do not yet exist.

- [ ] **Step 3: Implement GNOME styling**

Add a premium contained-light treatment using existing `--cyan`, `--gold`, background and border tokens. Style the intelligence flow as a connected signal path without a large right-side card. Use fluid type and spacing, safe word wrapping, compact mobile stacking and visible keyboard focus inherited from the global system.

- [ ] **Step 4: Add restrained, motion-safe signal animation**

Animate only decorative signal elements and disable them in the existing `prefers-reduced-motion: reduce` block. Keep all decorative elements `aria-hidden="true"`.

- [ ] **Step 5: Bump and verify the shared stylesheet cache version**

Update every marketing page that loads `redesign.css` to the same new version and preserve the existing cache-version consistency test.

- [ ] **Step 6: Run full static verification**

Run: `npm test`

Expected: all tests PASS with zero failures.

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 7: Commit**

```bash
git add redesign.css index.html *.html tests/site.test.mjs
git commit -m "Add the premium GNOME intelligence visual system"
```

### Task 4: Browser verification and handoff

**Files:**
- Create: `docs/reviews/2026-11-17-gnome-flagship-homepage-review.md`

**Interfaces:**
- Consumes: the complete GNOME homepage branch from Tasks 1-3.
- Produces: recorded desktop/mobile evidence and a safe preview handoff; no production deployment.

- [ ] **Step 1: Run the final automated gate**

Run: `npm test`

Expected: all tests PASS with zero failures.

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 2: Verify desktop behavior**

Serve the site locally and inspect the intro, GNOME hero, `#gnome` flow, primary actions, navigation, capability sections, contact details and footer at 1440x900. Confirm one H1, correct section order, no overlap, and no browser warnings/errors.

- [ ] **Step 3: Verify mobile behavior**

Inspect the same workflows at 390x844. Confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth`, readable heading wraps, visible GNOME stages, usable buttons/navigation and no browser warnings/errors.

- [ ] **Step 4: Verify reduced motion and keyboard access**

Confirm reduced-motion disables heartbeat and GNOME decorative animation, and keyboard focus reaches navigation, GNOME actions and contact actions visibly in logical order.

- [ ] **Step 5: Record evidence**

Create the review document with the tested commit, commands, pass counts, desktop/mobile observations, console result, overflow result, exact remaining readiness boundaries and the statement `Production deployment: NOT PERFORMED`.

- [ ] **Step 6: Commit the review**

```bash
git add docs/reviews/2026-11-17-gnome-flagship-homepage-review.md
git commit -m "Document GNOME homepage verification"
```

- [ ] **Step 7: Prepare the user preview handoff**

Provide the local preview outcome, exact changes and test evidence. Ask for explicit deployment approval only after the user reviews the verified design.

