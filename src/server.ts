import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rateLimit from 'express-rate-limit';


const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per IP
  message: 'Too many requests, please try again later.',
});
app.use(limiter);
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
const ssrCache = new Map();
const SSR_CACHE_DURATION = 600 * 1000; // 10 minutes

app.use('/**', async (req, res, next) => {
  try {
    const key = req.originalUrl;

    // 🚀 Serve cached response if valid
    if (ssrCache.has(key)) {
      const { html, expiry } = ssrCache.get(key);
      if (Date.now() < expiry) {
        console.log('🚀 Serving from cache:', key);
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30');
        return res.send(html); // ✅ Explicit return
      }
    }

    // 🆕 Generate fresh SSR response
    const response = await angularApp.handle(req);

    if (response) {
      const html = response.body;

      // ✅ Store in cache
      ssrCache.set(key, { html, expiry: Date.now() + SSR_CACHE_DURATION });

      res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30');
      return res.send(html); // ✅ Explicit return
    }

    return next(); // ✅ Explicit return if no response
  } catch (err) {
    console.error('SSR Error:', err);
    return res.status(500).send('Server Error'); // ✅ Explicit return on error
  }
});





/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 5000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
