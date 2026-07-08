export type PlanId = "core" | "plus" | "signature";

export type Plan = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  visitCadence: string;
  responseWindow: string;
  reportTurnaround: string;
  summary: string;
  ownerFit: string;
  includedServiceIds: string[];
};

export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
  cadence: string;
  availableIn: PlanId[];
};

export type ChecklistCategory = {
  id: string;
  title: string;
  summary: string;
  items: ChecklistItem[];
};

export type Service = {
  id: string;
  name: string;
  category: string;
  delivery: string;
  priceLabel: string;
  description: string;
  includedIn: PlanId[];
};

export type Client = {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  status: "active" | "seasonal" | "pending";
  preferredContact: string;
  notes: string;
};

export type Property = {
  id: string;
  clientId: string;
  name: string;
  city: string;
  address: string;
  planId: PlanId;
  occupancy: string;
  riskLevel: "low" | "moderate" | "elevated";
  accessProfile: string;
  watchNotes: string;
  nextVisitDate: string;
};

export type Visit = {
  id: string;
  propertyId: string;
  scheduledFor: string;
  completedAt?: string;
  status: "scheduled" | "completed" | "needs-follow-up";
  watcher: string;
  summary: string;
  checklistCompletion: number;
  reportId?: string;
};

export type VisitReport = {
  id: string;
  propertyId: string;
  visitId: string;
  title: string;
  date: string;
  summary: string;
  photos: number;
  visibility: PlanId;
};

export type Alert = {
  id: string;
  propertyId: string;
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
  channel: string;
  state: "open" | "watching" | "closed";
  visibility: PlanId;
};

export type Approval = {
  id: string;
  propertyId: string;
  title: string;
  detail: string;
  amount: string;
  requestedOn: string;
  status: "pending-owner" | "approved" | "upgrade-required";
};

export type Subcontractor = {
  id: string;
  name: string;
  trade: string;
  coverage: string;
  responseWindow: string;
  status: string;
  activationPlans: PlanId[];
  services: string[];
};

export type ServiceRequest = {
  id: string;
  propertyId: string;
  title: string;
  serviceId: string;
  subcontractorId?: string;
  estimateLabel: string;
  scheduledFor: string;
  ownerApprovalRequired: boolean;
  status: "queued" | "scheduled" | "in-progress" | "done";
};

export const plans: Plan[] = [
  {
    id: "core",
    name: "Core Watch",
    monthlyPrice: 189,
    visitCadence: "2 visits each month",
    responseWindow: "Same-day owner callback",
    reportTurnaround: "Report delivered after every visit",
    summary: "Entry plan for seasonal homes that need dependable check-ins.",
    ownerFit: "Vacation condos and lower-risk homes",
    includedServiceIds: ["walkthrough", "utilities", "reporting"],
  },
  {
    id: "plus",
    name: "Plus Watch",
    monthlyPrice: 329,
    visitCadence: "Weekly visits",
    responseWindow: "4-hour response window",
    reportTurnaround: "Report plus photos after every visit",
    summary: "Balanced plan with stronger reporting, vendor dispatch, and alerts.",
    ownerFit: "Second homes and higher-use properties",
    includedServiceIds: ["walkthrough", "utilities", "reporting", "storm-check", "vendor-dispatch"],
  },
  {
    id: "signature",
    name: "Signature Estate",
    monthlyPrice: 589,
    visitCadence: "Twice-weekly visits",
    responseWindow: "Priority response and concierge coordination",
    reportTurnaround: "Live portal updates, alerts, and approvals",
    summary: "White-glove operations for estates, luxury homes, and active remodels.",
    ownerFit: "Large homes, estates, and premium clients",
    includedServiceIds: [
      "walkthrough",
      "utilities",
      "reporting",
      "storm-check",
      "vendor-dispatch",
      "concierge",
      "project-check",
    ],
  },
];

