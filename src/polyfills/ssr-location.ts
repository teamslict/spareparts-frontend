// SSR polyfill for libraries that (incorrectly) access the global `location` during server render.
//
// Next.js server runtime doesn't define `location`. Some client-only libs assume it exists
// at module evaluation time which can crash `next build` during data collection.
//
// This file is safe to import on both server and client.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g: any = globalThis as any;

if (typeof g.location === 'undefined') {
  // Minimal shape used by most libs. Keep it read-only-ish.
  g.location = {
    href: '',
    origin: '',
    protocol: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: '',
    assign: () => {},
    replace: () => {},
    reload: () => {},
  };
}

