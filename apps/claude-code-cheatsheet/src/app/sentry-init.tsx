"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/react";

let initialized = false;

export default function SentryInit() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0,
      sendDefaultPii: false,
    });
  }, []);
  return null;
}
