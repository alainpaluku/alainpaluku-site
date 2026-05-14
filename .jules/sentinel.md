## 2024-05-14 - Missing API Payload Bounds and CSRF Enforcement
**Vulnerability:** DoS risk via missing string maximum bounds, and missing CSRF enforcement via Content-Type checking.
**Learning:** Cloudflare Pages endpoints might assume basic security controls (like payload limits or Content-Type headers) are handled at the CDN edge, but API functions in Astro still need explicit server-side validation to avoid parsing and validation loops.
**Prevention:** Ensure all JSON API routes validate Content-Type and enforce structural length limits before parsing `request.json()` to drop bad requests early.
