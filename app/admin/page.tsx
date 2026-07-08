import {
  Badge,
  AppShell,
  PageHero,
  Panel,
  PrimaryLink,
  PropertyLinkRow,
  Section,
  StatCard,
  StatGrid,
} from "../components/homewatch-ui";
import {
  activities,
  maintenanceRequests,
  getDispatchBoard,
  getOperationsSummary,
  money,
  plans,
  properties,
  teamMembers,
  visits,
  weatherAlerts,
  workOrders,
} from "../lib/homewatch";

export default function AdminPage() {
  const summary = getOperationsSummary();
  const dispatchBoard = getDispatchBoard();
  const recentVisits = [...visits].reverse().slice(0, 3);
  const recentWorkOrders = workOrders.slice(0, 3);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Office dashboard"
          title="Run HQWatchfolio like an enterprise Home Watch operation."
          body="Track today’s visits, active clients, weather exposure, hurricane readiness, maintenance, work orders, and recent activity from one modern operations screen."
          actions={
            <>
              <PrimaryLink href="/properties">Review property portfolio</PrimaryLink>
              <PrimaryLink href="/subcontractors">Open work orders</PrimaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Daily control center
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">HQWatchfolio Snapshot</h2>
              </div>
              <StatCard
                label="Monthly recurring revenue"
                value={money(summary.activeMonthlyRevenue)}
                detail={`${summary.propertyCount} active properties across the portfolio`}
              />
            </div>
          }
        />

        <Section
          eyebrow="Today&apos;s metrics"
          title="See the numbers that matter before the first truck rolls."
          body="The dashboard now mirrors a real Home Watch office view with operations, weather, maintenance, and service delivery signals all in one place."
        >
          <StatGrid>
            <StatCard
              label="Today&apos;s visits"
              value={String(summary.todaysVisits)}
              detail="Scheduled inspections on deck"
            />
            <StatCard
              label="Active clients"
              value={String(summary.clientCount)}
              detail="Customers served this cycle"
            />
            <StatCard
              label="Active properties"
              value={String(summary.propertyCount)}
              detail="Homes inside the watch portfolio"
            />
            <StatCard
              label="Completed visits"
              value={String(summary.completedVisits)}
              detail="Reports ready for portal delivery"
            />
            <StatCard
              label="Weather alerts"
              value={String(summary.weatherAlerts)}
              detail="Environmental watch items to review"
            />
            <StatCard
              label="Hurricane alerts"
              value={String(summary.hurricaneAlerts)}
              detail="Priority properties needing readiness"
            />
            <StatCard
              label="Open maintenance"
              value={String(summary.openMaintenanceRequests)}
              detail="Issues waiting for work order action"
            />
            <StatCard
              label="Upcoming schedule"
              value={String(summary.upcomingSchedule)}
              detail="Visits visible in the routing lane"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Section
            eyebrow="Upcoming schedule"
            title="Today&apos;s route load and recurring visit plan."
            body="Recurring visits, GPS verification, and checklist completion targets should all be visible to the office before dispatch."
          >
            <div className="grid gap-4">
              {recentVisits.map((visit) => (
                <Panel
                  key={visit.id}
                  title={`${visit.scheduledFor} · ${visit.watcher}`}
                  detail={visit.summary}
                  aside={<Badge tone={visit.gpsVerified ? "emerald" : "amber"}>{visit.gpsVerified ? "GPS verified" : "Needs GPS"}</Badge>}
                >
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>Recurrence: {visit.recurrence}</p>
                    <p>Check-in: {visit.checkIn}</p>
                    <p>Check-out: {visit.checkOut}</p>
                    <p>Arrival / departure photos: {visit.arrivalPhotos}/{visit.departurePhotos}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Weather and hurricane"
            title="Protect priority properties before a storm hits."
            body="HQWatchfolio surfaces weather pressure and hurricane readiness as a first-class operational workflow."
          >
            <div className="space-y-4">
              {weatherAlerts.map((alert) => (
                <Panel
                  key={alert.title}
                  title={alert.title}
                  detail={alert.detail}
                  aside={
                    <Badge tone={alert.severity === "warning" ? "rose" : "amber"}>
                      {alert.severity}
                    </Badge>
                  }
                >
                  <p className="text-sm text-slate-300">
                    Enterprise properties can be prioritized automatically during severe events.
                  </p>
                </Panel>
              ))}
            </div>
          </Section>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Section
            eyebrow="Portfolio"
            title="Jump directly into watched properties."
            body="The office can drill into any home to inspect access details, notes, checklist scope, reports, and maintenance history."
          >
            <div className="space-y-3">
              {properties.map((property) => {
                const plan = plans.find((entry) => entry.id === property.planId);
                return (
                  <PropertyLinkRow
                    key={property.id}
                    href={`/properties/${property.id}`}
                    title={property.name}
                    meta={`${property.city} · next visit ${property.nextVisitDate}`}
                    plan={plan?.name ?? property.planId}
                  />
                );
              })}
            </div>
          </Section>

          <Section
            eyebrow="Maintenance and work orders"
            title="Move from issue to action without leaving the dashboard."
            body="Open maintenance requests, work orders, estimates, and vendor assignments belong in the same operational queue."
          >
            <div className="space-y-4">
              {dispatchBoard.map(({ request, property, subcontractor, service }) => (
                <Panel
                  key={request.id}
                  title={request.title}
                  detail={`${property?.name ?? "Unknown property"} · ${service?.name ?? "Service"}`}
                  aside={
                    <Badge
                      tone={
                        request.status === "done"
                          ? "emerald"
                          : request.status === "in-progress"
                            ? "amber"
                            : "sky"
                      }
                    >
                      {request.status}
                    </Badge>
                  }
                >
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>Scheduled: {request.scheduledFor}</p>
                    <p>Estimate: {request.estimateLabel}</p>
                    <p>Assigned pro: {subcontractor?.name ?? "Internal team"}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </Section>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Section
            eyebrow="Maintenance requests"
            title="Open issues from inspections."
            body="Inspection findings can become maintenance requests with status, category, and priority tracking."
          >
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <Panel
                  key={request.id}
                  title={request.title}
                  detail={request.category}
                  aside={
                    <Badge tone={request.priority === "high" ? "rose" : request.priority === "medium" ? "amber" : "sky"}>
                      {request.priority}
                    </Badge>
                  }
                >
                  <p className="text-sm text-slate-300">Status: {request.status}</p>
                </Panel>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Team, activity, and work orders"
            title="Keep the office team aligned."
            body="Roles, permissions, GPS policies, work order load, and recent activity should stay visible throughout the day."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <Panel key={member.id} title={member.name} detail={member.role} aside={<Badge tone="sky">{member.gpsTracking}</Badge>}>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>Shift: {member.shift}</p>
                      <p>Permissions: {member.permissions.join(", ")}</p>
                      <p>Performance: {member.performance}</p>
                    </div>
                  </Panel>
                ))}
              </div>
              <div className="space-y-4">
                {recentWorkOrders.map((workOrder) => (
                  <Panel
                    key={workOrder.id}
                    title={workOrder.title}
                    detail={`${workOrder.assignedTo} · ${workOrder.estimate}`}
                    aside={
                      <Badge
                        tone={
                          workOrder.status === "complete"
                            ? "emerald"
                            : workOrder.status === "in-progress"
                              ? "amber"
                              : "sky"
                        }
                      >
                        {workOrder.status}
                      </Badge>
                    }
                  >
                    <p className="text-sm text-slate-300">Visible to the office dashboard and customer portal approval flow.</p>
                  </Panel>
                ))}
                {activities.map((activity) => (
                  <Panel key={`${activity.title}-${activity.timestamp}`} title={activity.title} detail={activity.detail} aside={<Badge>{activity.timestamp}</Badge>}>
                    <p className="text-sm text-slate-300">Part of the recent activity stream.</p>
                  </Panel>
                ))}
              </div>
            </div>
          </Section>
        </section>
      </div>
    </AppShell>
  );
}
