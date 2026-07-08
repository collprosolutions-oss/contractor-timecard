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
  getMaintenanceForProperty,
  getPlan,
  getProperty,
  getWorkOrdersForProperty,
  getRequestsForProperty,
  getVisibleChecklist,
  getVisitsForProperty,
  checklistSupport,
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
  const maintenance = getMaintenanceForProperty(property.id);
  const workOrders = getWorkOrdersForProperty(property.id);
  const includedServices = getIncludedServices(property.planId);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Property management"
          title={property.name}
          body={property.notes.join(" ")}
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
                <p>GPS: {property.gps}</p>
                <p>Client: {client?.name ?? "Unknown owner"}</p>
                <p>Gate code: {property.gateCode}</p>
                <p>Alarm code: {property.alarmCode}</p>
                <p>Next visit: {property.nextVisitDate}</p>
              </div>
            </div>
          }
        />

        <Section
          eyebrow="Property snapshot"
          title="Manage the full property profile from one route."
          body="HQWatchfolio property management tracks address, GPS, access codes, utilities, vendors, insurance, HOA notes, keys, smart locks, and active service work."
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
            eyebrow="Property profile"
            title="Access, utilities, vendors, and compliance details."
            body="Everything a field team or office coordinator needs should be visible before they arrive on site."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Access and property admin" detail="Gate, alarm, keys, locks, insurance, and HOA context.">
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Gate code: {property.gateCode}</p>
                  <p>Alarm code: {property.alarmCode}</p>
                  <p>Key storage: {property.keyStorage}</p>
                  <p>Smart lock code: {property.smartLockCode}</p>
                  <p>Insurance: {property.insurance}</p>
                  <p>HOA: {property.hoa}</p>
                </div>
              </Panel>
              <Panel title="Utilities and preferred vendors" detail="Utility references and go-to service partners.">
                <div className="space-y-3">
                  <div className="space-y-2">
                    {property.utilityInfo.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {property.preferredVendors.map((vendor) => (
                      <div key={vendor} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                        {vendor}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-300">Property photo library: {property.photoCount} items</p>
                </div>
              </Panel>
            </div>
          </Section>

          <div className="space-y-6">
            <Section
              eyebrow="Visit management"
              title="Recurring visits, GPS verification, and time tracking."
              body="Each visit captures check-in, check-out, arrival and departure photos, voice notes, time tracking, and digital signatures."
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
                      Recurrence: {visit.recurrence} · Arrival photos: {visit.arrivalPhotos} · Departure photos: {visit.departurePhotos}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Digital signature: {visit.digitalSignature} · Checklist completion: {visit.checklistCompletion}%
                    </p>
                  </Panel>
                ))}
              </div>
            </Section>

            <Section
              eyebrow="Included services and work"
              title="What is already covered for this property."
              body="The plan determines service entitlements, AI reporting, notifications, hurricane readiness, and work order flow."
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

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Section
            eyebrow="Inspection checklist"
            title="Customizable inspection workflow."
            body="Exterior, interior, pool, HVAC, electrical, plumbing, windows, roof, landscape, security, storm damage, generators, docks, and more can all be standardized here."
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {checklistSupport.map((support) => (
                <Badge key={support} tone="sky">
                  {support}
                </Badge>
              ))}
            </div>
            <div className="space-y-4">
              {visibleChecklist.map((category) => (
                <Panel key={category.id} title={category.title} detail={category.summary}>
                  <div className="grid gap-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
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

          <Section
            eyebrow="Maintenance and hurricane"
            title="Turn issues into action."
            body="Maintenance requests, work orders, hurricane prep, and emergency response are tied directly to the property profile."
          >
            <div className="space-y-4">
              {maintenance.map((item) => (
                <Panel
                  key={item.id}
                  title={item.title}
                  detail={item.category}
                  aside={<Badge tone={item.priority === "high" ? "rose" : item.priority === "medium" ? "amber" : "sky"}>{item.priority}</Badge>}
                >
                  <p className="text-sm text-slate-300">Maintenance status: {item.status}</p>
                </Panel>
              ))}
              {workOrders.map((workOrder) => (
                <Panel
                  key={workOrder.id}
                  title={workOrder.title}
                  detail={`${workOrder.assignedTo} · ${workOrder.estimate}`}
                  aside={<Badge tone={workOrder.status === "complete" ? "emerald" : workOrder.status === "in-progress" ? "amber" : "sky"}>{workOrder.status}</Badge>}
                >
                  <p className="text-sm text-slate-300">Work order visible to office staff, subcontractors, and the customer portal.</p>
                </Panel>
              ))}
              {alerts.map((alert) => (
                <Panel
                  key={alert.id}
                  title={alert.title}
                  detail={alert.detail}
                  aside={<Badge tone={alert.severity === "high" ? "rose" : alert.severity === "medium" ? "amber" : "emerald"}>{alert.severity}</Badge>}
                >
                  <p className="text-sm text-slate-300">{alert.channel} · {alert.state}</p>
                </Panel>
              ))}
            </div>
          </Section>
        </section>
      </div>
    </AppShell>
  );
}
