import { notFound } from "next/navigation";

import {
  AppShell,
  Badge,
  PageHero,
  Panel,
  PrimaryLink,
  Section,
  StatCard,
  StatGrid,
} from "../../components/homewatch-ui";
import {
  getAlertsForProperty,
  getClient,
  getIncludedServices,
  getPlan,
  getProperty,
  getRequestsForProperty,
  getVisibleChecklist,
  getVisitsForProperty,
} from "../../lib/homewatch";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = getProperty(propertyId);

  if (!property) {
    notFound();
  }

  const client = getClient(property.clientId);
  const plan = getPlan(property.planId);
  const visibleChecklist = getVisibleChecklist(property.planId);
  const visits = getVisitsForProperty(property.id);
  const alerts = getAlertsForProperty(property.id);
  const requests = getRequestsForProperty(property.id);
  const includedServices = getIncludedServices(property.planId);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Property operations"
          title={property.name}
          body={property.watchNotes}
          actions={
            <>
              <PrimaryLink href={`/clients/${property.clientId}`}>Open client account</PrimaryLink>
              <PrimaryLink href={`/portal/${property.id}`}>Open owner portal</PrimaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <Badge tone="sky">{plan?.name ?? property.planId}</Badge>
              <div className="space-y-2 text-sm text-slate-300">
                <p>{property.address}</p>
                <p>Client: {client?.name ?? "Unknown owner"}</p>
                <p>Access: {property.accessProfile}</p>
                <p>Next visit: {property.nextVisitDate}</p>
              </div>
            </div>
          }
        />

        <Section
          eyebrow="Property snapshot"
          title="Run checklist and service work from the home itself."
          body="This route is where staff should see what is included, what is open, and what happens on the next visit."
        >
          <StatGrid>
            <StatCard
              label="Plan"
              value={plan?.name ?? property.planId}
              detail={plan?.visitCadence ?? "Unknown cadence"}
            />
            <StatCard
              label="Checklist categories"
              value={String(visibleChecklist.length)}
              detail="Visible for this plan tier"
            />
            <StatCard
              label="Open alerts"
              value={String(alerts.length)}
              detail="Items still visible to the team"
            />
            <StatCard
              label="Service requests"
              value={String(requests.length)}
              detail="Add-ons or vendor work tied to this property"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Section
            eyebrow="Checklist scope"
            title="What the team is expected to cover."
            body="Checklist templates are filtered by the property's plan so staff can see the real scope without guessing."
          >
            <div className="space-y-4">
              {visibleChecklist.map((category) => (
                <Panel key={category.id} title={category.title} detail={category.summary}>
                  <div className="grid gap-3">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                      >
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                          </div>
                          <Badge tone="sky">{item.cadence}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
          </Section>

          <div className="space-y-6">
            <Section
              eyebrow="Visit timeline"
              title="Upcoming and completed visits."
              body="The property route now owns visit cadence and completion history."
            >
              <div className="space-y-4">
                {visits.map((visit) => (
                  <Panel
                    key={visit.id}
                    title={`${visit.scheduledFor} · ${visit.watcher}`}
                    detail={visit.summary}
                    aside={
                      <Badge
                        tone={
                          visit.status === "completed"
                            ? "emerald"
                            : visit.status === "needs-follow-up"
                              ? "amber"
                              : "sky"
                        }
                      >
                        {visit.status}
                      </Badge>
                    }
                  >
                    <p className="text-sm text-slate-300">
                      Checklist completion: {visit.checklistCompletion}%
                    </p>
                  </Panel>
                ))}
              </div>
            </Section>

            <Section
              eyebrow="Included services"
              title="What is already covered by plan."
              body="Add-on and dispatch lanes can grow later, but the included bundle should stay obvious."
            >
              <div className="space-y-3">
                {includedServices.map((service) => (
                  <Panel key={service.id} title={service.name} detail={service.description}>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="emerald">Included</Badge>
                      <Badge>{service.category}</Badge>
                    </div>
                  </Panel>
                ))}
              </div>
            </Section>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