export const checklistCategories: ChecklistCategory[] = [
  {
    id: "security",
    title: "Security and arrival",
    summary: "Everything the team checks first on every scheduled visit.",
    items: [
      {
        id: "entry-check",
        title: "Entry points secured",
        detail: "Confirm doors, sliders, gates, and alarm zones are normal.",
        cadence: "Every visit",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "package-sweep",
        title: "Package and flyer sweep",
        detail: "Remove visible deliveries and note anything requiring owner approval.",
        cadence: "Every visit",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "camera-check",
        title: "Camera and smart lock audit",
        detail: "Validate online status and battery health for critical devices.",
        cadence: "Weekly",
        availableIn: ["plus", "signature"],
      },
    ],
  },
  {
    id: "systems",
    title: "Interior and systems",
    summary: "Core home health checks designed to catch issues early.",
    items: [
      {
        id: "hvac-check",
        title: "HVAC, thermostat, and humidity review",
        detail: "Log target temperature and note abnormal readings.",
        cadence: "Every visit",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "leak-check",
        title: "Leak scan for kitchens, baths, and utility rooms",
        detail: "Inspect sinks, supply lines, drains, and visible wall edges.",
        cadence: "Every visit",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "generator-check",
        title: "Generator and backup power spot check",
        detail: "Capture readiness state and escalate maintenance needs.",
        cadence: "Bi-weekly",
        availableIn: ["signature"],
      },
    ],
  },
  {
    id: "grounds",
    title: "Exterior and weather readiness",
    summary: "Perimeter and weather-response work tied into service add-ons.",
    items: [
      {
        id: "storm-scan",
        title: "Roofline, drainage, and storm impact scan",
        detail: "Photograph visible debris, standing water, or fresh damage.",
        cadence: "After weather event",
        availableIn: ["plus", "signature"],
      },
      {
        id: "landscape-check",
        title: "Landscape and irrigation look-over",
        detail: "Flag dead zones, overspray, pooling, and contractor follow-up.",
        cadence: "Weekly",
        availableIn: ["plus", "signature"],
      },
      {
        id: "project-oversight",
        title: "Project progress checkpoint",
        detail: "Verify approved subs showed up and completed scope.",
        cadence: "As needed",
        availableIn: ["signature"],
      },
    ],
  },
  {
    id: "owner-updates",
    title: "Owner communication",
    summary: "What the client sees in the portal when a visit is complete.",
    items: [
      {
        id: "visit-report",
        title: "Structured visit report",
        detail: "Checklist, notes, and timestamped status update published to the portal.",
        cadence: "Every visit",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "photo-report",
        title: "Photo gallery and follow-up actions",
        detail: "Room-by-room images plus open items requiring action.",
        cadence: "Every visit",
        availableIn: ["plus", "signature"],
      },
      {
        id: "approval-flow",
        title: "Owner approval requests for extra work",
        detail: "Approve vendor dispatches and quoted add-ons from the portal.",
        cadence: "As needed",
        availableIn: ["signature"],
      },
    ],
  },
];

export const serviceCatalog: Service[] = [
  {
    id: "walkthrough",
    name: "Scheduled home walkthrough",
    category: "Core service",
    delivery: "In-house team",
    priceLabel: "Included",
    description: "Routine occupied or vacant-home check with checklist completion.",
    includedIn: ["core", "plus", "signature"],
  },
  {
    id: "utilities",
    name: "Utility and leak monitoring",
    category: "Core service",
    delivery: "In-house team",
    priceLabel: "Included",
    description: "Water, power, thermostat, and visible-plumbing review each visit.",
    includedIn: ["core", "plus", "signature"],
  },
  {
    id: "reporting",
    name: "Client portal reporting",
    category: "Client experience",
    delivery: "Portal workflow",
    priceLabel: "Included",
    description: "Owners see report history, notes, and visit completion status.",
    includedIn: ["core", "plus", "signature"],
  },
  {
    id: "storm-check",
    name: "Storm response visit",
    category: "Add-on service",
    delivery: "In-house team",
    priceLabel: "$85 per response",
    description: "Rapid post-weather inspection with damage notes and priority photos.",
    includedIn: ["plus", "signature"],
  },
  {
    id: "vendor-dispatch",
    name: "Vendor dispatch and scope follow-up",
    category: "Marketplace lane",
    delivery: "Subcontractor network",
    priceLabel: "$45 dispatch fee",
    description: "Assign approved subcontractors, track arrival, and log completion.",
    includedIn: ["plus", "signature"],
  },
  {
    id: "concierge",
    name: "Arrival prep and concierge setup",
    category: "Premium add-on",
    delivery: "In-house team",
    priceLabel: "$125 per visit",
    description: "Stock, lights, thermostat, and readiness prep before owner arrival.",
    includedIn: ["signature"],
  },
  {
    id: "project-check",
    name: "Project and remodel oversight",
    category: "Marketplace lane",
    delivery: "Subcontractor network",
    priceLabel: "$160 per checkpoint",
    description: "Coordinate access, verify scope, and publish progress updates.",
    includedIn: ["signature"],
  },
];

