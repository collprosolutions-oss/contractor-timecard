export type PlanId = "core" | "plus" | "signature";

export type Plan = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  visits: string;
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
  status: "ready" | "scheduled" | "complete";
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
  recommendedFor: PlanId[];
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

export type ReportItem = {
  id: string;
  title: string;
  date: string;
  property: string;
  summary: string;
  photos: number;
  visibility: PlanId;
};

export type AlertItem = {
  id: string;
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
  channel: string;
  visibility: PlanId;
};

export const plans: Plan[] = [
  {
    id: "core",
    name: "Core Watch",
    monthlyPrice: 189,
    visits: "2 visits each month",
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
    visits: "Weekly visits",
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
    visits: "Twice-weekly visits",
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
        status: "complete",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "package-sweep",
        title: "Package and flyer sweep",
        detail: "Remove visible deliveries and note anything requiring owner approval.",
        cadence: "Every visit",
        status: "scheduled",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "camera-check",
        title: "Camera and smart lock audit",
        detail: "Validate online status and battery health for critical devices.",
        cadence: "Weekly",
        status: "ready",
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
        status: "complete",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "leak-check",
        title: "Leak scan for kitchens, baths, and utility rooms",
        detail: "Inspect sinks, supply lines, drains, and visible wall edges.",
        cadence: "Every visit",
        status: "complete",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "generator-check",
        title: "Generator and backup power spot check",
        detail: "Capture readiness state and escalate maintenance needs.",
        cadence: "Bi-weekly",
        status: "scheduled",
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
        status: "ready",
        availableIn: ["plus", "signature"],
      },
      {
        id: "landscape-check",
        title: "Landscape and irrigation look-over",
        detail: "Flag dead zones, overspray, pooling, and contractor follow-up.",
        cadence: "Weekly",
        status: "scheduled",
        availableIn: ["plus", "signature"],
      },
      {
        id: "project-oversight",
        title: "Project progress checkpoint",
        detail: "Verify approved subs showed up and completed scope.",
        cadence: "As needed",
        status: "ready",
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
        status: "complete",
        availableIn: ["core", "plus", "signature"],
      },
      {
        id: "photo-report",
        title: "Photo gallery and follow-up actions",
        detail: "Room-by-room images plus open items requiring action.",
        cadence: "Every visit",
        status: "scheduled",
        availableIn: ["plus", "signature"],
      },
      {
        id: "approval-flow",
        title: "Owner approval requests for extra work",
        detail: "Approve vendor dispatches and quoted add-ons from the portal.",
        cadence: "As needed",
        status: "ready",
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
    recommendedFor: ["core", "plus", "signature"],
  },
  {
    id: "utilities",
    name: "Utility and leak monitoring",
    category: "Core service",
    delivery: "In-house team",
    priceLabel: "Included",
    description: "Water, power, thermostat, and visible-plumbing review each visit.",
    includedIn: ["core", "plus", "signature"],
    recommendedFor: ["core", "plus", "signature"],
  },
  {
    id: "reporting",
    name: "Client portal reporting",
    category: "Client experience",
    delivery: "Portal workflow",
    priceLabel: "Included",
    description: "Owners see report history, notes, and visit completion status.",
    includedIn: ["core", "plus", "signature"],
    recommendedFor: ["core", "plus", "signature"],
  },
  {
    id: "storm-check",
    name: "Storm response visit",
    category: "Add-on service",
    delivery: "In-house team",
    priceLabel: "$85 per response",
    description: "Rapid post-weather inspection with damage notes and priority photos.",
    includedIn: ["plus", "signature"],
    recommendedFor: ["plus", "signature"],
  },
  {
    id: "vendor-dispatch",
    name: "Vendor dispatch and scope follow-up",
    category: "Marketplace lane",
    delivery: "Subcontractor network",
    priceLabel: "$45 dispatch fee",
    description: "Assign approved subcontractors, track arrival, and log completion.",
    includedIn: ["plus", "signature"],
    recommendedFor: ["plus", "signature"],
  },
  {
    id: "concierge",
    name: "Arrival prep and concierge setup",
    category: "Premium add-on",
    delivery: "In-house team",
    priceLabel: "$125 per visit",
    description: "Stock, lights, thermostat, and readiness prep before owner arrival.",
    includedIn: ["signature"],
    recommendedFor: ["signature"],
  },
  {
    id: "project-check",
    name: "Project and remodel oversight",
    category: "Marketplace lane",
    delivery: "Subcontractor network",
    priceLabel: "$160 per checkpoint",
    description: "Coordinate access, verify scope, and publish progress updates.",
    includedIn: ["signature"],
    recommendedFor: ["signature"],
  },
];

