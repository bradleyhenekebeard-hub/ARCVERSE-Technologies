# ARCVERSE landing hero simplification design

## Intent

Make the opening view feel cleaner and more direct by removing the entire right-hand problem brief panel while retaining the existing headline, supporting copy, actions and engagement principles. Restore the established ARCVERSE animated welcome sequence before the homepage appears.

## Goals

- Keep `Turn operational friction into systems that work.` as the only primary heading.
- Remove the full `Problem First / From Friction / To a Controlled Workflow` panel and its pale-blue rectangle.
- Let the remaining hero content use the released horizontal space without introducing a replacement card.
- Restore the existing ARCVERSE welcome animation on the homepage only.
- Preserve reduced-motion behavior, navigation, VELA wording, enquiry safeguards and responsive behavior.

## Non-goals

- Do not change the rest of the homepage content or secondary pages.
- Do not add a new illustration, video, dependency or paid asset.
- Do not change contact behavior or product-readiness claims.

## Approaches considered

1. **Remove the panel and widen the existing copy — selected.** This directly follows the request and produces the cleanest hierarchy.
2. Replace the panel with decorative artwork. Rejected because it would preserve the same competing right-hand mass.
3. Flatten the panel's three rows below the hero. Rejected because the user asked to take the component away, not relocate it.

## Acceptance

The homepage source contains no `hero-brief`, `brief-topline`, `brief-list` or `brief-outcome` markup. The primary heading remains exact. The `arcverse-intro` overlay and motion-safe activation are restored. At desktop and 320–390 px widths, the hero has no horizontal overflow and the intro resolves to the usable page automatically.