export const clients: Client[] = [
  {
    id: "clt-seabrook",
    name: "Daniel and Rachel LeBlanc",
    company: "Seabrook Family Trust",
    email: "owners@seabrooktrust.com",
    phone: "(555) 201-4400",
    status: "active",
    preferredContact: "Portal + SMS",
    notes: "Prefers photo-first updates and same-day notice for any vendor dispatch.",
  },
  {
    id: "clt-marina",
    name: "Marina Vista Holdings",
    email: "ops@marinavista.co",
    phone: "(555) 018-7330",
    status: "seasonal",
    preferredContact: "Email summary",
    notes: "Owns multiple homes and wants budget approvals batched weekly.",
  },
];

export const properties: Property[] = [
  {
    id: "prop-seabrook",
    clientId: "clt-seabrook",
    name: "Seabrook Residence",
    city: "North Bay",
    address: "14 Sandpiper Bluff, North Bay, FL",
    planId: "signature",
    occupancy: "Seasonal family home",
    riskLevel: "elevated",
    accessProfile: "Smart lock + gate code + pool vendor window",
    watchNotes: "Pool equipment and side-yard drainage are priority watch items.",
    nextVisitDate: "Jul 10",
  },
  {
    id: "prop-harbor",
    clientId: "clt-seabrook",
    name: "Harbor Condo",
    city: "South Bay",
    address: "88 Marina Row Unit 5B, South Bay, FL",
    planId: "core",
    occupancy: "Short-stay condo",
    riskLevel: "low",
    accessProfile: "Building concierge + lockbox",
    watchNotes: "Main focus is storm prep and HVAC stability in off-season months.",
    nextVisitDate: "Jul 15",
  },
  {
    id: "prop-cypress",
    clientId: "clt-marina",
    name: "Cypress Estate",
    city: "West Lake",
    address: "220 Cypress Ridge, West Lake, FL",
    planId: "plus",
    occupancy: "Luxury rental hold",
    riskLevel: "moderate",
    accessProfile: "Caretaker entrance + detached guest house",
    watchNotes: "Irrigation, guest house humidity, and landscaping vendor oversight matter most.",
    nextVisitDate: "Jul 11",
  },
];

export const visits: Visit[] = [
  {
    id: "visit-1001",
    propertyId: "prop-seabrook",
    scheduledFor: "Jul 10",
    status: "scheduled",
    watcher: "Maya Rios",
    summary: "Priority visit focused on storm readiness and owner arrival prep.",
    checklistCompletion: 0,
  },
  {
    id: "visit-1000",
    propertyId: "prop-seabrook",
    scheduledFor: "Jul 6",
    completedAt: "Jul 6, 4:20 PM",
    status: "completed",
    watcher: "Maya Rios",
    summary: "All entry points secured, HVAC normal, and drainage spot check logged.",
    checklistCompletion: 92,
    reportId: "report-1000",
  },
  {
    id: "visit-2000",
    propertyId: "prop-harbor",
    scheduledFor: "Jul 3",
    completedAt: "Jul 3, 1:05 PM",
    status: "completed",
    watcher: "Andre Cole",
    summary: "Condo closed cleanly with no exception items and stable humidity.",
    checklistCompletion: 100,
    reportId: "report-2000",
  },
  {
    id: "visit-3000",
    propertyId: "prop-cypress",
    scheduledFor: "Jul 5",
    completedAt: "Jul 5, 5:10 PM",
    status: "needs-follow-up",
    watcher: "Jada Nguyen",
    summary: "Irrigation leak near the guest house flagged for vendor dispatch.",
    checklistCompletion: 84,
    reportId: "report-3000",
  },
];

