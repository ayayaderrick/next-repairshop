// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://8c65a80ae5f1ff56236c9dc8f4783b97@o4509320127447040.ingest.de.sentry.io/4509320180990032",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
