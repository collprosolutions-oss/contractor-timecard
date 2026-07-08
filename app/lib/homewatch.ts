export const brand = {
  name: "HQWatchfolio",
  tagline: "The Complete Home Watch Management Platform",
  primaryDomain: "hqwatchfolio.com",
  secondaryDomain: "hqwatchfolio.net",
};

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

export type PricingTier = {
  name: string;
  priceLabel: string;
  summary: string;
  cta: string;
  features: string[];
};

export type MarketingFeature = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  person: string;
  role: string;
};

export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type BillingProfile = {
  planName: string;
  billingEmail: string;
  autopay: string;
  stripeStatus: string;
  quickbooksExport: string;
};

export type Client = {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  status: "active" | "seasonal" | "pending";
  preferredContact: string;
  emergencyContacts: EmergencyContact[];
  billing: BillingProfile;
  documents: string[];
  agreements: string[];
  notes: string;
};

export type Property = {
  id: string;
  clientId: string;
  name: string;
  city: string;
  address: string;
  gps: string;
  planId: PlanId;
  occupancy: string;
  riskLevel: "low" | "moderate" | "elevated";
  gateCode: string;
  alarmCode: string;
  utilityInfo: string[];
  preferredVendors: string[];
  photoCount: number;
  notes: string[];
  insurance: string;
  hoa: string;
  keyStorage: string;
  smartLockCode: string;
  nextVisitDate: string;
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

export type Visit = {
  id: string;
  propertyId: string;
  scheduledFor: string;
  recurrence: "Weekly" | "Biweekly" | "Monthly" | "Custom";
  checkIn: string;
  checkOut: string;
  gpsVerified: boolean;
  status: "scheduled" | "completed" | "needs-follow-up";
  watcher: string;
  summary: string;
  arrivalPhotos: number;
  departurePhotos: number;
  voiceNotes: number;
  digitalSignature: string;
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
  aiGenerated: boolean;
  pdfReady: boolean;
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

export type WeatherAlert = {
  title: string;
  detail: string;
  severity: "watch" | "warning";
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

export type MaintenanceRequest = {
  id: string;
  propertyId: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "open" | "scheduled" | "resolved";
};

export type WorkOrder = {
  id: string;
  propertyId: string;
  title: string;
  assignedTo: string;
  estimate: string;
  status: "draft" | "assigned" | "in-progress" | "complete";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  gpsTracking: string;
  shift: string;
  performance: string;
};

export type ActivityItem = {
  title: string;
  detail: string;
  timestamp: string;
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

export const marketingFeatures: MarketingFeature[] = [
  { title: "GPS Verified Visits", description: "Verify every check-in and check-out with location confidence built for service teams." },
  { title: "Property Portfolio", description: "Manage every watched home, condo, dock, estate, and vacation property in one place." },
  { title: "Client Management", description: "Track homeowners, billing contacts, emergency contacts, documents, and agreements." },
  { title: "Inspection Checklists", description: "Run fully customizable visit templates for exterior, interior, pool, HVAC, dock, and storm checks." },
  { title: "Photo & Video Reports", description: "Attach visual proof to every visit with room-by-room reporting and media compression support." },
  { title: "AI Report Generation", description: "Turn inspection results, notes, and media into polished client-ready summaries and PDFs." },
  { title: "Hurricane Preparation", description: "Prioritize properties, storm prep checklists, post-storm inspections, and insurance documentation." },
  { title: "Maintenance Tracking", description: "Convert issues into maintenance requests, dispatch vendors, and follow repair history." },
  { title: "Team Scheduling", description: "Coordinate staff schedules, recurring visit routes, and property priority windows." },
  { title: "Work Orders", description: "Assign technicians, capture completion, and push finished work back into the customer workflow." },
  { title: "Estimates", description: "Build optional scope approvals and estimate review directly from inspections." },
  { title: "Invoicing", description: "Support monthly subscriptions, online payments, recurring billing, and QuickBooks export." },
  { title: "Customer Portal", description: "Give clients access to reports, invoices, maintenance, approvals, and visit history." },
  { title: "Mobile App", description: "Support iPhone and Android workflows with camera capture, signatures, and field speed." },
  { title: "Office Dashboard", description: "See visits, alerts, team load, revenue, work orders, and service health from one screen." },
  { title: "Offline Mode", description: "Keep inspections moving in low-signal areas and sync updates once service returns." },
  { title: "Push Notifications", description: "Send email, SMS, push, and in-app notices to staff and customers." },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    priceLabel: "$149/mo",
    summary: "For owner-operators building a modern Home Watch workflow.",
    cta: "Start Free Trial",
    features: [
      "Client and property management",
      "Recurring visits and basic checklists",
      "Photo reports and customer portal",
      "Mobile-ready field workflows",
    ],
  },
  {
    name: "Professional",
    priceLabel: "$349/mo",
    summary: "For growing companies that need scheduling, work orders, and branded reporting.",
    cta: "Book Demo",
    features: [
      "Everything in Starter",
      "AI report generation and PDF delivery",
      "Maintenance tracking and work orders",
      "GPS verified visits and team scheduling",
    ],
  },
  {
    name: "Enterprise",
    priceLabel: "Custom",
    summary: "For larger service teams that need hurricane workflows, advanced permissions, and deep integrations.",
    cta: "Talk to Sales",
    features: [
      "Everything in Professional",
      "Advanced reporting and payroll export",
      "Storm preparation and emergency automation",
      "Custom onboarding, integrations, and support",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder testimonial for future customer success stories from Home Watch companies.",
    person: "Coming Soon",
    role: "Founding customer spotlight",
  },
  {
    quote: "Placeholder testimonial for companies using HQWatchfolio to scale premium property care.",
    person: "Coming Soon",
    role: "Operations leader spotlight",
  },
];

export const plans: Plan[] = [
  {
    id: "core",
    name: "Starter",
    monthlyPrice: 149,
    visitCadence: "Biweekly visits",
    responseWindow: "Same-day support response",
    reportTurnaround: "Photo report after every visit",
    summary: "Ideal for lean Home Watch teams starting with polished operations.",
    ownerFit: "Single operators and boutique service areas",
    includedServiceIds: ["walkthrough", "utilities", "reporting", "notifications"],
  },
  {
    id: "plus",
    name: "Professional",
    monthlyPrice: 349,
    visitCadence: "Weekly visits",
    responseWindow: "4-hour dispatch response",
    reportTurnaround: "AI-assisted report and PDF delivery",
    summary: "Built for scaling teams that need scheduling, dispatch, and maintenance flow.",
    ownerFit: "Multi-staff companies and larger client portfolios",
    includedServiceIds: [
      "walkthrough",
      "utilities",
      "reporting",
      "storm-check",
      "vendor-dispatch",
      "notifications",
      "ai-reporting",
    ],
  },
  {
    id: "signature",
    name: "Enterprise",
    monthlyPrice: 749,
    visitCadence: "Weekly or custom enterprise cadence",
    responseWindow: "Priority support and emergency coordination",
    reportTurnaround: "Live portal updates, PDF delivery, and storm documentation",
    summary: "For premium Home Watch companies managing complex estates and hurricane response.",
    ownerFit: "Enterprise operators and high-value property portfolios",
    includedServiceIds: [
      "walkthrough",
      "utilities",
      "reporting",
      "storm-check",
      "vendor-dispatch",
      "notifications",
      "ai-reporting",
      "hurricane-prep",
      "work-orders",
    ],
  },
];

export const checklistSupport = ["Pass", "Fail", "N/A", "Photos", "Comments", "Priority"];

export const checklistCategories: ChecklistCategory[] = [
  {
    id: "exterior",
    title: "Exterior",
    summary: "Street-facing, landscape, roofline, and perimeter observations.",
    items: [
      { id: "roof", title: "Roof and gutters", detail: "Inspect for storm damage, debris, or leaks.", cadence: "Every visit", availableIn: ["core", "plus", "signature"] },
      { id: "landscape", title: "Landscape and irrigation", detail: "Check irrigation performance, drainage, and dead zones.", cadence: "Weekly", availableIn: ["core", "plus", "signature"] },
      { id: "dock", title: "Dock and boat area", detail: "Review dock safety, lines, lift status, and visible damage.", cadence: "Custom", availableIn: ["plus", "signature"] },
    ],
  },
  {
    id: "interior",
    title: "Interior",
    summary: "HVAC, doors, windows, plumbing, and core interior health.",
    items: [
      { id: "hvac", title: "HVAC and humidity", detail: "Validate settings, supply temperature, and humidity targets.", cadence: "Every visit", availableIn: ["core", "plus", "signature"] },
      { id: "plumbing", title: "Plumbing and leak scan", detail: "Inspect bathrooms, kitchen, laundry, and utility lines.", cadence: "Every visit", availableIn: ["core", "plus", "signature"] },
      { id: "security", title: "Doors, windows, and alarm", detail: "Confirm all openings and security systems are normal.", cadence: "Every visit", availableIn: ["core", "plus", "signature"] },
    ],
  },
  {
    id: "assets",
    title: "Assets and specialty systems",
    summary: "Generators, pools, electrical, and storm-sensitive equipment.",
    items: [
      { id: "pool", title: "Pool and spa", detail: "Check equipment state, water level, and visual clarity.", cadence: "Weekly", availableIn: ["plus", "signature"] },
      { id: "generator", title: "Generator", detail: "Confirm readiness lights, fuel, and service notes.", cadence: "Biweekly", availableIn: ["signature"] },
      { id: "mail", title: "Mail, packages, and vehicles", detail: "Clear mail, note deliveries, and check idle vehicle condition.", cadence: "Every visit", availableIn: ["core", "plus", "signature"] },
    ],
  },
  {
    id: "storm",
    title: "Storm and hurricane",
    summary: "Preparedness and post-event recovery built into the platform.",
    items: [
      { id: "prep", title: "Storm prep checklist", detail: "Confirm shutters, outdoor furniture, loose items, and owner requests.", cadence: "Storm prep", availableIn: ["plus", "signature"] },
      { id: "damage", title: "Post-storm damage documentation", detail: "Capture photo evidence for insurance and emergency follow-up.", cadence: "Post-storm", availableIn: ["signature"] },
      { id: "priority", title: "Priority property response", detail: "Escalate high-risk homes to the top of the emergency queue.", cadence: "Emergency", availableIn: ["signature"] },
    ],
  },
];

export const serviceCatalog: Service[] = [
  { id: "walkthrough", name: "Professional Home Watch visit", category: "Core", delivery: "Field team", priceLabel: "Included", description: "Recurring property inspection with checklist completion and media capture.", includedIn: ["core", "plus", "signature"] },
  { id: "utilities", name: "Utility and system monitoring", category: "Core", delivery: "Field team", priceLabel: "Included", description: "Track HVAC, plumbing, electrical indicators, and system stability.", includedIn: ["core", "plus", "signature"] },
  { id: "reporting", name: "Customer portal reporting", category: "Portal", delivery: "HQWatchfolio", priceLabel: "Included", description: "Publish branded client updates, photos, and visit history in one portal.", includedIn: ["core", "plus", "signature"] },
  { id: "notifications", name: "SMS, push, and in-app notifications", category: "Communication", delivery: "HQWatchfolio", priceLabel: "Included", description: "Keep owners and staff informed about visits, issues, and approvals.", includedIn: ["core", "plus", "signature"] },
  { id: "ai-reporting", name: "AI report generation", category: "AI", delivery: "HQWatchfolio", priceLabel: "Included", description: "Convert inspection notes, comments, and media into polished report drafts and PDFs.", includedIn: ["plus", "signature"] },
  { id: "storm-check", name: "Storm inspection workflow", category: "Hurricane", delivery: "Field team", priceLabel: "$95 per event", description: "Dispatch pre-storm, post-storm, and damage inspection jobs quickly.", includedIn: ["plus", "signature"] },
  { id: "vendor-dispatch", name: "Maintenance dispatch", category: "Work orders", delivery: "Vendor network", priceLabel: "$45 dispatch fee", description: "Create work from inspections, assign vendors, and update customers.", includedIn: ["plus", "signature"] },
  { id: "hurricane-prep", name: "Hurricane preparation module", category: "Hurricane", delivery: "HQWatchfolio", priceLabel: "Included", description: "Run priority property response, emergency notifications, and damage tracking.", includedIn: ["signature"] },
  { id: "work-orders", name: "Work order and estimate pipeline", category: "Operations", delivery: "Office dashboard", priceLabel: "Included", description: "Track maintenance approvals, estimates, and completion status end to end.", includedIn: ["signature"] },
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
    emergencyContacts: [
      { name: "Rachel LeBlanc", relationship: "Primary decision maker", phone: "(555) 201-4401" },
      { name: "Mike Turner", relationship: "Local emergency contact", phone: "(555) 804-7741" },
    ],
    billing: {
      planName: "Enterprise",
      billingEmail: "billing@seabrooktrust.com",
      autopay: "Enabled",
      stripeStatus: "Healthy customer profile",
      quickbooksExport: "Weekly sync",
    },
    documents: ["Signed service agreement", "Insurance certificate", "Storm protocol sheet"],
    agreements: ["Home Watch master agreement", "Emergency dispatch approval", "Smart lock consent"],
    notes: "Prefers photo-first updates, priority storm contact, and same-day approval requests.",
  },
  {
    id: "clt-marina",
    name: "Marina Vista Holdings",
    email: "ops@marinavista.co",
    phone: "(555) 018-7330",
    status: "seasonal",
    preferredContact: "Email summary",
    emergencyContacts: [
      { name: "Adrian Cole", relationship: "Asset manager", phone: "(555) 018-7332" },
    ],
    billing: {
      planName: "Professional",
      billingEmail: "ap@marinavista.co",
      autopay: "Pending card refresh",
      stripeStatus: "Needs update",
      quickbooksExport: "Month-end export",
    },
    documents: ["Condo HOA rules", "Rental turnover checklist"],
    agreements: ["Professional services agreement"],
    notes: "Owns multiple homes and prefers grouped maintenance approvals once each week.",
  },
];

export const properties: Property[] = [
  {
    id: "prop-seabrook",
    clientId: "clt-seabrook",
    name: "Seabrook Residence",
    city: "North Bay",
    address: "14 Sandpiper Bluff, North Bay, FL",
    gps: "29.1523, -81.0418",
    planId: "signature",
    occupancy: "Seasonal family estate",
    riskLevel: "elevated",
    gateCode: "Gate 4401",
    alarmCode: "Panel zone profile in portal",
    utilityInfo: ["FPL #190332", "City Water acct #774120", "Pool controller online"],
    preferredVendors: ["Greenline Outdoor", "Coastline Plumbing", "Bright Current Electric"],
    photoCount: 186,
    notes: [
      "Priority property during storms due to waterfront exposure.",
      "Watch pool equipment and side-yard drainage closely in wet season.",
      "Family arrival prep typically requested before holiday weekends.",
    ],
    insurance: "Gulf Shore Mutual policy #GS-44018",
    hoa: "Seabrook Preserve HOA",
    keyStorage: "Locked cabinet slot A-4",
    smartLockCode: "Owner-managed August access profile",
    nextVisitDate: "Jul 10",
  },
  {
    id: "prop-harbor",
    clientId: "clt-seabrook",
    name: "Harbor Condo",
    city: "South Bay",
    address: "88 Marina Row Unit 5B, South Bay, FL",
    gps: "29.0912, -80.9875",
    planId: "core",
    occupancy: "Vacation condo",
    riskLevel: "low",
    gateCode: "Lobby concierge release",
    alarmCode: "No alarm panel on site",
    utilityInfo: ["HOA-managed water", "FPL condo meter", "Xfinity Wi-Fi modem"],
    preferredVendors: ["Harbor Handy Services"],
    photoCount: 42,
    notes: [
      "Main focus is storm prep and HVAC stability in off-season months.",
      "Building manager prefers all maintenance visits scheduled before 2 PM.",
    ],
    insurance: "Coastal Condo Package #CND-55290",
    hoa: "Marina Row Association",
    keyStorage: "Building lockbox 5B",
    smartLockCode: "Condo Yale entry profile",
    nextVisitDate: "Jul 15",
  },
  {
    id: "prop-cypress",
    clientId: "clt-marina",
    name: "Cypress Estate",
    city: "West Lake",
    address: "220 Cypress Ridge, West Lake, FL",
    gps: "28.9810, -81.1214",
    planId: "plus",
    occupancy: "Luxury rental hold",
    riskLevel: "moderate",
    gateCode: "North service gate 7382",
    alarmCode: "Guest house keypad profile",
    utilityInfo: ["Well + treatment system", "Propane generator", "Irrigation control panel"],
    preferredVendors: ["Greenline Outdoor", "Harbor Handy Services"],
    photoCount: 121,
    notes: [
      "Irrigation, guest house humidity, and landscaping oversight matter most.",
      "Boat dock is inspected during custom monthly specialty check.",
    ],
    insurance: "Estate Portfolio #EST-88301",
    hoa: "Private road association",
    keyStorage: "Caretaker closet lockbox",
    smartLockCode: "Guest wing Schlage profile",
    nextVisitDate: "Jul 11",
  },
];

export const visits: Visit[] = [
  {
    id: "visit-1001",
    propertyId: "prop-seabrook",
    scheduledFor: "Jul 10",
    recurrence: "Weekly",
    checkIn: "10:00 AM",
    checkOut: "11:10 AM",
    gpsVerified: true,
    status: "scheduled",
    watcher: "Maya Rios",
    summary: "Priority visit focused on storm readiness, maintenance follow-up, and arrival prep review.",
    arrivalPhotos: 0,
    departurePhotos: 0,
    voiceNotes: 1,
    digitalSignature: "Pending client report release",
    checklistCompletion: 0,
  },
  {
    id: "visit-1000",
    propertyId: "prop-seabrook",
    scheduledFor: "Jul 6",
    recurrence: "Weekly",
    checkIn: "10:05 AM",
    checkOut: "11:02 AM",
    gpsVerified: true,
    status: "completed",
    watcher: "Maya Rios",
    summary: "Exterior secure, HVAC stable, and storm prep recommendations drafted for owner review.",
    arrivalPhotos: 5,
    departurePhotos: 6,
    voiceNotes: 2,
    digitalSignature: "Signed by Maya Rios",
    checklistCompletion: 96,
    reportId: "report-1000",
  },
  {
    id: "visit-2000",
    propertyId: "prop-harbor",
    scheduledFor: "Jul 3",
    recurrence: "Biweekly",
    checkIn: "1:00 PM",
    checkOut: "1:45 PM",
    gpsVerified: true,
    status: "completed",
    watcher: "Andre Cole",
    summary: "Condo closed cleanly with no exception items and updated photo set for the owner portal.",
    arrivalPhotos: 3,
    departurePhotos: 3,
    voiceNotes: 0,
    digitalSignature: "Signed by Andre Cole",
    checklistCompletion: 100,
    reportId: "report-2000",
  },
  {
    id: "visit-3000",
    propertyId: "prop-cypress",
    scheduledFor: "Jul 5",
    recurrence: "Weekly",
    checkIn: "4:10 PM",
    checkOut: "5:24 PM",
    gpsVerified: true,
    status: "needs-follow-up",
    watcher: "Jada Nguyen",
    summary: "Irrigation leak near the guest house triggered a maintenance request and follow-up estimate.",
    arrivalPhotos: 4,
    departurePhotos: 5,
    voiceNotes: 1,
    digitalSignature: "Signed by Jada Nguyen",
    checklistCompletion: 84,
    reportId: "report-3000",
  },
];

export const reports: VisitReport[] = [
  {
    id: "report-1000",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Weekly Home Watch report",
    date: "Jul 6",
    summary: "All entry points secured, HVAC stable, dock checked, and storm prep recommendations documented.",
    photos: 14,
    visibility: "core",
    aiGenerated: true,
    pdfReady: true,
  },
  {
    id: "report-1001",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Storm preparation advisory",
    date: "Jul 4",
    summary: "Outdoor furnishings, drains, and priority storm actions captured for fast owner approval.",
    photos: 9,
    visibility: "plus",
    aiGenerated: true,
    pdfReady: true,
  },
  {
    id: "report-1002",
    propertyId: "prop-seabrook",
    visitId: "visit-1000",
    title: "Vendor and maintenance follow-up",
    date: "Jul 2",
    summary: "Drainage correction scope, irrigation follow-up, and concierge prep items summarized for the client.",
    photos: 11,
    visibility: "signature",
    aiGenerated: true,
    pdfReady: true,
  },
  {
    id: "report-2000",
    propertyId: "prop-harbor",
    visitId: "visit-2000",
    title: "Condo watch summary",
    date: "Jul 3",
    summary: "Mail handled, thermostat normal, balcony drains clear, and no maintenance flags.",
    photos: 4,
    visibility: "core",
    aiGenerated: true,
    pdfReady: true,
  },
  {
    id: "report-3000",
    propertyId: "prop-cypress",
    visitId: "visit-3000",
    title: "Guest house irrigation alert",
    date: "Jul 5",
    summary: "Pooling and overspray found near the guest house line; a follow-up work order was created.",
    photos: 9,
    visibility: "plus",
    aiGenerated: true,
    pdfReady: true,
  },
];

export const alerts: Alert[] = [
  {
    id: "alert-1",
    propertyId: "prop-seabrook",
    title: "Humidity spike detected",
    detail: "Guest bath humidity moved above target and was rechecked at the next visit.",
    severity: "medium",
    channel: "Portal, SMS, and in-app",
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

export const weatherAlerts: WeatherAlert[] = [
  {
    title: "Coastal storm watch",
    detail: "Wind and heavy rain expected within 36 hours for North Bay and South Bay properties.",
    severity: "watch",
  },
  {
    title: "Hurricane preparation advisory",
    detail: "Enterprise properties should begin storm prep checklist review and owner confirmations.",
    severity: "warning",
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
    title: "Expanded leak repair scope",
    detail: "Approval is required before converting the dispatch into a full guest house repair project.",
    amount: "$680",
    requestedOn: "Jul 6",
    status: "upgrade-required",
  },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "maint-1",
    propertyId: "prop-seabrook",
    title: "Drainage correction at side gate",
    category: "Exterior drainage",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "maint-2",
    propertyId: "prop-cypress",
    title: "Guest house irrigation leak",
    category: "Irrigation",
    priority: "high",
    status: "open",
  },
  {
    id: "maint-3",
    propertyId: "prop-harbor",
    title: "Balcony slider tune-up",
    category: "Doors and windows",
    priority: "low",
    status: "resolved",
  },
];

export const workOrders: WorkOrder[] = [
  {
    id: "wo-1",
    propertyId: "prop-seabrook",
    title: "Drainage correction work order",
    assignedTo: "Greenline Outdoor",
    estimate: "$420",
    status: "assigned",
  },
  {
    id: "wo-2",
    propertyId: "prop-cypress",
    title: "Guest house irrigation repair",
    assignedTo: "Greenline Outdoor",
    estimate: "$680",
    status: "in-progress",
  },
  {
    id: "wo-3",
    propertyId: "prop-seabrook",
    title: "Arrival prep concierge setup",
    assignedTo: "Internal team",
    estimate: "$125",
    status: "draft",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Maya Rios",
    role: "Lead Home Watch Inspector",
    permissions: ["Visits", "AI reports", "Storm checks"],
    gpsTracking: "Enabled",
    shift: "North Bay route",
    performance: "98% on-time completion",
  },
  {
    id: "team-2",
    name: "Andre Cole",
    role: "Client Success + Field Support",
    permissions: ["Portal updates", "Photos", "Maintenance dispatch"],
    gpsTracking: "Enabled",
    shift: "South Bay route",
    performance: "95% client satisfaction",
  },
  {
    id: "team-3",
    name: "Jada Nguyen",
    role: "Operations Coordinator",
    permissions: ["Scheduling", "Work orders", "Billing export"],
    gpsTracking: "Office only",
    shift: "Office dashboard",
    performance: "100% work order follow-up within SLA",
  },
];

export const activities: ActivityItem[] = [
  { title: "AI report generated", detail: "Weekly Home Watch report published for Seabrook Residence.", timestamp: "10 minutes ago" },
  { title: "Work order assigned", detail: "Guest house irrigation repair routed to Greenline Outdoor.", timestamp: "25 minutes ago" },
  { title: "Storm prep alert sent", detail: "Priority property notifications sent to all Enterprise accounts.", timestamp: "1 hour ago" },
  { title: "Invoice synced", detail: "Professional plan renewal exported to QuickBooks.", timestamp: "2 hours ago" },
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
    services: ["Panel resets", "Lighting issues", "Smart lock installs"],
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
    serviceId: "work-orders",
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
    serviceId: "ai-reporting",
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

export const portalInbox = [
  "View reports",
  "View photos",
  "View invoices",
  "Approve work",
  "Request maintenance",
  "Message company",
  "See visit history",
  "Receive notifications",
];

export const reportModules = [
  "Revenue",
  "Visits",
  "Employee Performance",
  "Properties",
  "Clients",
  "Maintenance",
  "GPS Logs",
  "Photo History",
  "Inspection Trends",
];

export const mobileCapabilities = [
  "Android and iPhone ready",
  "Offline inspection support",
  "GPS capture and verification",
  "Camera integration and compression",
  "Push notifications",
  "Digital signatures",
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

export function getMaintenanceForProperty(propertyId: string) {
  return maintenanceRequests.filter((request) => request.propertyId === propertyId);
}

export function getWorkOrdersForProperty(propertyId: string) {
  return workOrders.filter((workOrder) => workOrder.propertyId === propertyId);
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

export function getOperationsSummary() {
  return {
    clientCount: clients.length,
    propertyCount: properties.length,
    activeMonthlyRevenue: properties.reduce((sum, property) => {
      const plan = getPlan(property.planId);
      return sum + (plan?.monthlyPrice ?? 0);
    }, 0),
    todaysVisits: visits.filter((visit) => visit.status === "scheduled").length,
    completedVisits: visits.filter((visit) => visit.status === "completed").length,
    weatherAlerts: weatherAlerts.length,
    hurricaneAlerts: weatherAlerts.filter((alert) => alert.severity === "warning").length,
    openMaintenanceRequests: maintenanceRequests.filter((request) => request.status !== "resolved").length,
    upcomingSchedule: visits.length,
    recentActivity: activities.length,
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