export const reports: VisitReport[] = [
  {
    id: "report-1000",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Weekly walkthrough completed",
    date: "Jul 6",
    summary: "All entry points secured, HVAC normal, no leak activity found.",
    photos: 8,
    visibility: "core",
  },
  {
    id: "report-1001",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Storm follow-up posted",
    date: "Jul 4",
    summary: "Minor branch debris on pool deck; no roofline damage visible.",
    photos: 14,
    visibility: "plus",
  },
  {
    id: "report-1002",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Vendor checkpoint recorded",
    date: "Jul 2",
    summary: "Irrigation contractor completed valve swap; owner approval closed.",
    photos: 11,
    visibility: "signature",
  },
  {
    id: "report-2000",
    propertyId: "prop-harbor",
    visitId: "visit-2000",
    title: "Bi-monthly condo review",
    date: "Jul 3",
    summary: "Mail handled, thermostat normal, balcony drains clear.",
    photos: 4,
    visibility: "core",
  },
  {
    id: "report-3000",
    propertyId: "prop-cypress",
    visitId: "visit-3000",
    title: "Guest house irrigation alert",
    date: "Jul 5",
    summary: "Overspray and pooling found near the guest house line; dispatch queued.",
    photos: 9,
    visibility: "plus",
  },
];

export const alerts: Alert[] = [
  {
    id: "alert-1",
    propertyId: "prop-seabrook",
    title: "Humidity spike detected",
    detail: "Guest bath humidity moved above target and was rechecked at next visit.",
    severity: "medium",
    channel: "Portal and SMS",
    state: "watching",
    visibility: "plus",
  },
  {
    id: "alert-2",
    propertyId: "prop-seabrook",
    title: "Owner approval required",
    detail: "Landscape drainage quote is waiting on client sign-off.",
    severity: "low",
    channel: "Portal approval card",
    state: "open",
    visibility: "signature",
  },
  {
    id: "alert-3",
    propertyId: "prop-harbor",
    title: "Routine status normal",
    detail: "Last completed visit closed with no exceptions.",
    severity: "low",
    channel: "Portal timeline",
    state: "closed",
    visibility: "core",
  },
  {
    id: "alert-4",
    propertyId: "prop-cypress",
    title: "Irrigation line issue",
    detail: "Follow-up service request created for guest house side-yard leak.",
    severity: "high",
    channel: "Portal, email, and dispatch",
    state: "open",
    visibility: "plus",
  },
];

export const approvals: Approval[] = [
  {
    id: "approval-1",
    propertyId: "prop-seabrook",
    title: "Drainage correction quote",
    detail: "Approve Greenline Outdoor to correct low-point drainage near the side gate.",
    amount: "$420",
    requestedOn: "Jul 7",
    status: "pending-owner",
  },
  {
    id: "approval-2",
    propertyId: "prop-seabrook",
    title: "Arrival prep request",
    detail: "Turn on lights, set temperature, and complete refrigerator stocking before arrival.",
    amount: "$125",
    requestedOn: "Jul 8",
    status: "approved",
  },
  {
    id: "approval-3",
    propertyId: "prop-cypress",
    title: "Expanded guest house leak scope",
    detail: "Approval is required before converting the dispatch into a full repair project.",
    amount: "$680",
    requestedOn: "Jul 6",
    status: "upgrade-required",
  },
];

