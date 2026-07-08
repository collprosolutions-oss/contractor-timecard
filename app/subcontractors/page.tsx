import { AppShell, Badge, PageHero, Panel, PrimaryLink, Section, StatCard, StatGrid } from "../components/homewatch-ui";
import { getDispatchBoard, subcontractors } from "../lib/homewatch";

export default function SubcontractorsPage() {
  const dispatchBoard = getDispatchBoard();
  const activeJobs = dispatchBoard.filter(({ request }) => request.status !== "done");

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Subcontractor network"
          title="Run the pro network as part of HQWatchfolio."
          body="This route turns vendor coordination into a dedicated board where the office can manage approved partners, dispatch work orders, estimates, and completion updates."
          actions={<PrimaryLink href="/admin">Back to admin</PrimaryLink>}
        />

        <Section
          eyebrow="Partner metrics"
          title="Keep the pro network visible."
          body="The subcontractor route makes vendor capacity, response windows, work order volume, and field status part of daily operations."
        >
          <StatGrid>
            <StatCard
              label="Approved partners"
              value={String(subcontractors.length)}
              detail="Specialists ready for dispatch"
            />
            <StatCard
              label="Active jobs"
              value={String(activeJobs.length)}
              detail="Requests still open or scheduled"
            />
            <StatCard
              label="Coverage lanes"
              value={String(new Set(subcontractors.map((subcontractor) => subcontractor.trade)).size)}
              detail="Distinct trade categories"
            />
            <StatCard
              label="Priority response"
              value="2 hours"
              detail="Fastest current partner response window"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Section
            eyebrow="Roster"
            title="Approved specialist partners."
            body="These partners are linked to plan tiers and can be surfaced in the owner approval flow."
          >
            <div className="space-y-4">
              {subcontractors.map((subcontractor) => (
                <Panel
                  key={subcontractor.id}
                  title={subcontractor.name}
                  detail={subcontractor.status}
                  aside={<Badge tone="sky">{subcontractor.responseWindow}</Badge>}
                >
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>{subcontractor.trade}</p>
                    <p>{subcontractor.coverage}</p>
                    <p>{subcontractor.services.join(", ")}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Dispatch queue"
            title="Jobs currently moving through the network."
            body="This is where add-on work, maintenance dispatches, and estimate-based repairs become visible operational workflows rather than notes hidden in a report."
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
                    <p>Assigned to: {subcontractor?.name ?? "Internal team"}</p>
                    <p>Scheduled: {request.scheduledFor}</p>
                    <p>Estimate: {request.estimateLabel}</p>
                    <p>
                      Approval: {request.ownerApprovalRequired ? "Owner sign-off needed" : "No approval blocker"}
                    </p>
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
