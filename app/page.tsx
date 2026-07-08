import {
  AppShell,
  Badge,
  PageHero,
  Panel,
  PrimaryLink,
  RouteCard,
  SecondaryLink,
  Section,
  StatCard,
  StatGrid,
} from "./components/homewatch-ui";
import {
  clients,
  getOperationsSummary,
  money,
  properties,
  subcontractors,
} from "./lib/homewatch";

export default function Page() {
  const summary = getOperationsSummary();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Platform foundation"
          title="A real route structure for your home watching app starts here."
          body="This version now separates business operations, client records, property workflows, owner portal views, and subcontractor coordination into dedicated pages backed by shared homewatch domain data."
          actions={
            <>
              <PrimaryLink href="/admin">Open admin dashboard</PrimaryLink>
              <SecondaryLink href="/portal/prop-seabrook">View client portal</SecondaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Sample workspace
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Home Watching HQ</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-400">Clients</dt>
                  <dd className="text-white">{clients.length}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-400">Properties</dt>
                  <dd className="text-white">{properties.length}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-400">Monthly recurring revenue</dt>
                  <dd className="text-white">{money(summary.activeMonthlyRevenue)}</dd>
                </div>
              </dl>
            </div>
          }
        />

        <Section
          eyebrow="Workspace map"
          title="Each audience now gets its own page."
          body="Instead of one toggle-heavy homepage, the app is organized into routes that match how the business actually works."
        >
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <RouteCard
              href="/admin"
              meta="Operations"
              title="Admin dashboard"
              body="Track recurring revenue, upcoming visits, active alerts, and dispatch work from one operations view."
            />
            <RouteCard
              href="/clients"
              meta="Accounts"
              title="Client records"
              body="See every homeowner or account, their preferred contact method, and linked properties."
            />
            <RouteCard
              href="/properties"
              meta="Portfolio"
              title="Property workflows"
              body="Open each home to review watch notes, checklist scope, visit history, and service requests."
            />
            <RouteCard
              href="/portal/prop-seabrook"
              meta="Owner experience"
              title="Client portal preview"
              body="Review the exact reports, alerts, and approval requests that an owner would see."
            />
            <RouteCard
              href="/subcontractors"
              meta="Pro network"
              title="Subcontractor board"
              body="Manage specialist partners, see active dispatch jobs, and expand the bring-a-pro lane."
            />
            <RouteCard
              href="/clients/clt-seabrook"
              meta="Example account"
              title="Sample client detail"
              body="Jump straight into a real client profile with linked homes, plan mix, and pending approvals."
            />
          </div>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Section
            eyebrow="Portfolio health"
            title="Use operations data across every route."
            body="These metrics now come from a shared domain model for clients, properties, visits, alerts, and vendor jobs."
          >
            <StatGrid>
              <StatCard
                label="Monthly recurring revenue"
                value={money(summary.activeMonthlyRevenue)}
                detail="Across all active sample properties"
              />
              <StatCard
                label="Scheduled visits"
                value={String(summary.scheduledVisits)}
                detail="Ready for the next service window"
              />
              <StatCard
                label="Open alerts"
                value={String(summary.openAlerts)}
                detail="Properties needing active follow-up"
              />
              <StatCard
                label="Vendor jobs"
                value={String(summary.vendorJobs)}
                detail="Marketplace-style dispatch requests"
              />
            </StatGrid>
          </Section>

          <Section
            eyebrow="Launch direction"
            title="What this unlocks next."
            body="This route and data split is the bridge from polished mockup to actual product workflows."
          >
            <div className="space-y-4">
              <Panel
                title="Ready for real persistence"
                detail="The shared data layer can be swapped for database-backed loaders without rethinking the route structure."
              >
                <Badge tone="emerald">Next: database + auth</Badge>
              </Panel>
              <Panel
                title="Ready for role-based access"
                detail="Admin, owner, staff, and subcontractor views are now conceptually separated into their own screens."
              >
                <Badge tone="sky">Next: role permissions</Badge>
              </Panel>
              <Panel
                title="Ready for job workflows"
                detail="Service requests and vendor jobs can evolve into full dispatch pipelines with status changes and approvals."
              >
                <Badge tone="amber">{subcontractors.length} sample partners</Badge>
              </Panel>
            </div>
          </Section>
        </section>
      </div>
    </AppShell>
  );
}