export const subcontractors: Subcontractor[] = [
  {
    id: "coast-plumbing",
    name: "Coastline Plumbing",
    trade: "Plumbing",
    coverage: "North bay + beach homes",
    responseWindow: "2 hours",
    status: "Preferred and insured",
    activationPlans: ["plus", "signature"],
    services: ["Leak repairs", "Water heater checks", "Fixture swaps"],
  },
  {
    id: "bright-current",
    name: "Bright Current Electric",
    trade: "Electrical",
    coverage: "Full county",
    responseWindow: "Same day",
    status: "Portal-ready dispatch partner",
    activationPlans: ["plus", "signature"],
    services: ["Panel resets", "Lighting issues", "Smart device installs"],
  },
  {
    id: "greenline-outdoor",
    name: "Greenline Outdoor",
    trade: "Landscape and irrigation",
    coverage: "South bay + estates",
    responseWindow: "24 hours",
    status: "Seasonal contract partner",
    activationPlans: ["plus", "signature"],
    services: ["Irrigation fixes", "Drainage checks", "Storm cleanup"],
  },
  {
    id: "harbor-handy",
    name: "Harbor Handy Services",
    trade: "General maintenance",
    coverage: "Central corridor",
    responseWindow: "4 hours",
    status: "On-demand approved vendor",
    activationPlans: ["core", "plus", "signature"],
    services: ["Minor repairs", "Lock changes", "Arrival prep support"],
  },
];

export const reportTimeline: ReportItem[] = [
  {
    id: "rpt-101",
    title: "Weekly walkthrough completed",
    date: "Jul 6",
    property: "Seabrook Residence",
    summary: "All entry points secured, HVAC normal, no leak activity found.",
    photos: 8,
    visibility: "core",
  },
  {
    id: "rpt-102",
    title: "Storm follow-up posted",
    date: "Jul 4",
    property: "Seabrook Residence",
    summary: "Minor branch debris on pool deck; no roofline damage visible.",
    photos: 14,
    visibility: "plus",
  },
  {
    id: "rpt-103",
    title: "Vendor checkpoint recorded",
    date: "Jul 2",
    property: "Seabrook Residence",
    summary: "Irrigation contractor completed valve swap; owner approval closed.",
    photos: 11,
    visibility: "signature",
  },
];

export const alerts: AlertItem[] = [
  {
    id: "alt-1",
    title: "Humidity spike detected",
    detail: "Guest bath humidity moved above target and was rechecked at next visit.",
    severity: "medium",
    channel: "Portal and SMS",
    visibility: "plus",
  },
  {
    id: "alt-2",
    title: "Owner approval required",
    detail: "Landscape drainage quote is waiting on client sign-off.",
    severity: "low",
    channel: "Portal approval card",
    visibility: "signature",
  },
  {
    id: "alt-3",
    title: "Routine status normal",
    detail: "Last completed visit closed with no exceptions.",
    severity: "low",
    channel: "Portal timeline",
    visibility: "core",
  },
];

export const roadmapItems = [
  "Property onboarding and room-by-room checklist templates",
  "Owner logins with saved homes and billing profiles",
  "Photo galleries, receipts, and downloadable PDF visit reports",
  "Automated billing for recurring plans and approved add-ons",
  "Vendor scorecards, SLAs, and assignment history",
];
