# Naqi Shah Kazmi — Portfolio

High-end, animated portfolio for cinematographer & director Naqi Shah Kazmi.
Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

## Edit the content

Everything shown on the site lives in **`src/data/site.ts`** — name, bio, socials,
stats, awards, projects, services, clients. All copy in there is placeholder text;
replace it with real details.

### Adding real stills / posters

1. Drop the image into `public/work/` (e.g. `public/work/echoes.jpg`).
2. Set `image: "/work/echoes.jpg"` on the project in `src/data/site.ts`.
   Until an image is set, a designed gradient placeholder is shown.
3. Optional: set `video` to a YouTube/Vimeo URL so the card links to the film.

### Showreel

Set `site.showreelEmbed` to a YouTube or Vimeo **embed** URL
(e.g. `https://www.youtube.com/embed/VIDEO_ID?autoplay=1` or `https://player.vimeo.com/video/ID?autoplay=1`).

### Portrait

In `src/components/sections/About.tsx`, replace the gradient block with
`<Image src="/portrait.jpg" alt="…" fill className="object-cover" />` after adding
`public/portrait.jpg`.

### Contact form

The form ships with a zero-backend `mailto:` handoff so it works immediately.
To send real emails, replace `onSubmit` in `src/components/sections/Contact.tsx`
with a Server Action using [Resend](https://resend.com) or point the form at
[Formspree](https://formspree.io).

## Project structure

```
src/
  app/                 layout (fonts, metadata), page, global styles & design tokens
  data/site.ts         ← all content
  fonts/               self-hosted Syne + Manrope (OFL)
  components/
    providers/         SmoothScroll (Lenis)
    ui/                Reveal/SplitWords, MagneticButton, Poster, Cursor, Preloader…
    sections/          Nav, Hero, Marquee, Showreel, Work, About, Services, Contact, Footer
```

## Design notes

- Colours & type scale are CSS variables / utilities in `src/app/globals.css`
  (`--orange`, `--magenta`, `--violet`, `--teal`; `display-xl/lg/md`, `text-gradient`…).
- Animations respect `prefers-reduced-motion`; smooth scroll and the custom cursor
  are only enabled on mouse/trackpad devices — touch devices keep native scrolling.
- Fully responsive: fluid `clamp()` type, mobile full-screen menu, single-column grids.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config.
Remember to update `site.url` in `src/data/site.ts` for correct Open Graph metadata.
