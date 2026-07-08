import Link from "next/link";

import { AppShell, Badge, PageHero, PrimaryLink, Section } from "../components/homewatch-ui";
import { getClient, getPlan, properties } from "../lib/homewatch";

export default function PropertiesPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Property workflows"
          title="Every watched home now has its own HQWatchfolio workspace."
          body="Property routes keep inspections, visits, access details, vendors, storm readiness, and customer-facing reporting centered on the home itself."
          actions={<PrimaryLink href="/admin">Back to admin</PrimaryLink>}
        />

        <Section
          eyebrow="Portfolio"
          title="Open a specific home to manage the work."
          body="These routes are where watch teams prepare visits, review access codes, close reports, manage work orders, and coordinate follow-up service."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            {properties.map((property) => {
              const plan = getPlan(property.planId);
              const client = getClient(property.clientId);
              return (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">{property.city}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">{property.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{property.address}</p>
                    </div>
                    <Badge tone="sky">{plan?.name ?? property.planId}</Badge>
                  </div>

                  <div className="mt-5 grid gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                    <p>Client: {client?.name ?? "Unknown owner"}</p>
                    <p>Next visit: {property.nextVisitDate}</p>
                    <p>Occupancy: {property.occupancy}</p>
                    <p>Risk level: {property.riskLevel}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
