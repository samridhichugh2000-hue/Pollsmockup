// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export type PollStatus =
  | "Draft" | "Acknowledged" | "Awaiting Approval"
  | "Active" | "Closed" | "Pending Closure";

export type PollSource = "Mailbox" | "Form";

export type FeedbackType = "Actionable" | "Suggestion" | "Query";

export type FeedbackStatus =
  | "Open" | "In Progress" | "Query Replied"
  | "No Action Required" | "Closed";

export type ClosureStatus = "Open" | "In Progress" | "Closed" | "No Action";

export type CadenceType = "Monthly" | "Quarterly" | "Bi-Annual" | "Annual";
export type CadenceStatus = "Scheduled" | "Released" | "Overdue" | "Draft";

export interface PollRequest {
  id: string;
  title: string;
  requester: string;
  department: string;
  date: string;
  status: PollStatus;
  source: PollSource;
}

export interface FeedbackItem {
  id: string;
  pollId: string;
  pollTitle: string;
  type: FeedbackType;
  summary: string;
  detail: string;
  submittedBy: string;
  department: string;
  owner: string;
  status: FeedbackStatus;
  dueDate?: string;
  overdue?: boolean;
  submittedDate: string;
}

export interface ClosureItem {
  pollId: string;
  feedbackId: string;
  summary: string;
  status: ClosureStatus;
  emailSent: boolean;
  happyWithSolution: "Yes" | "No" | "Pending";
}

export interface Employee {
  id: string;
  name: string;
  initials: string;
  department: string;
  participatedIn: string[]; // poll IDs
}

export interface CadencePoll {
  id: string;
  title: string;
  cadence: CadenceType;
  nextRelease: string;
  lastReleased?: string;
  status: CadenceStatus;
  owner: string;
  autoApprove: boolean;
  audience: number;
}

// ─────────────────────────────────────────────
// KPI Data
// ─────────────────────────────────────────────
export const kpiData = [
  { label: "Total Polls",                    value: 32, delta: "↑4 new",    color: "purple", icon: "pie-chart" },
  { label: "Total Cadence Polls",            value: 12, delta: "Recurring", color: "violet", icon: "repeat"    },
  { label: "Total Feedbacks Received",       value: 87, delta: "+23 this week", color: "emerald", icon: "inbox" },
  { label: "Policy Announced After Feedback",  value: 9,  delta: "This quarter", color: "blue",   icon: "megaphone" },
  { label: "Non RMS Improvement After Feedback",value: 14, delta: "Logged",       color: "orange", icon: "trending"  },
  { label: "RMS Improvement After Feedback",    value: 6,  delta: "Tracked",      color: "teal",   icon: "check"     },
];

export const totalPollsBreakdown = [
  { label: "Not Sent for Approval",        value: 6,  color: "cyan"   },
  { label: "Approval Pending",             value: 5,  color: "orange" },
  { label: "Active Polls",                 value: 8,  color: "blue"   },
  { label: "Polls Closed",                 value: 14, color: "green"  },
  { label: "Poll Result Not Sent to Sir",  value: 4,  color: "amber"  },
  { label: "Poll Result Not Sent to Voter",value: 3,  color: "red"    },
];

// ─────────────────────────────────────────────
// Poll Requests
// ─────────────────────────────────────────────
export const FORM_LINK = "https://pollshq.internal/submit-request?token=PRF-2026-ABCD";

