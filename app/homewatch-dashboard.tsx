"use client";

import { useMemo, useState } from "react";

import {
  alerts,
  checklistCategories,
  plans,
  reportTimeline,
  roadmapItems,
  serviceCatalog,
  subcontractors,
  type AlertItem,
  type Plan,
  type PlanId,
  type ReportItem,
  type Service,
  type Subcontractor,
} from "./homewatch-data";

const planOrder: PlanId[] = ["core", "plus", "signature"];

type Workspace = "hq" | "portal";
type PortalTab = "reports" | "alerts" | "approvals";

const workspaceCopy: Record<Workspace, { eyebrow: string; title: string; body: string }> = {
  hq: {
    eyebrow: "Operations workspace",
    title: "Run home watching like a real service business.",
    body:
      "Manage recurring plans, standard visit checklists, add-on services, and dispatch partners from one operating screen.",
  },
  portal: {
    eyebrow: "Client portal preview",
    title: "Show owners what happened every time your team visits.",
    body:
      "Each plan controls what the client sees, from standard summaries to photo galleries, alerts, and approval requests.",
  },
};

function planRank(planId: PlanId) {
  return planOrder.indexOf(planId);
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function severityClasses(severity: AlertItem["severity"]) {
  if (severity === "high") {
    return "border-rose-400/50 bg-rose-500/10 text-rose-100";
  }

  if (severity === "medium") {
    return "border-amber-400/50 bg-amber-500/10 text-amber-100";
  }

  return "border-emerald-400/50 bg-emerald-500/10 text-emerald-100";
}

function statusClasses(status: "ready" | "scheduled" | "complete") {
  if (status === "complete") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "scheduled") {
    return "border-sky-500/30 bg-sky-500/10 text-sky-200";
  }

  return "border-slate-500/30 bg-slate-500/10 text-slate-200";
}

