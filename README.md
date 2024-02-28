# remix-spa-dynamic-public-path

The workaround for delivering only static resources from your own CDN in Remix SPA.

## DEMO

- `npm run demo`
- Open `http://localhost:3000/demo`

## Explanation

1. Modify `index.html` and `manifest-*.js` that built by Remix

See `scripts/build.ts`

2. Configure vite build settings

See `experimental.renderBuiltUrl` in `vite.config.ts`

