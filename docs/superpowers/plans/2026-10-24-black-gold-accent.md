# Black and Gold Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained champagne-gold accents to the approved ARCVERSE enterprise design without weakening its blue technology identity or accessibility.

**Architecture:** Keep the HTML structure and copy unchanged. Adjust the shared premium design tokens and the few component rules that still hard-code violet, then validate the palette contract through the existing site test suite and visual desktop/mobile review.

**Tech Stack:** Static HTML, CSS, JavaScript, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-24-black-gold-accent-design.md`

## Global Constraints

- Preserve the deep black/navy foundation and blue ARCVERSE logo.
- Use champagne gold only as a restrained accent.
- Keep cyan/blue for operational signals, focus states and system storytelling.
- Do not change content, structure, VELA readiness language or the welcome animation.
- Do not deploy or merge into main as part of this palette task.

## Review Focus

- Gold on dark backgrounds must remain legible without appearing bright yellow.
- Focus indicators must remain obvious and must not become gold-only.
- Hero gradients must preserve readable white text.
- Mobile layout must not gain horizontal overflow.
- Reduced-motion behaviour must remain unchanged.

---

### Task 1: Premium palette contract

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `redesign.css`
- Modify: marketing HTML files only if the stylesheet cache version changes

**Interfaces:**
- Consumes: existing CSS custom properties and premium component classes
- Produces: a black/navy, cyan/blue and champagne-gold visual system with no primary violet accent

- [ ] **Step 1: Write the failing palette test**

Add a test named `premium palette uses restrained champagne gold while preserving the ARCVERSE blue signal` that asserts the gold token, retained cyan token, absence of the old violet token, and continued non-gold focus outline.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern "premium palette uses" tests/site.test.mjs`

Expected: FAIL because the approved champagne-gold palette is not yet present.

- [ ] **Step 3: Implement the minimal palette change**

Update `redesign.css` tokens and the hard-coded violet hero/orbit accents. Preserve all sizing, content and layout rules. Bump the shared stylesheet cache version if the CSS changes.

- [ ] **Step 4: Run the focused test and full suite**

Run: `node --test --test-name-pattern "premium palette uses" tests/site.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests pass with zero failures.

- [ ] **Step 5: Visually verify desktop and mobile**

Review the landing hero and problems section at desktop width and at 390 x 844. Confirm no overflow, no lost contrast, restrained gold usage and an intact welcome animation. Check browser console warnings and errors.

- [ ] **Step 6: Commit**

Commit the palette refinement on `redesign/expanded-capabilities-20261024` without deploying or merging.

