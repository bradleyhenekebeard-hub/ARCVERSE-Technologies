# Heartbeat Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ARCVERSE homepage hero message and add a subtle animated heart-outline and ECG background that remains accessible and responsive.

**Architecture:** Keep the existing centred hero and orbit layer. Add one decorative inline SVG layer inside the hero for the heart outline and ECG trace, then animate it entirely through `redesign.css`; no JavaScript or external asset is required.

**Tech Stack:** Static HTML, inline SVG, CSS animations, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-24-heartbeat-hero-design.md`

## Global Constraints

- Homepage H1 must read exactly “The heartbeat behind smarter business operations.”
- Preserve the welcome animation, navigation, hero actions, solution rail and all content below the hero.
- Use the existing blue and champagne-gold palette; no red or pink styling.
- Heartbeat artwork is decorative, non-interactive and `aria-hidden="true"`.
- No sound, vibration, rapid flashing, JavaScript animation or external image asset.
- Disable heartbeat movement under `prefers-reduced-motion: reduce`.
- Do not merge or deploy without a separate explicit approval.

## Review Focus

- Long headline wrapping at desktop and 390 x 844 must remain centred and readable.
- SVG must not be announced by assistive technology or create a second heading.
- Heart and ECG layers must stay behind the text and controls.
- Animation must be a restrained double-pulse without flashing.
- Mobile layout must not gain horizontal overflow.

---

### Task 1: Heartbeat headline and background

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`
- Modify: `redesign.css`
- Modify: marketing HTML files for the shared stylesheet cache version

**Interfaces:**
- Consumes: `.solution-hero`, `.hero-orbit`, `.hero-copy-block`, `.gradient-text` and existing reduced-motion rules
- Produces: `.hero-heartbeat`, `.heartbeat-heart`, `.heartbeat-ecg`, `heartbeat-pulse` and `heartbeat-trace`

- [ ] **Step 1: Write the failing hero-heartbeat test**

Add a test named `homepage hero presents the heartbeat message with motion-safe background artwork` that asserts:

- visible H1 text equals `The heartbeat behind smarter business operations.`
- old `Turn operational friction into systems that work.` copy is absent
- `index.html` contains an `aria-hidden="true"` `.hero-heartbeat` SVG with `.heartbeat-heart` and `.heartbeat-ecg`
- `redesign.css` defines both heartbeat keyframes
- the reduced-motion block disables animation on `.hero-heartbeat`

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test --test-name-pattern "homepage hero presents the heartbeat" tests/site.test.mjs`

Expected: FAIL because the old heading and no heartbeat SVG are present.

- [ ] **Step 3: Implement the heartbeat hero**

Update `index.html` with the exact heading and one decorative inline SVG behind `.hero-copy-block`. Update `redesign.css` with low-opacity heart/ECG styling, restrained pulse and trace animations, responsive sizing, stacking order and reduced-motion handling. Bump the shared stylesheet cache version across marketing pages.

- [ ] **Step 4: Run focused and full tests**

Run: `node --test --test-name-pattern "homepage hero presents the heartbeat" tests/site.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests pass with zero failures.

- [ ] **Step 5: Verify the visual result**

Review the intro, hero and transition into the problems section at desktop width and 390 x 844. Confirm centred wrapping, unobstructed controls, no horizontal overflow and zero browser console errors or warnings.

- [ ] **Step 6: Commit**

Commit the implementation, tests, spec and plan on `redesign/heartbeat-hero-20261024` without merging or deploying.
