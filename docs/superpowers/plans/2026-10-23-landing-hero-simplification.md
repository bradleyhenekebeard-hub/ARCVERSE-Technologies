# ARCVERSE Landing Hero Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the right-hand hero brief and restore the ARCVERSE homepage entrance animation.

**Architecture:** Keep the static-site architecture. Restore the already-supported intro markup and activation hook, remove the brief markup, and change the hero grid into a single-column layout using the existing responsive system.

**Tech Stack:** Static HTML, CSS and vanilla JavaScript with Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-23-landing-hero-simplification-design.md`

## Global Constraints

- Preserve `Turn operational friction into systems that work.` as the only `h1`.
- Do not add a replacement right-hand card, dependency, paid asset or readiness claim.
- Keep reduced-motion, no-JavaScript and enquiry fail-safe behavior intact.

## Review Focus

- The removed brief must not leave an empty desktop column or oversized gap.
- The animation must finish automatically and reveal the page.
- Reduced-motion users must bypass the animation.
- No-JavaScript users must still see the homepage.
- The 320 px and 390 px layouts must not overflow horizontally.

---

### Task 1: Simplify the landing hero and restore the intro

**Files:**
- Modify: `index.html`
- Modify: `redesign.css`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: existing `script.js` support for `#arcverse-intro` and existing intro animation styles in `styles.css`.
- Produces: a one-column hero and restored motion-safe homepage intro.

- [ ] **Step 1: Write failing tests** asserting the exact heading, absence of hero-brief markup, presence of the intro overlay and motion-safe activation, and single-column hero CSS.
- [ ] **Step 2: Run `npm test`** and confirm the new tests fail because the brief is present and the intro is absent.
- [ ] **Step 3: Restore the intro markup/activation and remove the hero brief from `index.html`; update `.hero-shell` and copy width in `redesign.css`.**
- [ ] **Step 4: Run `npm test` and JavaScript syntax checks** and confirm all tests pass.
- [ ] **Step 5: Verify desktop, 390 px, reduced-motion and no-JavaScript browser states, then commit.**
