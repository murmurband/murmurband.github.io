# 自言自語 Murmur

The band website is an Astro static site. Requires Node.js 22.12 or newer.

## Development

From this directory:

```sh
npm ci
npm run dev
```

To run the server in the background, use `npm run dev -- --background`.
Manage it with `npm exec astro dev status`, `npm exec astro dev logs`, and
`npm exec astro dev stop`.

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Structure

- `src/pages/`: editable Astro pages, including the landing page, story, works and song lyrics.
- `src/layouts/SiteLayout.astro`: shared document, fonts and optional p5 animation dependency.
- `src/components/`: shared navigation and social footer.
- `src/styles/`: original global page styles. Each page imports its stylesheet.
- `public/`: images, video, fonts and classic browser scripts. These are copied unchanged into the build.

Existing `.html` URLs are preserved with `build.format: 'file'`. The landing
page remains `/`, and the main band page remains `/demo.html`. The old alternate
`demo copy.html` page is preserved as `src/pages/demo copy.astro`.
The demo animation stays a classic script because p5 uses global callbacks.
Unused legacy scripts are retained in `public/js/` but are not loaded by pages.

## Deployment

The repository's `.github/workflows/deploy.yml` builds this directory and deploys
`dist/` to GitHub Pages on pushes to `main` or `master`, or on manual dispatch.
In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. The site URL is configured in `astro.config.mjs`.

Astro references: [routing](https://docs.astro.build/en/guides/routing/),
[components](https://docs.astro.build/en/basics/astro-components/), and
[styles](https://docs.astro.build/en/guides/styling/).
