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

To use your own web address instead of localhost:

1. Set `NEXT_PUBLIC_SITE_URL` to your live domain, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

2. Deploy the app to your hosting provider.
3. Point your domain DNS to that deployment.

The app now uses `NEXT_PUBLIC_SITE_URL` for metadata and canonical URL generation.

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
