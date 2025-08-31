// This file configures the initialization of Sentry on the browser side.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  
  // Session replay configuration (when supported)
  // replaysOnErrorSampleRate: 1.0,
  // replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.1,
  
  // Custom error filtering
  beforeSend(event, hint) {
    // Filter out specific errors
    const error = hint.originalException;
    
    if (error && error instanceof Error) {
      // Filter out common browser errors
      if (error.message?.includes('ResizeObserver loop limit exceeded')) {
        return null;
      }
      
      if (error.message?.includes('Non-Error promise rejection captured')) {
        return null;
      }
      
      // Filter out QR scanner specific errors that are expected
      if (error.message?.includes('QR Code scanner') && 
          error.message?.includes('permission')) {
        console.log('QR scanner permission denied - expected behavior');
        return null;
      }
    }
    
    return event;
  },
  
  // Custom error tags
  beforeSendTransaction(event) {
    // Add custom tags for Tinacom specific tracking
    event.tags = {
      ...event.tags,
      feature: 'tinacom-catalog',
      version: '1.0.0'
    };
    
    return event;
  }
});