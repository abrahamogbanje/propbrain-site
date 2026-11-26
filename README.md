# PropBrain AI: website

The public website for PropBrain AI, a lease report service for independent US landlords. This repository holds only the static site that is deployed to Vercel. It is public on purpose.

Order handling, document processing and internal documentation live in a separate private repository and are not part of this one.

## Structure

```text
index.html           Home page: offer, sample report, how it works, FAQ
pricing/index.html   Pricing and checkout buttons
thank-you/index.html Page shown after payment
contact/index.html   Contact page
assets/
  site.css           Styles
  site.js            Site settings (PROPBRAIN block at the top) and small page behaviours
  propbrain-logo.jpeg
```

There is no build step. The pages are plain HTML, CSS and JavaScript.

## Site settings

Checkout links, the contact email and optional testimonials and metrics are set in the `PROPBRAIN` block at the top of `assets/site.js`. Change them there, not in the HTML.

- Leave a checkout URL empty and the button falls back to an email link.
- Testimonials and metrics stay empty until real, permitted data exists. Never add invented ones.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Deployed from the `main` branch on Vercel as a static site.

- Framework preset: Other (static).
- Root Directory: `/` (the repository root).
- No build command and no output directory.

Check the preview deployment before promoting a change to production.

## Rules for this repository

This repository is public. Anything committed here is visible to everyone, including its history.

- Never commit secrets, API keys, customer data, lease documents, order references, payout or fee details, or internal notes.
- Keep only deployable site files here. Notes, plans and tools belong in the private repository.
- Do not change the price, delivery time, refund, privacy or legal wording without the owner's approval.
- Do not describe planned features as existing ones.

PropBrain AI is an administrative document-summary service, not a law firm. Reports are not legal advice.

## License

All rights reserved unless a separate license is added.
