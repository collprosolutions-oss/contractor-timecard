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
  getApprovalsForProperty,
  getIncludedServices,
  getPlan,
  getProperty,
  getReportsForProperty,
  money,
  type PlanId,
} from "../../lib/homewatch";

const planOrder = ["core", "plus", "signature"] as const;

function canSee(currentPlanId: PlanId, requiredPlanId: PlanId) {
  return planOrder.indexOf(currentPlanId) >= planOrder.indexOf(requiredPlanId);
}

export default async function PortalPropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = getProperty(propertyId);

  if (!property) {
    notFound();
  }

  const plan = getPlan(property.planId);
  const reports = getReportsForProperty(property.id).filter((report) =>
    canSee(property.planId, report.visibility)
  );
  const alerts = getAlertsForProperty(property.id).filter((alert) =>
    canSee(property.planId, alert.visibility)
  );
  const approvals = getApprovalsForProperty(property.id);
  const services = getIncludedServices(property.planId);
  const approvalExposure = approvals.reduce((sum, approval) => {
    const amount = Number.parseInt(approval.amount.replace(/[^0-9]/g, ""), 10);
    return sum + (Number.isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Owner portal"
          title={`Portal for ${property.name}`}
          body="This route is the client-facing side of the product. It shows the reports, alerts, included services, and approvals available at the current subscription level."
          actions={
            <>
              <PrimaryLink href={`/properties/${property.id}`}>Open property operations</PrimaryLink>
              <PrimaryLink href="/clients">Back to account list</PrimaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <Badge tone="sky">{plan?.name ?? property.planId}</Badge>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Next visit: {property.nextVisitDate}</p>
                <p>{plan?.reportTurnaround}</p>
                <p>{plan?.responseWindow}</p>
              </div>
            </div>
          }
        />

        <Section
          eyebrow="Portal visibility"
          title="Let owners see what happened every time you visit."
          body="The plan tier controls how deep the portal goes, from routine summaries up through photo-heavy reporting and approval requests."
        >
          <StatGrid>
            <StatCard
              label="Visible reports"
              value={String(reports.length)}
              detail="Reports unlocked for this plan"
            />
            <StatCard
              label="Visible alerts"
              value={String(alerts.length)}
              detail="Alert cards and notification lanes"
            />
            <StatCard
              label="Included services"
              value={String(services.length)}
              detail="Services the owner can expect each cycle"
            />
            <StatCard
              label="Approval exposure"
              value={money(approvalExposure)}
              detail="Current work waiting on decisions"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Section
            eyebrow="Report feed"
            title="Completed visit reports."
            body="This is the portal timeline the client reviews after each completed visit."
          >
            <div className="space-y-4">
              {reports.map((report) => (
                <Panel
                  key={report.id}
                  title={report.title}
                  detail={report.summary}
                  aside={<Badge tone="sky">{report.date}</Badge>}
                >
                  <p className="text-sm text-slate-300">{report.photos} photos attached</p>
                </Panel>
              ))}
            </div>
          </Section>

          <div className="space-y-6">
            <Section
              eyebrow="Alert cards"
              title="Open issues and watch items."
              body="Alerts stay visible here so owners know when something was flagged, watched, or resolved."
            >
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Panel
                    key={alert.id}
                    title={alert.title}
                    detail={alert.detail}
                    aside={
                      <Badge
                        tone={
                          alert.severity === "high"
                            ? "rose"
                            : alert.severity === "medium"
                              ? "amber"
                              : "emerald"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    }
                  >
                    <p className="text-sm text-slate-300">
                      {alert.channel} · {alert.state}
                    </p>
                  </Panel>
                ))}
              </div>
            </Section>

            <Section
              eyebrow="Approvals"
              title="Owner decisions without extra phone calls."
              body="This page now models how owners can review and approve extra work directly in the portal."
            >
              <div className="space-y-4">
                {approvals.map((approval) => (
                  <Panel
                    key={approval.id}
                    title={approval.title}
                    detail={approval.detail}
                    aside={
                      <Badge
                        tone={
                          approval.status === "approved"
                            ? "emerald"
                            : approval.status === "upgrade-required"
                              ? "amber"
                              : "sky"
                        }
                      >
                        {approval.status}
                      </Badge>
                    }
                  >
                    <p className="text-sm text-slate-300">
                      {approval.amount} · requested {approval.requestedOn}
                    </p>
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