export const pollRequests: PollRequest[] = [
  { id: "POLL-2026-001", title: "Employee Wellness Survey",          requester: "Priya Sharma",  department: "HR",      date: "03 Jan 26", status: "Closed",           source: "Form"    },
  { id: "POLL-2026-002", title: "Work From Home Policy Feedback",    requester: "Amit Verma",    department: "Admin",   date: "10 Jan 26", status: "Active",           source: "Mailbox" },
  { id: "POLL-2026-003", title: "Canteen Menu Review",               requester: "Neha Joshi",    department: "Ops",     date: "18 Jan 26", status: "Awaiting Approval",source: "Form"    },
  { id: "POLL-2026-004", title: "Performance Review Process",        requester: "Rajiv Kumar",   department: "L&D",     date: "25 Feb 26", status: "Pending Closure",  source: "Mailbox" },
  { id: "POLL-2026-005", title: "IT Infrastructure Satisfaction",    requester: "Sunita Rao",    department: "IT",      date: "02 Mar 26", status: "Active",           source: "Form"    },
  { id: "POLL-2026-006", title: "Safety Protocol Awareness",         requester: "Deepak Singh",  department: "Safety",  date: "15 Mar 26", status: "Draft",            source: "Mailbox" },
  { id: "POLL-2026-007", title: "Training Satisfaction Survey",      requester: "Meera Patel",   department: "HR",      date: "12 May 26", status: "Active",           source: "Form"    },
  { id: "POLL-2026-008", title: "Annual Benefits Review",            requester: "Vikram Das",    department: "HR",      date: "01 Jun 26", status: "Acknowledged",     source: "Mailbox" },
  { id: "POLL-2026-009", title: "Office Space Utilisation",          requester: "Ananya Bose",   department: "Admin",   date: "05 Jun 26", status: "Awaiting Approval",source: "Form"    },
  { id: "POLL-2026-010", title: "Learning Platform Feedback",        requester: "Kiran Mehta",   department: "L&D",     date: "10 Jun 26", status: "Awaiting Approval",source: "Mailbox" },
];

// ─────────────────────────────────────────────
// Feedback (rich mock data)
// ─────────────────────────────────────────────
export const feedbackItems: FeedbackItem[] = [
  {
    id: "FB-001", pollId: "POLL-2026-001", pollTitle: "Employee Wellness Survey",
    type: "Actionable",
    summary: "Improve mental health support resources",
    detail: "Employees lack access to counselling and stress management tools. Suggest partnering with a wellness platform.",
    submittedBy: "Anonymous", department: "HR",       owner: "Priya Sharma",
    status: "In Progress",  dueDate: "30 Jun 26",  submittedDate: "15 Jan 26",
  },
  {
    id: "FB-002", pollId: "POLL-2026-001", pollTitle: "Employee Wellness Survey",
    type: "Suggestion",
    summary: "Add flexible break timings",
    detail: "Fixed lunch timings cause congestion. A staggered break policy would help.",
    submittedBy: "Rohit Kumar",  department: "Ops",  owner: "Amit Verma",
    status: "Open",          dueDate: "15 Jul 26",  submittedDate: "16 Jan 26",
  },
  {
    id: "FB-003", pollId: "POLL-2026-002", pollTitle: "Work From Home Policy Feedback",
    type: "Query",
    summary: "WFH eligibility criteria not clear for contractual staff",
    detail: "The policy document does not specify whether contractors on 6-month terms are eligible for WFH. Needs clarification.",
    submittedBy: "Kavya Sinha",  department: "IT",  owner: "Neha Joshi",
    status: "Query Replied",  submittedDate: "12 Jan 26",
  },
  {
    id: "FB-004", pollId: "POLL-2026-002", pollTitle: "Work From Home Policy Feedback",
    type: "Actionable",
    summary: "Update WFH policy document to include contractual staff clause",
    detail: "Policy section 3.2 needs an addendum covering contractors. Legal review required.",
    submittedBy: "Manish Gupta", department: "Admin", owner: "Rajiv Kumar",
    status: "Closed",         submittedDate: "13 Jan 26",
  },
  {
    id: "FB-005", pollId: "POLL-2026-004", pollTitle: "Performance Review Process",
    type: "Actionable",
    summary: "Performance review timeline should be communicated at least 4 weeks in advance",
    detail: "Employees frequently feel underprepared. A calendar invite with 4-week notice and a preparation guide would significantly improve engagement.",
    submittedBy: "Sunita Rao",   department: "Finance", owner: "Meera Patel",
    status: "Open",  dueDate: "10 Jun 26",  overdue: true,  submittedDate: "01 Mar 26",
  },
  {
    id: "FB-006", pollId: "POLL-2026-005", pollTitle: "IT Infrastructure Satisfaction",
    type: "Suggestion",
    summary: "Provide loaner laptops for remote employees during device repairs",
    detail: "Currently employees wait 5–7 days without a device. A loaner fleet of 10 units would resolve this.",
    submittedBy: "Arun Pillai", department: "Sales", owner: "Deepak Singh",
    status: "No Action Required",  submittedDate: "05 Mar 26",
  },
  {
    id: "FB-007", pollId: "POLL-2026-007", pollTitle: "Training Satisfaction Survey",
    type: "Actionable",
    summary: "Training modules lack soft skill components — communication & leadership",
    detail: "Technical training is strong but soft skills (communication, leadership, conflict resolution) are absent from the LMS catalogue.",
    submittedBy: "Leena Mishra", department: "Ops", owner: "Meera Patel",
    status: "In Progress",  dueDate: "20 Jul 26",  submittedDate: "14 May 26",
  },
  {
    id: "FB-008", pollId: "POLL-2026-005", pollTitle: "IT Infrastructure Satisfaction",
    type: "Query",
    summary: "VPN access breaks after 2h idle — is this intentional?",
    detail: "Remote employees are getting disconnected from VPN after approximately 2 hours of idle time. The IT helpdesk says it is a security policy but no documentation was shared.",
    submittedBy: "Kiran Mehta",  department: "L&D", owner: "Sunita Rao",
    status: "Query Replied",   submittedDate: "06 Mar 26",
  },
  {
    id: "FB-009", pollId: "POLL-2026-007", pollTitle: "Training Satisfaction Survey",
    type: "Suggestion",
    summary: "Make post-training assessment optional or allow re-attempts",
    detail: "Mandatory single-attempt assessments create anxiety. Optional mode or 3 re-attempt policy would improve completion rates.",
    submittedBy: "Tanisha Verma", department: "IT", owner: "Kiran Mehta",
    status: "Open",  dueDate: "25 Jul 26",  submittedDate: "15 May 26",
  },
  {
    id: "FB-010", pollId: "POLL-2026-001", pollTitle: "Employee Wellness Survey",
    type: "Actionable",
    summary: "Introduce structured onboarding wellness check-in at 30/60/90 days",
    detail: "New joiners have no structured wellness touchpoint. A 3-stage check-in programme would improve early retention.",
    submittedBy: "Prakash Dubey", department: "Ops", owner: "Priya Sharma",
    status: "In Progress",  dueDate: "01 Aug 26",  submittedDate: "17 Jan 26",
  },
];

