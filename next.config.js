const createNextIntlPlugin = require("next-intl/plugin");
const { withSentryConfig } = require("@sentry/nextjs");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Semua route
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          process.env.NODE_ENV === "development"
            ? {
                key: "Content-Security-Policy",
                value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
                style-src 'self' 'unsafe-inline';
                connect-src *;
                img-src * data:;
                frame-src https://www.google.com;
                worker-src 'self' blob:;
                frame-ancestors 'self';
              `
                  .replace(/\n/g, "")
                  .trim(),
              }
            : {
                key: "Content-Security-Policy",
                value: `
                default-src 'self';
                script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com;
                style-src 'self' https://fonts.googleapis.com;
                font-src 'self' https://fonts.gstatic.com;
                connect-src 'self' https://sentry.io https://www.google-analytics.com https://maps.googleapis.com;
                img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com;
                frame-src https://www.google.com;
                frame-ancestors 'self';
              `
                  .replace(/\n/g, "")
                  .trim(),
              },
        ],
      },
    ];
  },
};

const intlAndCustomConfig = withNextIntl(nextConfig);

module.exports = withSentryConfig(intlAndCustomConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "depasinfection",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
