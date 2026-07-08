import {
  AppShell,
  Badge,
  BrandLogo,
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
  activities,
  brand,
  marketingFeatures,
  pricingTiers,
  testimonials,
  getOperationsSummary,
  money,
  properties,
  reportModules,
  teamMembers,
} from "./lib/homewatch";

export default function Page() {
  const summary = getOperationsSummary();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Professional Home Watch SaaS"
          badge="Built for Home Watch companies that want to scale like modern service businesses"
          title="Run your Home Watch company on HQWatchfolio."
          body="HQWatchfolio is the complete Home Watch management platform for GPS verified visits, inspections, AI-powered reports, hurricane preparation, maintenance coordination, customer communication, and office visibility."
          actions={
            <>
              <PrimaryLink href="/admin">Start Free Trial</PrimaryLink>
              <SecondaryLink href="/#demo">Book Demo</SecondaryLink>
            </>
          }
          sidecar={
            <div className="space-y-5">
              <BrandLogo />
              <div className="grid gap-3">
                <StatCard
                  label="Active properties"
                  value={String(summary.propertyCount)}
                  detail="Sample portfolio inside the platform"
                />
                <StatCard
                  label="Completed visits"
                  value={String(summary.completedVisits)}
                  detail="Reports and media already flowing into the portal"
                />
                <StatCard
                  label="HQWatchfolio MRR demo"
                  value={money(summary.activeMonthlyRevenue)}
                  detail="Example recurring subscription revenue"
                />
              </div>
            </div>
          }
        />

        <Section
          eyebrow="Core platform features"
          title="Everything Home Watch companies need in one clean platform."
          body="HQWatchfolio combines field workflows, customer communication, storm readiness, reporting, billing, and office operations into one enterprise-quality product."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {marketingFeatures.map((feature) => (
              <Panel key={feature.title} title={feature.title} detail={feature.description}>
                <Badge tone="sky">HQWatchfolio</Badge>
              </Panel>
            ))}
          </div>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Section
            eyebrow="Office dashboard"
            title="See the business before the day gets away from you."
            body="Your office dashboard brings today’s visits, client load, active properties, maintenance, weather risk, and recent activity into one place."
          >
            <StatGrid>
              <StatCard
                label="Today's visits"
                value={String(summary.todaysVisits)}
                detail="Upcoming schedule ready for dispatch"
              />
              <StatCard
                label="Active clients"
                value={String(summary.clientCount)}
                detail="Professional Home Watch accounts"
              />
              <StatCard
                label="Weather alerts"
                value={String(summary.weatherAlerts)}
                detail="Storm and severe weather warnings"
              />
              <StatCard
                label="Open maintenance"
                value={String(summary.openMaintenanceRequests)}
                detail="Requests waiting on action"
              />
            </StatGrid>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {activities.map((activity) => (
                <Panel
                  key={`${activity.title}-${activity.timestamp}`}
                  title={activity.title}
                  detail={activity.detail}
                  aside={<Badge>{activity.timestamp}</Badge>}
                >
                  <p className="text-sm text-slate-300">Visible in the office dashboard activity feed.</p>
                </Panel>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Platform modules"
            title="Built to become the Jobber or ServiceTitan of Home Watch."
            body="The product scope already maps the core modules needed to run professional operations end to end."
          >
            <div className="space-y-4">
              <Panel
                title="Team Management"
                detail={`${teamMembers.length} sample team profiles cover roles, GPS policies, scheduling, and performance.`}
              >
                <Badge tone="emerald">Employees · Permissions · Payroll export</Badge>
              </Panel>
              <Panel
                title="Reporting & Billing"
                detail={`Revenue, visits, inspections, GPS logs, invoices, recurring billing, and QuickBooks-ready exports are represented in the data model.`}
              >
                <Badge tone="sky">{reportModules.length} report categories</Badge>
              </Panel>
              <Panel
                title="Mobile & Offline"
                detail="Field teams can capture GPS, photos, signatures, and notes while keeping the experience designed for a fast mobile workflow."
              >
                <Badge tone="amber">iPhone · Android · Offline mode</Badge>
              </Panel>
            </div>
          </Section>
        </section>

        <Section
          eyebrow="Testimonials"
          title="Customer proof will live here."
          body="Placeholder cards are ready for early adopter quotes from professional Home Watch operators once they come in."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Panel
                key={testimonial.role}
                title={testimonial.person}
                detail={testimonial.role}
                aside={<Badge tone="sky">Placeholder</Badge>}
              >
                <p className="text-sm leading-7 text-slate-300">{testimonial.quote}</p>
              </Panel>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Pricing"
          title="Simple SaaS packaging for Home Watch teams."
          body="Starter, Professional, and Enterprise plans align with how Home Watch companies grow from owner-operator to premium multi-team operations."
        >
          <div id="pricing" className="grid gap-4 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Panel
                key={tier.name}
                title={tier.name}
                detail={tier.summary}
                aside={<Badge tone="sky">{tier.priceLabel}</Badge>}
              >
                <div className="space-y-3">
                  <ul className="space-y-2 text-sm text-slate-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <PrimaryLink href="/admin">{tier.cta}</PrimaryLink>
                </div>
              </Panel>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Explore the app"
          title="Step inside the product."
          body="The platform is already split into purpose-built routes for office teams, field staff, homeowners, and subcontractors."
        >
          <div id="demo" className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <RouteCard
              href="/admin"
              meta="Office Dashboard"
              title="Operations command center"
              body="Track today's visits, active clients, weather alerts, maintenance, and revenue."
            />
            <RouteCard
              href="/clients"
              meta="Client Management"
              title="Client records"
              body="Manage contact info, emergency contacts, billing, documents, and agreements."
            />
            <RouteCard
              href="/properties"
              meta="Property Portfolio"
              title="Property management"
              body="Open each home to review GPS, access codes, vendors, notes, insurance, HOA, and keys."
            />
            <RouteCard
              href="/portal/prop-seabrook"
              meta="Customer Portal"
              title="Owner experience"
              body="Show reports, invoices, approvals, notifications, and visit history in one polished portal."
            />
            <RouteCard
              href="/subcontractors"
              meta="Work Orders"
              title="Pro network and dispatch"
              body="Assign vendors, track work orders, and coordinate maintenance from inspection findings."
            />
            <RouteCard
              href="/properties/prop-seabrook"
              meta="Inspection Engine"
              title="Visit and checklist workflow"
              body="See recurring visits, customizable inspection categories, and AI report generation inputs."
            />
          </div>
        </Section>

        <footer className="rounded-[2rem] border border-white/10 bg-slate-950/70 px-6 py-8 shadow-xl shadow-slate-950/20">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <BrandLogo />
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                {brand.name} is built to be the complete Home Watch management platform for professional operators that want a premium, modern, enterprise-grade system.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title="Domains" detail={`${brand.primaryDomain} · ${brand.secondaryDomain}`}>
                <p className="text-sm text-slate-300">Primary brand presence and secondary network domain.</p>
              </Panel>
              <Panel title="Primary workflows" detail="Visits, inspections, reports, billing, maintenance, and hurricane readiness">
                <p className="text-sm text-slate-300">
                  Designed for Home Watch operations, not adapted from generic service software.
                </p>
              </Panel>
            </div>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}