// ─────────────────────────────────────────────
// Feedback Closures
// ─────────────────────────────────────────────
export const closureItems: ClosureItem[] = [
  { pollId: "P-001", feedbackId: "FB-001", summary: "Mental health support program",     status: "Closed",      emailSent: true,  happyWithSolution: "Yes"     },
  { pollId: "P-001", feedbackId: "FB-002", summary: "Flexible break timings",            status: "Open",        emailSent: false, happyWithSolution: "Pending" },
  { pollId: "P-002", feedbackId: "FB-003", summary: "WFH eligibility query resolved",    status: "Closed",      emailSent: true,  happyWithSolution: "Yes"     },
  { pollId: "P-004", feedbackId: "FB-005", summary: "Review timeline communication",     status: "In Progress", emailSent: false, happyWithSolution: "Pending" },
  { pollId: "P-005", feedbackId: "FB-006", summary: "Loaner laptops — no action",        status: "No Action",   emailSent: true,  happyWithSolution: "Pending" },
  { pollId: "P-007", feedbackId: "FB-007", summary: "Soft skills training update",       status: "In Progress", emailSent: false, happyWithSolution: "Pending" },
  { pollId: "P-007", feedbackId: "FB-009", summary: "Assessment re-attempt policy",      status: "Open",        emailSent: false, happyWithSolution: "Pending" },
  { pollId: "P-001", feedbackId: "FB-010", summary: "Onboarding wellness check-in",      status: "In Progress", emailSent: false, happyWithSolution: "Pending" },
];

