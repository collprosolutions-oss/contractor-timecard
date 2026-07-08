import { AppShell, Badge, PageHero, PrimaryLink, PropertyLinkRow, Section } from "../components/homewatch-ui";
import { clients, getClientPlanMix, properties } from "../lib/homewatch";

export default function ClientsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Client records"
          title="Manage customer accounts like a premium service platform."
          body="HQWatchfolio keeps client profiles, emergency contacts, billing context, agreements, and property relationships organized in one modern workspace."
        />

        <Section
          eyebrow="Accounts"
          title="Every client now has its own detail route."
          body="Use client pages to keep homeowner communication, property portfolio, account paperwork, and billing context together."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            {clients.map((client) => {
              const homes = getClientPlanMix(client.id);
              return (
                <div
                  key={client.id}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">
                        {client.company ?? "Private homeowner"}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">{client.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{client.notes}</p>
                    </div>
                    <Badge tone={client.status === "active" ? "emerald" : client.status === "seasonal" ? "amber" : "sky"}>
                      {client.status}
                    </Badge>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                    <p>Email: {client.email}</p>
                    <p>Phone: {client.phone}</p>
                    <p>Preferred contact: {client.preferredContact}</p>
                    <p>Properties: {homes.length}</p>
                  </div>

                  <div className="mt-5">
                    <PrimaryLink href={`/clients/${client.id}`}>Open client account</PrimaryLink>
                  </div>

                  <div className="mt-5 space-y-3">
                    {homes.map(({ property, plan }) => (
                      <PropertyLinkRow
                        key={property.id}
                        href={`/properties/${property.id}`}
                        title={property.name}
                        meta={`${property.city} · ${property.nextVisitDate}`}
                        plan={plan?.name ?? property.planId}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          eyebrow="Portfolio split"
          title="Clients can own multiple homes under different plans."
          body="This matters for subscription billing, portal access, maintenance approvals, and service-level prioritization."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
              >
                <h3 className="text-lg font-semibold text-white">{property.name}</h3>
                <p className="mt-2">{property.address}</p>
                <p className="mt-2">Next visit: {property.nextVisitDate}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
