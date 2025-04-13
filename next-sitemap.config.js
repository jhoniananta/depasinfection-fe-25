/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://depasinfection.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin", "/admin/*", "/sandbox", "/sandbox/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/sandbox", "/sandbox/*"],
      },
    ],
    additionalSitemaps: ["https://depasinfection.com/sitemap-0.xml"],
  },
};