// ─────────────────────────────────────────────
// Employee Participation
// ─────────────────────────────────────────────
export const employees: Employee[] = [
  { id: "E01", name: "Priya Sharma",   initials: "PS", department: "HR",      participatedIn: ["POLL-2026-001","POLL-2026-002","POLL-2026-007"] },
  { id: "E02", name: "Amit Verma",     initials: "AV", department: "Admin",   participatedIn: ["POLL-2026-001","POLL-2026-002","POLL-2026-004"] },
  { id: "E03", name: "Neha Joshi",     initials: "NJ", department: "Ops",     participatedIn: ["POLL-2026-001","POLL-2026-003","POLL-2026-007"] },
  { id: "E04", name: "Rajiv Kumar",    initials: "RK", department: "L&D",     participatedIn: ["POLL-2026-002","POLL-2026-004","POLL-2026-007"] },
  { id: "E05", name: "Sunita Rao",     initials: "SR", department: "IT",      participatedIn: ["POLL-2026-001","POLL-2026-005"] },
  { id: "E06", name: "Deepak Singh",   initials: "DS", department: "Safety",  participatedIn: ["POLL-2026-006","POLL-2026-007"] },
  { id: "E07", name: "Meera Patel",    initials: "MP", department: "HR",      participatedIn: ["POLL-2026-001","POLL-2026-002","POLL-2026-007","POLL-2026-003"] },
  { id: "E08", name: "Vikram Das",     initials: "VD", department: "HR",      participatedIn: ["POLL-2026-001","POLL-2026-007"] },
  { id: "E09", name: "Ananya Bose",    initials: "AB", department: "Admin",   participatedIn: ["POLL-2026-002","POLL-2026-009"] },
  { id: "E10", name: "Kiran Mehta",    initials: "KM", department: "L&D",     participatedIn: ["POLL-2026-004","POLL-2026-005","POLL-2026-007","POLL-2026-010"] },
  { id: "E11", name: "Rohit Kumar",    initials: "RK", department: "Ops",     participatedIn: [] },
  { id: "E12", name: "Kavya Sinha",    initials: "KS", department: "IT",      participatedIn: ["POLL-2026-005"] },
  { id: "E13", name: "Manish Gupta",   initials: "MG", department: "Ops",     participatedIn: [] },
  { id: "E14", name: "Arun Pillai",    initials: "AP", department: "Sales",   participatedIn: ["POLL-2026-001","POLL-2026-007"] },
  { id: "E15", name: "Sneha Salve",    initials: "SS", department: "Sales",   participatedIn: [] },
  { id: "E16", name: "Tanisha Verma",  initials: "TV", department: "IT",      participatedIn: ["POLL-2026-005","POLL-2026-007"] },
  { id: "E17", name: "Prakash Dubey",  initials: "PD", department: "Ops",     participatedIn: ["POLL-2026-001","POLL-2026-003"] },
  { id: "E18", name: "Leena Mishra",   initials: "LM", department: "Ops",     participatedIn: ["POLL-2026-007"] },
  { id: "E19", name: "Arjun Nair",     initials: "AN", department: "Finance", participatedIn: ["POLL-2026-001","POLL-2026-002","POLL-2026-004","POLL-2026-005"] },
  { id: "E20", name: "Pooja Singh",    initials: "PS", department: "HR",      participatedIn: ["POLL-2026-001","POLL-2026-007","POLL-2026-008"] },
  { id: "E21", name: "Ravi Kumar",     initials: "RK", department: "IT",      participatedIn: ["POLL-2026-005","POLL-2026-007","POLL-2026-010"] },
  { id: "E22", name: "Divya Menon",    initials: "DM", department: "Finance", participatedIn: ["POLL-2026-001","POLL-2026-002"] },
  { id: "E23", name: "Sanjay Tiwari",  initials: "ST", department: "Admin",   participatedIn: [] },
  { id: "E24", name: "Rekha Nair",     initials: "RN", department: "Safety",  participatedIn: ["POLL-2026-006"] },
];

// Map poll IDs to titles for tooltip display
export const pollTitleMap: Record<string, string> = {
  "POLL-2026-001": "Employee Wellness Survey",
  "POLL-2026-002": "Work From Home Policy Feedback",
  "POLL-2026-003": "Canteen Menu Review",
  "POLL-2026-004": "Performance Review Process",
  "POLL-2026-005": "IT Infrastructure Satisfaction",
  "POLL-2026-006": "Safety Protocol Awareness",
  "POLL-2026-007": "Training Satisfaction Survey",
  "POLL-2026-008": "Annual Benefits Review",
  "POLL-2026-009": "Office Space Utilisation",
  "POLL-2026-010": "Learning Platform Feedback",
};

