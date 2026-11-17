# ARCVERSE Company GNOME flagship homepage review

Date: 2026-11-17
Repository: `bradleyhenekebeard-hub/ARCVERSE-Technologies`
Branch: `feature/gnome-flagship-homepage-20261117`
Baseline: `044c9a703b315df0a56666946c3a0c6cdbe5373e`
Implementation head: `564474989ad9a6ee554d68cac214922a09d92519`

## Outcome

The homepage now presents **Company GNOME** as ARCVERSE's flagship technology and describes it as a **private, governed agentic operating intelligence layer**. The page explains the operating model in plain language: approved company inputs become governed company memory, management intelligence and human-controlled action. Existing operational use cases remain visible as examples of what GNOME can power.

The exact line **The heartbeat behind smarter business operations.** remains prominent beneath the hero message. The established ARCVERSE logo, animated welcome sequence, slogan **Powered by AI. Guided by Faith.**, enquiry routes and country-labelled contact details remain in place.

## What changed

- Search and social metadata now lead with Company GNOME and agentic operating intelligence.
- The primary navigation leads with a clearly labelled `GNOME / FLAGSHIP` destination.
- The hero replaces the generic operational-friction headline with a GNOME-first product statement and keeps the heartbeat line as supporting copy.
- A four-stage intelligence flow explains company inputs, governed memory, management intelligence and human-controlled action.
- Four differentiators explain company context, evidence provenance, management attention and controlled expansion.
- A governance note states that integrations, data access and deployment scope are confirmed per organisation and that accountable people remain responsible for consequential decisions and approvals.
- The existing problems section is reframed as examples of what GNOME can power across tenders, finance, logistics, telematics, contracts, audits and automation.
- The premium navy, black, cyan and gold visual system now includes the GNOME flow and responsive layouts without adding a large boxed hero panel.
- The shared stylesheet cache version was updated consistently across all HTML entry pages.

## Verification evidence

- `npm test`: 30/30 passing, 0 failing.
- `git diff --check`: clean.
- Desktop browser review at 1440 x 900 confirmed the welcome-to-hero transition, GNOME-first navigation, centred hero hierarchy, GNOME operating model, governance note, problem section, contact form and footer.
- Mobile browser review at 390 x 844 confirmed a centred hero, single-column GNOME flow, full-width hero actions and no horizontal overflow (`scrollWidth === clientWidth`).
- The mobile navigation opened and closed using the keyboard, reported the correct `aria-expanded` state and exposed all nine destinations.
- Keyboard traversal reached the primary GNOME navigation link, both GNOME hero actions and both contact actions in DOM order; each focused control displayed a `2.4px` cyan outline.
- Reduced-motion emulation matched `prefers-reduced-motion: reduce`; the GNOME signal and hero orbit reported `animation-name: none`.
- The page contains one visible `h1`, one `main`, one `nav`, one `footer`, no duplicate IDs and no empty links.
- Both direct contact routes are present: `+353 85 230 6298 (Ireland)` and `+27 79 808 0718 (South Africa)`.
- VELA remains labelled **Proposed / In development** and states that capabilities, integrations, certifications, availability and emergency readiness are not confirmed.
- Browser console review reported zero warnings and zero errors.
- The live production site was not changed during this work.

## Accuracy and readiness boundaries

- The page does not claim autonomous decision-making, universal integrations, certifications, completed customer deployments or production readiness for GNOME.
- GNOME's wording is limited to the proposed operating model and human-controlled outcomes supported by approved company context and evidence.
- Existing statements about integrations and services remain subject to written scope and verification for each organisation.
- VELA remains a proposed development offering and is not represented as an emergency-ready service.

## Release status and gate

**Production deployment: NOT PERFORMED.** No merge, production deployment, live-system modification or spend was performed.

Before release, the development branch must receive a final independent code review, the owner must review the local preview and explicitly approve deployment. After deployment, verify the production URL on desktop and mobile, confirm the updated metadata and stylesheet cache version, test the welcome animation, and confirm that enquiry links still prepare user-controlled drafts without sending automatically.
