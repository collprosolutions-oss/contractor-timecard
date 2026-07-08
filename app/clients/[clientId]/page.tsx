import { notFound } from "next/navigation";

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
} from "../../components/homewatch-ui";
import {
  getApprovalsForProperty,
  getClient,
  getClientPlanMix,
  getRequestsForProperty,
  plans,
  properties,
} from "../../lib/homewatch";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);

  if (!client) {
    notFound();
  }

  const portfolio = getClientPlanMix(clientId);
  const linkedPropertyIds = properties
    .filter((property) => property.clientId === clientId)
    .map((property) => property.id);
  const approvals = linkedPropertyIds.flatMap((propertyId) => getApprovalsForProperty(propertyId));
  const requests = linkedPropertyIds.flatMap((propertyId) => getRequestsForProperty(propertyId));

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHero
          eyebrow="Client detail"
          title={client.name}
          body={client.notes}
          actions={
            <>
              <PrimaryLink href="/clients">Back to clients</PrimaryLink>
              <PrimaryLink href={`/portal/${portfolio[0]?.property.id ?? "prop-seabrook"}`}>
                Open owner portal view
              </PrimaryLink>
            </>
          }
          sidecar={
            <div className="space-y-4">
              <Badge tone={client.status === "active" ? "emerald" : client.status === "seasonal" ? "amber" : "sky"}>
                {client.status}
              </Badge>
              <div className="space-y-2 text-sm text-slate-300">
                <p>{client.company ?? "Private homeowner account"}</p>
                <p>{client.email}</p>
                <p>{client.phone}</p>
                <p>{client.preferredContact}</p>
              </div>
            </div>
          }
        />

        <Section
          eyebrow="Account summary"
          title="View homes, approvals, and active work from the client level."
          body="This route gives the business account context before drilling into individual properties."
        >
          <StatGrid>
            <StatCard
              label="Properties on account"
              value={String(portfolio.length)}
              detail="Linked homes under this client"
            />
            <StatCard
              label="Pending approvals"
              value={String(approvals.length)}
              detail="Owner decisions currently in play"
            />
            <StatCard
              label="Active service requests"
              value={String(requests.length)}
              detail="Dispatch or add-on work on the account"
            />
            <StatCard
              label="Plan coverage"
              value={portfolio.map(({ plan }) => plan?.name ?? "Unknown").join(", ")}
              detail="Current subscription mix"
            />
          </StatGrid>
        </Section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Section
            eyebrow="Linked homes"
            title="Property portfolio for this client."
            body="Use property routes for checklist and visit operations while keeping the account layer clean."
          >
            <div className="space-y-3">
              {portfolio.map(({ property, plan }) => (
                <PropertyLinkRow
                  key={property.id}
                  href={`/properties/${property.id}`}
                  title={property.name}
                  meta={`${property.city} · next visit ${property.nextVisitDate}`}
                  plan={plan?.name ?? property.planId}
                />
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Open approvals"
            title="Approval and dispatch context."
            body="This is where the business sees whether client decisions are blocking extra work."
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
        </section>

        <Section
          eyebrow="Plan references"
          title="Subscription options tied to this account."
          body="The client detail route can also surface plan information before billing or changes are made."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <Panel
                key={plan.id}
                title={plan.name}
                detail={plan.summary}
                aside={<Badge tone="sky">{plan.visitCadence}</Badge>}
              >
                <p className="text-sm text-slate-300">{plan.reportTurnaround}</p>
              </Panel>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
