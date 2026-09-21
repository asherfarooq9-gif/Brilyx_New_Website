import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

// 'unsafe-inline' is needed for Next's inline hydration scripts and the boot script in layout.tsx, and for
// inline style attributes set by React and GSAP. A nonce-based CSP would force every page to render dynamically.
// Extend connect-src / img-src / script-src if analytics or remote images are added.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // CSP is skipped in dev so HMR websockets and source maps keep working.
          ...(isDev ? [] : [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]),
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
