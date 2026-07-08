import {
  AppShell,
  Badge,
  PageHero,
  Panel,
  PrimaryLink,
  PropertyLinkRow,
  Section,
  StatCard,
  StatGrid,
} from "../components/homewatch-ui";
import {
  getDispatchBoard,
  getOperationsSummary,
  money,
  plans,
  properties,
  visits,
} from "../lib/homewatch";

export default function AdminPage() {
  const summary = getOperationsSummary();
  const dispatchBoard = getDispatchBoard();
  const recentVisits = [...visits].reverse().slice(0, 3);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Operations workspace"
          title="Run the business from a dedicated admin dashboard."
          body="This page is where the home watching company tracks recurring revenue, plan mix, portfolio activity, and subcontractor dispatches."
          actions={
            <>
              <PrimaryLink href="/properties">Review properties</PrimaryLink>
              <PrimaryLink href="/subcontractors">Open dispatch board</PrimaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Today&apos;s load
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Operations snapshot</h2>
              </div>
              <StatCard
                label="MRR"
                value={money(summary.activeMonthlyRevenue)}
                detail={`${summary.propertyCount} active watched properties`}
              />
            </div>
          }
        />

        <Section
          eyebrow="Business metrics"
          title="Keep the service side visible."
          body="The admin view now reads the same client, property, visit, alert, and dispatch data used across the rest of the app."
        >
          <StatGrid>
            <StatCard
              label="Active clients"
              value={String(summary.clientCount)}
              detail="Accounts receiving recurring service"
            />
            <StatCard
              label="Watched properties"
              value={String(summary.propertyCount)}
              detail="Homes currently in the portfolio"
            />
            <StatCard
              label="Scheduled visits"
              value={String(summary.scheduledVisits)}
              detail="Next stops already on the board"
            />
            <StatCard
              label="Open alerts"
              value={String(summary.openAlerts)}
              detail="Operational issues still being tracked"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Section
            eyebrow="Plan mix"
            title="Match plans to homes and service depth."
            body="Each plan controls visit cadence, reporting depth, and which add-on services or partner lanes are active."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <Panel
                  key={plan.id}
                  title={plan.name}
                  detail={plan.summary}
                  aside={<Badge tone="sky">{money(plan.monthlyPrice)}/mo</Badge>}
                >
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>{plan.visitCadence}</p>
                    <p>{plan.reportTurnaround}</p>
                    <p>{plan.responseWindow}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Recent visit activity"
            title="Watch recent completions and follow-up."
            body="Recent service events and follow-up signals now belong to the admin workflow rather than a single mixed homepage."
          >
            <div className="space-y-4">
              {recentVisits.map((visit) => (
                <Panel
                  key={visit.id}
                  title={`${visit.scheduledFor} · ${visit.watcher}`}
                  detail={visit.summary}
                  aside={
                    <Badge tone={visit.status === "completed" ? "emerald" : visit.status === "scheduled" ? "sky" : "amber"}>
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
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Section
            eyebrow="Portfolio"
            title="Jump from admin into specific homes."
            body="Each property now has its own route where operations can review checklist scope, visit history, and vendor work."
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
            eyebrow="Dispatch board"
            title="Track partner work in one lane."
            body="Service requests, owner approvals, and subcontractor assignments are grouped together so the business can manage work beyond the standard visit."
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
      </div>
    </AppShell>
  );
}