export const subcontractors: Subcontractor[] = [
  {
    id: "sub-coast-plumbing",
    name: "Coastline Plumbing",
    trade: "Plumbing",
    coverage: "North bay + beach homes",
    responseWindow: "2 hours",
    status: "Preferred and insured",
    activationPlans: ["plus", "signature"],
    services: ["Leak repairs", "Water heater checks", "Fixture swaps"],
  },
  {
    id: "sub-bright-current",
    name: "Bright Current Electric",
    trade: "Electrical",
    coverage: "Full county",
    responseWindow: "Same day",
    status: "Portal-ready dispatch partner",
    activationPlans: ["plus", "signature"],
    services: ["Panel resets", "Lighting issues", "Smart device installs"],
  },
  {
    id: "sub-greenline",
    name: "Greenline Outdoor",
    trade: "Landscape and irrigation",
    coverage: "South bay + estates",
    responseWindow: "24 hours",
    status: "Seasonal contract partner",
    activationPlans: ["plus", "signature"],
    services: ["Irrigation fixes", "Drainage checks", "Storm cleanup"],
  },
  {
    id: "sub-harbor-handy",
    name: "Harbor Handy Services",
    trade: "General maintenance",
    coverage: "Central corridor",
    responseWindow: "4 hours",
    status: "On-demand approved vendor",
    activationPlans: ["core", "plus", "signature"],
    services: ["Minor repairs", "Lock changes", "Arrival prep support"],
  },
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: "request-1",
    propertyId: "prop-seabrook",
    title: "Drainage correction dispatch",
    serviceId: "project-check",
    subcontractorId: "sub-greenline",
    estimateLabel: "$420 estimate",
    scheduledFor: "Jul 12",
    ownerApprovalRequired: true,
    status: "scheduled",
  },
  {
    id: "request-2",
    propertyId: "prop-seabrook",
    title: "Arrival prep service",
    serviceId: "concierge",
    estimateLabel: "$125 service",
    scheduledFor: "Jul 9",
    ownerApprovalRequired: false,
    status: "queued",
  },
  {
    id: "request-3",
    propertyId: "prop-cypress",
    title: "Guest house irrigation repair",
    serviceId: "vendor-dispatch",
    subcontractorId: "sub-greenline",
    estimateLabel: "$680 repair scope",
    scheduledFor: "Jul 9",
    ownerApprovalRequired: true,
    status: "in-progress",
  },
];

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPlan(planId: PlanId) {
  return plans.find((plan) => plan.id === planId);
}

export function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId);
}

export function getProperty(propertyId: string) {
  return properties.find((property) => property.id === propertyId);
}

export function getPropertiesForClient(clientId: string) {
  return properties.filter((property) => property.clientId === clientId);
}

export function getVisitsForProperty(propertyId: string) {
  return visits.filter((visit) => visit.propertyId === propertyId);
}

export function getReportsForProperty(propertyId: string) {
  return reports.filter((report) => report.propertyId === propertyId);
}

export function getAlertsForProperty(propertyId: string) {
  return alerts.filter((alert) => alert.propertyId === propertyId);
}

export function getApprovalsForProperty(propertyId: string) {
  return approvals.filter((approval) => approval.propertyId === propertyId);
}

export function getRequestsForProperty(propertyId: string) {
  return serviceRequests.filter((request) => request.propertyId === propertyId);
}

export function getVisibleChecklist(planId: PlanId) {
  return checklistCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.availableIn.includes(planId)),
    }))
    .filter((category) => category.items.length > 0);
}

export function getIncludedServices(planId: PlanId) {
  return serviceCatalog.filter((service) => service.includedIn.includes(planId));
}

export function getSubcontractor(subcontractorId: string) {
  return subcontractors.find((subcontractor) => subcontractor.id === subcontractorId);
}

export function getPropertiesForPlan(planId: PlanId) {
  return properties.filter((property) => property.planId === planId);
}

export function getOperationsSummary() {
  return {
    clientCount: clients.length,
    propertyCount: properties.length,
    activeMonthlyRevenue: properties.reduce((sum, property) => {
      const plan = getPlan(property.planId);
      return sum + (plan?.monthlyPrice ?? 0);
    }, 0),
    scheduledVisits: visits.filter((visit) => visit.status === "scheduled").length,
    openAlerts: alerts.filter((alert) => alert.state !== "closed").length,
    vendorJobs: serviceRequests.filter((request) => request.subcontractorId).length,
  };
}

export function getClientPlanMix(clientId: string) {
  return getPropertiesForClient(clientId).map((property) => ({
    property,
    plan: getPlan(property.planId),
  }));
}

export function getDispatchBoard() {
  return serviceRequests.map((request) => ({
    request,
    property: getProperty(request.propertyId),
    subcontractor: request.subcontractorId
      ? getSubcontractor(request.subcontractorId)
      : undefined,
    service: serviceCatalog.find((service) => service.id === request.serviceId),
  }));
}
