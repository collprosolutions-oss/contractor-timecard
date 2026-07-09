# HQWatchfolio

`HQWatchfolio` is the complete Home Watch management platform for professional companies that need modern SaaS workflows for visits, inspections, customer communication, maintenance, and hurricane readiness.

- admin operations
- client accounts
- property workflows
- owner portal reporting
- subcontractor coordination

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the app.

## Connect Your Real Web Address

To use `hqwatchfolio.com` instead of localhost:

1. Set `NEXT_PUBLIC_SITE_URL` to your live domain:

```bash
NEXT_PUBLIC_SITE_URL=https://hqwatchfolio.com
```

2. Deploy the app to Vercel.
3. Add your custom domains in the Vercel project:
   - `hqwatchfolio.com`
   - `www.hqwatchfolio.com`
4. Add DNS records at your registrar or DNS provider:
   - apex/root record: `A` record for `@` -> `76.76.21.21`
   - subdomain record: `CNAME` record for `www` -> `cname.vercel-dns-0.com`

The app now uses `NEXT_PUBLIC_SITE_URL` for metadata and canonical URL generation.

Note: Vercel can sometimes show project-specific DNS values in the dashboard. If Vercel gives you a different target value for your project, use the value shown in Vercel.

## Add Your Own Logo

To replace the current HQWatchfolio branding with your own logo:

- replace `public/brand-logo.svg` with your logo
- replace `public/brand-icon.svg` with your square icon
- replace `app/icon.svg` if you also want the browser/app icon updated

The UI now reads from the generic `brand-logo` and `brand-icon` asset paths so you can swap artwork without editing components.

## Current App Structure

- `/` - landing page and workspace map
- `/admin` - operations dashboard
- `/clients` - client list
- `/clients/[clientId]` - client detail
- `/properties` - property list
- `/properties/[propertyId]` - property operations
- `/portal/[propertyId]` - owner-facing portal
- `/subcontractors` - subcontractor roster and dispatch queue

## Brand

- Primary domain: `HQWatchfolio.com`
- Secondary domain: `HQWatchfolio.net`
- Tagline: `The Complete Home Watch Management Platform`

## Tech

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