export default function HomewatchDashboard() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("plus");
  const [workspace, setWorkspace] = useState<Workspace>("hq");
  const [portalTab, setPortalTab] = useState<PortalTab>("reports");

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[1],
    [selectedPlanId]
  );

  const visibleChecklist = useMemo(
    () =>
      checklistCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.availableIn.includes(selectedPlanId)),
        }))
        .filter((category) => category.items.length > 0),
    [selectedPlanId]
  );

  const checklistStats = useMemo(() => {
    const items = visibleChecklist.flatMap((category) => category.items);
    const completed = items.filter((item) => item.status === "complete").length;
    const scheduled = items.filter((item) => item.status === "scheduled").length;
    return {
      total: items.length,
      completed,
      scheduled,
      progress: items.length === 0 ? 0 : Math.round((completed / items.length) * 100),
    };
  }, [visibleChecklist]);

  const availableServices = useMemo(
    () => serviceCatalog.filter((service) => service.recommendedFor.includes(selectedPlanId)),
    [selectedPlanId]
  );

  const includedServices = useMemo(
    () => availableServices.filter((service) => service.includedIn.includes(selectedPlanId)),
    [availableServices, selectedPlanId]
  );

  const portalReports = useMemo(
    () => reportTimeline.filter((item) => planRank(selectedPlanId) >= planRank(item.visibility)),
    [selectedPlanId]
  );

  const portalAlerts = useMemo(
    () => alerts.filter((item) => planRank(selectedPlanId) >= planRank(item.visibility)),
    [selectedPlanId]
  );

  const connectedPartners = useMemo(
    () => subcontractors.filter((partner) => partner.activationPlans.includes(selectedPlanId)),
    [selectedPlanId]
  );

  const workspaceText = workspaceCopy[workspace];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_34%),linear-gradient(180deg,_#08111f_0%,_#0f172a_45%,_#0b1120_100%)] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-sky-950/30 backdrop-blur">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.4fr_0.8fr] md:px-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-medium text-sky-100">
                  Home Watching HQ
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                  Built for recurring monthly plans
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                  Client portal + vendor network
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">
                  {workspaceText.eyebrow}
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {workspaceText.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                  {workspaceText.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <WorkspaceButton
                  active={workspace === "hq"}
                  label="Business HQ"
                  onClick={() => setWorkspace("hq")}
                />
                <WorkspaceButton
                  active={workspace === "portal"}
                  label="Client Portal"
                  onClick={() => setWorkspace("portal")}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <MetricCard
                  label="Monthly recurring fee"
                  value={money(selectedPlan.monthlyPrice)}
                  detail={selectedPlan.name}
                />
                <MetricCard
                  label="Visit cadence"
                  value={selectedPlan.visits}
                  detail={selectedPlan.reportTurnaround}
                />
                <MetricCard
                  label="Checklist completion"
                  value={`${checklistStats.progress}%`}
                  detail={`${checklistStats.completed}/${checklistStats.total} items complete`}
                />
                <MetricCard
                  label="Connected pro lanes"
                  value={String(connectedPartners.length)}
                  detail="Dispatch-ready subcontractors"
                />
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Active plan
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{selectedPlan.name}</h2>
                </div>
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/90">MRR</p>
                  <p className="text-xl font-semibold text-emerald-100">
                    {money(selectedPlan.monthlyPrice)}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm text-slate-300">
                <DetailRow label="Best fit" value={selectedPlan.ownerFit} />
                <DetailRow label="Response promise" value={selectedPlan.responseWindow} />
                <DetailRow label="Portal reporting" value={selectedPlan.reportTurnaround} />
              </dl>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-sm font-medium text-white">What the client gets</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {includedServices.slice(0, 4).map((service) => (
                    <li key={service.id} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                      <span>{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
            <SectionHeading
              eyebrow="Subscription plans"
              title="Start with the monthly plan structure."
              body="Each plan controls visit cadence, reporting depth, and which add-on services and pro lanes are available."
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  active={plan.id === selectedPlanId}
                  plan={plan}
                  onClick={() => setSelectedPlanId(plan.id)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
            <SectionHeading
              eyebrow="Launch summary"
              title="What this MVP covers first."
              body="Core recurring operations, owner-facing reports, and vendor coordination are ready to grow into a full platform."
            />
            <div className="mt-6 space-y-4">
              <LaunchSummaryItem
                title="Business owner control"
                text="Choose the plan, standardize the checklist, and keep service delivery consistent."
              />
              <LaunchSummaryItem
                title="Client portal visibility"
                text="Clients see visit history, open alerts, and approvals tied to their plan."
              />
              <LaunchSummaryItem
                title="Marketplace-ready vendors"
                text="Subcontractors plug into dispatch requests so the app can expand into a pro network."
              />
            </div>
          </div>
        </section>

        {workspace === "hq" ? (
          <>
            <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
                <SectionHeading
                  eyebrow="Recurring checklist"
                  title="Use one repeatable playbook for every visit."
                  body="Tasks are filtered by plan so the team knows what is included in the monthly fee and what unlocks on premium tiers."
                />

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricCard
                    label="Checklist items"
                    value={String(checklistStats.total)}
                    detail="Visible in this plan"
                  />
                  <MetricCard
                    label="Completed now"
                    value={String(checklistStats.completed)}
                    detail="Sample visit status"
                  />
                  <MetricCard
                    label="Scheduled next"
                    value={String(checklistStats.scheduled)}
                    detail="Pending follow-up work"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {visibleChecklist.map((category) => (
                    <div
                      key={category.id}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-300">
                            {category.summary}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {category.items.length} tasks
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                          >
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-3">
                                  <h4 className="font-medium text-white">{item.title}</h4>
                                  <span
                                    className={`rounded-full border px-2.5 py-1 text-xs uppercase tracking-[0.18em] ${statusClasses(item.status)}`}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                  {item.detail}
                                </p>
                              </div>
                              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                                {item.cadence}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
                  <SectionHeading
                    eyebrow="Service catalog"
                    title="Build the bundle, then expand with add-ons."
                    body="Included work stays attached to the monthly subscription while premium services can be dispatched or approved later."
                  />
                  <div className="mt-6 space-y-3">
                    {availableServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        selectedPlanId={selectedPlanId}
                        service={service}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
                  <SectionHeading
                    eyebrow="Next buildout"
                    title="Keep shipping from this foundation."
                    body="These are the next logical additions after the starter dashboard is in place."
                  />
                  <ul className="mt-6 space-y-3">
                    {roadmapItems.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
              <SectionHeading
                eyebrow="Subcontractor network"
                title="Plug specialists into the app as dispatch partners."
                body="This is the place for your bring-a-pro / meet-a-pro style vendor lane so extra work can be coordinated without leaving the platform."
              />
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {subcontractors.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
              <SectionHeading
                eyebrow="Owner portal"
                title="Show exactly what happened at the home."
                body="The selected subscription controls which reports, alerts, and approvals the client can access."
              />

              <div className="mt-6 flex flex-wrap gap-3">
                <PortalTabButton
                  active={portalTab === "reports"}
                  label="Reports"
                  onClick={() => setPortalTab("reports")}
                />
                <PortalTabButton
                  active={portalTab === "alerts"}
                  label="Alerts"
                  onClick={() => setPortalTab("alerts")}
                />
                <PortalTabButton
                  active={portalTab === "approvals"}
                  label="Approvals"
                  onClick={() => setPortalTab("approvals")}
                />
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-sky-400/20 bg-sky-500/10 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-sky-100/80">
                      Seabrook Residence
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Portal experience for {selectedPlan.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
                      {selectedPlan.reportTurnaround}. Owners can review updates, request extra
                      work, and follow open items without calling the office.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                    Next scheduled visit: <span className="font-medium text-white">Jul 10</span>
                  </div>
                </div>
              </div>

              {portalTab === "reports" && (
                <div className="mt-6 space-y-3">
                  {portalReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}

              {portalTab === "alerts" && (
                <div className="mt-6 space-y-3">
                  {portalAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              )}

              {portalTab === "approvals" && (
                <div className="mt-6 space-y-4">
                  <ApprovalCard
                    title="Drainage correction quote"
                    amount="$420"
                    status={selectedPlanId === "signature" ? "Waiting for owner approval" : "Upgrade required"}
                    detail={
                      selectedPlanId === "signature"
                        ? "Approve Greenline Outdoor to correct low-point drainage near the side gate."
                        : "Approval workflows unlock on Signature Estate so owners can accept add-on work in the portal."
                    }
                  />
                  <ApprovalCard
                    title="Arrival prep request"
                    amount="$125"
                    status={
                      selectedPlanId === "signature" ? "Available to request" : "Can be offered as an add-on"
                    }
                    detail="Turn on lights, set temperature, and complete fridge stocking before the family arrives."
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
                <SectionHeading
                  eyebrow="Portal visibility"
                  title="What the owner can see right now."
                  body="The higher the plan, the deeper the reporting and the smoother the approval flow."
                />
                <div className="mt-6 grid gap-4">
                  <MetricCard
                    label="Visible reports"
                    value={String(portalReports.length)}
                    detail="Accessible in the current plan"
                  />
                  <MetricCard
                    label="Alert channels"
                    value={portalAlerts.map((item) => item.channel).join(", ")}
                    detail="Based on selected tier"
                  />
                  <MetricCard
                    label="Included services"
                    value={String(includedServices.length)}
                    detail="Ready for the owner to review"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
                <SectionHeading
                  eyebrow="Vendor access"
                  title="Bring pros into the workflow."
                  body="When the owner approves extra work, the business can dispatch trusted partners and report the outcome back in the same portal."
                />
                <div className="mt-6 space-y-3">
                  {subcontractors.slice(0, 3).map((partner) => (
                    <div
                      key={partner.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-white">{partner.name}</h4>
                          <p className="mt-1 text-sm text-slate-300">{partner.trade}</p>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                          {partner.responseWindow}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{partner.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function WorkspaceButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-sky-300 bg-sky-300 text-slate-950"
          : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function PortalTabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-sky-300 bg-sky-300 text-slate-950"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.24em] text-sky-200/80">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{body}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  );
}

function PlanCard({
  active,
  plan,
  onClick,
}: {
  active: boolean;
  plan: Plan;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.75rem] border p-5 text-left transition ${
        active
          ? "border-sky-300 bg-sky-400/10 shadow-lg shadow-sky-950/30"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{plan.summary}</p>
        </div>
        {active && (
          <span className="rounded-full border border-sky-200/40 bg-sky-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
            Active
          </span>
        )}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-white">{money(plan.monthlyPrice)}</p>
          <p className="mt-1 text-sm text-slate-400">per month</p>
        </div>
        <p className="text-sm text-slate-300">{plan.visits}</p>
      </div>
    </button>
  );
}

function ServiceCard({
  service,
  selectedPlanId,
}: {
  service: Service;
  selectedPlanId: PlanId;
}) {
  const included = service.includedIn.includes(selectedPlanId);

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-medium text-white">{service.name}</h3>
            <span
              className={`rounded-full border px-2.5 py-1 text-xs uppercase tracking-[0.18em] ${
                included
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-200"
              }`}
            >
              {included ? "Included" : "Add-on"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-3 py-2 text-right text-sm text-slate-300">
          <p>{service.priceLabel}</p>
          <p className="mt-1 text-xs text-slate-400">{service.delivery}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
        <span className="rounded-full border border-white/10 px-3 py-1">{service.category}</span>
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: Subcontractor }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">{partner.trade}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{partner.name}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
          {partner.responseWindow}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{partner.status}</p>
      <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <DetailRow label="Coverage" value={partner.coverage} />
        <DetailRow label="Services" value={partner.services.join(", ")} />
      </div>
    </div>
  );
}

function ReportCard({ report }: { report: ReportItem }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">{report.date}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{report.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{report.summary}</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-3 py-2 text-right text-sm text-slate-300">
          <p>{report.property}</p>
          <p className="mt-1 text-xs text-slate-400">{report.photos} photos</p>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: AlertItem }) {
  return (
    <div className={`rounded-[1.5rem] border p-4 ${severityClasses(alert.severity)}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{alert.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-200">{alert.detail}</p>
        </div>
        <span className="rounded-full border border-current/30 px-3 py-1 text-xs uppercase tracking-[0.18em]">
          {alert.severity}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-200">Delivery: {alert.channel}</p>
    </div>
  );
}

function ApprovalCard({
  title,
  amount,
  status,
  detail,
}: {
  title: string;
  amount: string;
  status: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-3 py-2 text-right text-sm text-slate-300">
          <p>{amount}</p>
          <p className="mt-1 text-xs text-slate-400">{status}</p>
        </div>
      </div>
    </div>
  );
}

function LaunchSummaryItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</dt>
      <dd className="text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}
