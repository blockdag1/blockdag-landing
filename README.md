# BlockDAG Technology & Research Hub

Next.js App Router landing page based on the supplied information architecture and BlockDAG visual references.

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Vercel

The project uses Next.js `16.3.3` and React `19.2.8` (Node.js `>=20.9.0`). Vercel detects Next.js automatically, so no custom build configuration is required:

- Framework preset: **Next.js**
- Build command: `npm run build`
- Output directory: leave the Vercel default
- Install command: `npm install`

For analytics, add `NEXT_PUBLIC_GA_ID` in the Vercel project environment variables. Tracking remains disabled when the variable is empty. The page is ready for the OpenAI Ads Pixel once the approved pixel ID/script is supplied by the ads setup.
