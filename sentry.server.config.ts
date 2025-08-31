// This file configures the initialization of Sentry on the server side.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  
  // Custom error filtering for server-side
  beforeSend(event, hint) {
    const error = hint.originalException;
    
    if (error && error instanceof Error) {
      // Filter out expected server errors
      if (error.message?.includes('ECONNRESET') || 
          error.message?.includes('ENOTFOUND')) {
        return null;
      }
      
      // Log but don't track build-time errors in production
      if (process.env.NODE_ENV === 'production' && 
          error.stack?.includes('webpack')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Add server-specific context
  beforeSendTransaction(event) {
    event.tags = {
      ...event.tags,
      server: 'tinacom-api',
      version: '1.0.0'
    };
    
    event.contexts = {
      ...event.contexts,
      app: {
        name: 'Tinacom Catalog',
        version: '1.0.0'
      }
    };
    
    return event;
  }
});