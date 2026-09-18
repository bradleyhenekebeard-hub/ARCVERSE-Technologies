# ARCVERSE pricing update — review checklist

**Status: DRAFT. Do not merge into `main` or deploy without explicit owner approval.**

## Agreed proposed prices

| Product | Package | Monthly (paid in advance) | One-off setup |
| --- | --- | ---: | ---: |
| Business AI | Starter, one user | R1,999 | R2,500 |
| Business AI | Professional, four users | R3,999 | R4,500 |
| Business AI | Enterprise, custom users | From R8,999 | From R10,000 |
| Personal Finance | Free trial | R0 for 14 days | R0 |
| Personal Finance | Personal, one user | R199 | R0 |
| Personal Finance | Family, up to five | R249 | R0 |

Website & Branding once-off projects: Digital Starter R2,999 (one page); Business Identity R7,999 (up to five pages, matching editable Word letterhead); Premium Brand R11,999 (up to eight pages, coordinated branding). No annual subscriptions or unapproved maintenance rates.

## Implementation in this branch

- `pricing.js` inserts a summary on Home and detailed, service-specific price cards on the three existing dedicated pages. No prices are shown on unrelated walkthrough pages.
- `pricing.css` styles cards and the disclosures responsively.
- Existing `script.js` loads the new module; original intro, brand imagery and walkthrough logic are preserved.
- The obsolete, unowned `solutions@arcverse.co.za` contact links are corrected to `solutions@arcverse.digital` in the rendered site. Consider updating the static HTML source directly before production for visitors without JavaScript and search crawlers.
- Every package CTA opens an email enquiry, not a fake checkout or trial. No real billing, trial activation, AI metering or customer portal is implemented by this marketing-site change.

## Commercial safeguards

- Monthly payments are in advance. No annual prices. Do not promise automatic renewal or automatic charges.
- Setup fees cover only the agreed implementation scope; the subscription covers access, agreed features, routine maintenance, defined support and a finite AI allowance.
- Included self-service activity and genuine contracted defect corrections are distinguished from minor modifications and new quoted development.
- Chargeable changes require a written scope, price, any recurring or third-party charges, approval and agreed payment before work.
- Do not publish the proposed R750/hour rate: it has **not** been approved.
- Do not publish provisional internal AI interactions or cost caps (trial 20/R5, Personal 100/R15, Family 250/R30, Starter 300/R100, Professional 1,200/R300, Enterprise 4,000/R900). Validate model, token, image and document processing costs and implement server-side limits before advertising specific allowances.
- Do not promise that untested features or integrations work. Confirm the deployed product scope for each package and the availability of the 14-day trial before marketing them as live.
- Verify VAT treatment, subscription cancellation/access terms, website deliverables/ownership, lawful personal-data handling and customer agreement with an appropriate professional before launch.
- Domains, hosting, email, extra revisions, third-party services and ongoing website maintenance are separate unless quoted.

## Before merge

1. Review prices, inclusions and exclusions against actual product readiness.
2. Verify all links, navigation and responsive layout in a browser on Home, Business AI, Personal Finance and Websites & Branding.
3. Run a local JavaScript syntax check and test that the intro and both walkthroughs still function.
4. Update source HTML contact addresses, not only browser-rendered links.
5. Obtain express approval before merging this branch to the Pages production branch.
