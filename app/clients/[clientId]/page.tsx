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
  brand,
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
          eyebrow="Client management"
          title={client.name}
          body={client.notes}
          badge={`${brand.name} account workspace`}
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
          title="Manage the customer relationship from one account screen."
          body="Client management in HQWatchfolio includes contact details, emergency contacts, billing, documents, agreements, and linked properties."
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
              label="Billing plan"
              value={client.billing.planName}
              detail={client.billing.autopay}
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
            eyebrow="Contacts and approvals"
            title="Emergency contacts, billing, and decision flow."
            body="This route keeps the customer communication layer clear before the team moves into property or work order detail."
          >
            <div className="space-y-4">
              <Panel title="Primary communication" detail={client.preferredContact} aside={<Badge tone="sky">{client.status}</Badge>}>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Email: {client.email}</p>
                  <p>Phone: {client.phone}</p>
                  <p>Billing email: {client.billing.billingEmail}</p>
                  <p>Stripe: {client.billing.stripeStatus}</p>
                  <p>QuickBooks: {client.billing.quickbooksExport}</p>
                </div>
              </Panel>
              <Panel title="Emergency contacts" detail="People HQWatchfolio should contact during urgent issues.">
                <div className="space-y-3">
                  {client.emergencyContacts.map((contact) => (
                    <div key={contact.phone} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                      <p className="font-medium text-white">{contact.name}</p>
                      <p>{contact.relationship}</p>
                      <p>{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </Panel>
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
          eyebrow="Documents and agreements"
          title="Keep account paperwork visible."
          body="Home Watch teams need fast access to agreements, compliance docs, and billing references before dispatching work."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Documents" detail="Reference files linked to the account.">
              <div className="space-y-2">
                {client.documents.map((document) => (
                  <div key={document} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                    {document}
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Agreements" detail="Service and operational approvals already on file.">
              <div className="space-y-2">
                {client.agreements.map((agreement) => (
                  <div key={agreement} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                    {agreement}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
