# Heartbeat Hero Design

## Intent

Replace the homepage hero heading with the exact message: “The heartbeat behind smarter business operations.” Reinforce that idea with a premium, low-contrast heartbeat visual behind the words.

## Approaches considered

- A literal pulsing heart: immediately recognisable, but risks feeling emotional or consumer-oriented.
- An ECG line only: technical and clean, but less clearly communicates “heart.”
- A faint heart outline with an ECG signal through it: selected because it balances a recognisable heartbeat with ARCVERSE's enterprise technology identity.

## Selected composition

- Keep the existing centred hero structure, black/navy foundation, blue logo and champagne-gold accent system.
- Set the heading to “The heartbeat behind smarter business operations.”
- Keep “The heartbeat behind” in the primary light text and use the existing blue-to-gold gradient on “smarter business operations.”
- Place one large, faint heart outline behind the headline, integrated with a horizontal ECG trace.
- Animate the heart with a restrained double-pulse and illuminate the ECG trace in sync.
- Keep the artwork decorative and non-interactive with `aria-hidden="true"`.
- Preserve the existing ARCVERSE welcome animation and all homepage sections below the hero.
- For `prefers-reduced-motion`, stop the pulse and display the heart and ECG trace as a static background.
- On mobile, scale and crop the background safely without widening or obscuring the headline.

## Anti-goals

- No red or pink Valentine styling.
- No large solid heart competing with the copy.
- No medical claims or health-monitor aesthetic.
- No sound, vibration or rapid flashing.

## Verification

- The new heading is the single homepage H1 and the previous heading is absent.
- The heart and ECG elements exist as decorative background artwork.
- Motion is subtle and disabled for reduced-motion visitors.
- Desktop and 390 x 844 mobile views remain centred, readable and free of horizontal overflow.