// ─────────────────────────────────────────────
// Poll Cadence
// ─────────────────────────────────────────────
export const cadencePolls: CadencePoll[] = [
  {
    id: "CAD-001",
    title: "Employee Engagement Pulse Check",
    cadence: "Monthly",
    nextRelease: "01 Jul 26",
    lastReleased: "01 Jun 26",
    status: "Scheduled",
    owner: "Priya Sharma",
    autoApprove: true,
    audience: 145,
  },
  {
    id: "CAD-002",
    title: "Manager Effectiveness Survey",
    cadence: "Quarterly",
    nextRelease: "01 Jul 26",
    lastReleased: "01 Apr 26",
    status: "Scheduled",
    owner: "Meera Patel",
    autoApprove: false,
    audience: 120,
  },
  {
    id: "CAD-003",
    title: "Training Effectiveness Review",
    cadence: "Quarterly",
    nextRelease: "15 Jul 26",
    lastReleased: "15 Apr 26",
    status: "Scheduled",
    owner: "Kiran Mehta",
    autoApprove: true,
    audience: 90,
  },
  {
    id: "CAD-004",
    title: "Annual Culture & Values Assessment",
    cadence: "Annual",
    nextRelease: "01 Jan 27",
    lastReleased: "01 Jan 26",
    status: "Scheduled",
    owner: "Priya Sharma",
    autoApprove: false,
    audience: 145,
  },
  {
    id: "CAD-005",
    title: "IT Helpdesk Satisfaction",
    cadence: "Monthly",
    nextRelease: "Overdue (Jun 26)",
    lastReleased: "01 May 26",
    status: "Overdue",
    owner: "Sunita Rao",
    autoApprove: true,
    audience: 80,
  },
  {
    id: "CAD-006",
    title: "Safety Awareness Quiz",
    cadence: "Bi-Annual",
    nextRelease: "01 Sep 26",
    lastReleased: "01 Mar 26",
    status: "Scheduled",
    owner: "Deepak Singh",
    autoApprove: false,
    audience: 145,
  },
  {
    id: "CAD-007",
    title: "Benefits Satisfaction Survey",
    cadence: "Annual",
    nextRelease: "01 Jul 26",
    status: "Draft",
    owner: "Vikram Das",
    autoApprove: false,
    audience: 145,
  },
  {
    id: "CAD-008",
    title: "Onboarding Experience Check-in",
    cadence: "Monthly",
    nextRelease: "01 Jul 26",
    lastReleased: "01 Jun 26",
    status: "Scheduled",
    owner: "Pooja Singh",
    autoApprove: true,
    audience: 12,
  },
];

// ─────────────────────────────────────────────
// Follow-up data
// ─────────────────────────────────────────────
export const followUpData = [
  {
    category: "Feedback Pending Closure" as const,
    count: 7, color: "amber", icon: "folder-clock",
    items: [
      { id: "POLL-2026-001 FB-002", label: "Overdue"   },
      { id: "POLL-2026-004 FB-005", label: "Due today" },
      { id: "+5 more",              label: ""          },
    ],
  },
  {
    category: "Approval Overdue" as const,
    count: 2, color: "orange", icon: "clock-alert",
    items: [
      { id: "POLL-2026-003", label: "8 days" },
      { id: "POLL-2026-009", label: "3 days" },
    ],
  },
  {
    category: "Results Not Shared" as const,
    count: 3, color: "pink", icon: "send",
    items: [
      { id: "POLL-2026-001", label: "Overdue"    },
      { id: "POLL-2026-004", label: "Due 20 Jun" },
      { id: "POLL-2026-010", label: "Due 25 Jun" },
    ],
  },
  {
    category: "Non-participant Reminders" as const,
    count: 42, color: "slate", icon: "user-x",
    items: [
      { id: "POLL-2026-007", label: "42 people" },
      { id: "Ops, IT, Sales", label: "Dept focus" },
    ],
  },
];
