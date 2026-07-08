# homewatch-app

`homewatch-app` is a Next.js foundation for a home watching business. It includes dedicated routes for:

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

## Current App Structure

- `/` - landing page and workspace map
- `/admin` - operations dashboard
- `/clients` - client list
- `/clients/[clientId]` - client detail
- `/properties` - property list
- `/properties/[propertyId]` - property operations
- `/portal/[propertyId]` - owner-facing portal
- `/subcontractors` - subcontractor roster and dispatch queue

## Tech

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
