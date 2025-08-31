// This file configures the initialization of Sentry for edge features (middleware, edge API routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also applied to Node.js-based edge features.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  
  // Edge-specific configuration
  beforeSend(event, hint) {
    // Filter edge runtime specific issues
    const error = hint.originalException;
    
    if (error && error instanceof Error) {
      // Filter edge runtime connection issues
      if (error.message?.includes('EdgeRuntime')) {
        return null;
      }
    }
    
    return event;
  }
});