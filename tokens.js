/**
 * TRIAGEFLOW AI — Centralized Design Tokens
 * 
 * STRICT COLOR IDENTITY:
 * - Charcoal / Black (Primary surface foundation)
 * - Grey (Neutrals, borders, metadata, typography hierarchy)
 * - Sage (Primary accent, brand glow, knowledge, intelligent state)
 * - Green (Automation success, RAG grounded confidence, safe actions)
 * - Red (ONLY for critical alerts, facility emergencies, security/spam, destructive actions)
 * 
 * FORBIDDEN: Teal, Blue, Purple, Pink, Orange, Yellow, Rainbow Gradients
 */

export const colors = {
  // Deep charcoal / near-black surfaces
  surface: {
    base: '#0a0b0c',      // App background
    card: '#111315',      // Container card
    cardHover: '#16181b', // Interactive hover
    elevated: '#1a1d20',  // Modals, dropdowns, popovers
    overlay: 'rgba(10, 11, 12, 0.85)',
    border: '#22262a',    // Subtle card border
    borderSubtle: '#1b1e21',
    borderActive: '#38423b', // Sage border on active
  },

  // Grey Scale (Structure, Text, Secondary)
  grey: {
    950: '#0f1112',
    900: '#16181a',
    800: '#22262a',
    700: '#32373d',
    600: '#484f57',
    500: '#656e77',
    400: '#8c959f',
    300: '#b0b8c1',
    200: '#d0d7de',
    100: '#e6ebf1',
    50: '#f6f8fa',
  },

  // Sage (Intelligence, Brand Identity, Knowledge, Decisions)
  sage: {
    950: '#101712',
    900: '#17221b',
    800: '#24342a',
    700: '#354b3d',
    600: '#4a6754',
    500: '#63856e',
    400: '#7fa48b',
    300: '#a2c1ac',
    200: '#cadbcd',
    100: '#eaf1eb',
  },

  // Green (Automation, Grounded RAG, Safe Execution)
  green: {
    950: '#061d0f',
    900: '#0d381c',
    800: '#14532b',
    700: '#18793e',
    600: '#1e9b4f',
    500: '#22c55e',
    400: '#4ade80',
    300: '#86efac',
    200: '#bbf7d0',
    100: '#dcfce7',
  },

  // Red (STRICTLY RESERVED: Urgent, Emergency, Critical Escalation, Threat, Delete)
  red: {
    950: '#280c0d',
    900: '#451315',
    800: '#751b1f',
    700: '#9b2226',
    600: '#c5282e',
    500: '#ef4444',
    400: '#f87171',
    300: '#fca5a5',
  }
};

export const categoryStyles = {
  sales_inquiry: {
    label: 'Sales Inquiry',
    text: 'text-[#a2c1ac]',
    bg: 'bg-[#17221b]',
    border: 'border-[#24342a]',
    dot: 'bg-[#7fa48b]',
  },
  general_query: {
    label: 'General Query',
    text: 'text-[#b0b8c1]',
    bg: 'bg-[#16181a]',
    border: 'border-[#22262a]',
    dot: 'bg-[#656e77]',
  },
  job_application: {
    label: 'Job Application (HR)',
    text: 'text-[#86efac]',
    bg: 'bg-[#0d381c]',
    border: 'border-[#14532b]',
    dot: 'bg-[#22c55e]',
  },
  project_related: {
    label: 'Project Update',
    text: 'text-[#cadbcd]',
    bg: 'bg-[#17221b]',
    border: 'border-[#354b3d]',
    dot: 'bg-[#63856e]',
  },
  meeting_request: {
    label: 'Meeting Request',
    text: 'text-[#d0d7de]',
    bg: 'bg-[#22262a]',
    border: 'border-[#32373d]',
    dot: 'bg-[#8c959f]',
  },
  urgent_request: {
    label: 'Critical Alert',
    text: 'text-[#fca5a5]',
    bg: 'bg-[#451315]',
    border: 'border-[#751b1f]',
    dot: 'bg-[#ef4444]',
  },
  complaint: {
    label: 'Dispute / Complaint',
    text: 'text-[#d0d7de]',
    bg: 'bg-[#22262a]',
    border: 'border-[#484f57]',
    dot: 'bg-[#8c959f]',
  },
  promotional: {
    label: 'Promotional',
    text: 'text-[#8c959f]',
    bg: 'bg-[#16181a]',
    border: 'border-[#22262a]',
    dot: 'bg-[#484f57]',
  },
  spam: {
    label: 'Spam / Phishing',
    text: 'text-[#f87171]',
    bg: 'bg-[#280c0d]',
    border: 'border-[#451315]',
    dot: 'bg-[#c5282e]',
  },
  other: {
    label: 'Unclassified',
    text: 'text-[#8c959f]',
    bg: 'bg-[#16181a]',
    border: 'border-[#22262a]',
    dot: 'bg-[#484f57]',
  }
};

export const priorityStyles = {
  low: {
    label: 'Low',
    badge: 'text-[#8c959f] bg-[#16181a] border-[#22262a]',
  },
  normal: {
    label: 'Normal',
    badge: 'text-[#b0b8c1] bg-[#1d2023] border-[#32373d]',
  },
  high: {
    label: 'High Priority',
    badge: 'text-[#a2c1ac] bg-[#17221b] border-[#24342a]',
  },
  critical: {
    label: 'CRITICAL',
    badge: 'text-[#fca5a5] bg-[#451315] border-[#751b1f] animate-pulse',
  }
};

export const actionStyles = {
  rag_reply: {
    label: 'Automated RAG Response',
    color: 'text-[#86efac] bg-[#0d381c]/60 border-[#14532b]',
  },
  human_review: {
    label: 'Escalated to Human Review',
    color: 'text-[#cadbcd] bg-[#17221b]/60 border-[#354b3d]',
  },
  forward_to_hr: {
    label: 'Routed to HR Queue',
    color: 'text-[#a2c1ac] bg-[#17221b]/60 border-[#24342a]',
  },
  forward_to_manager: {
    label: 'Routed to Project Manager',
    color: 'text-[#b0b8c1] bg-[#22262a]/60 border-[#32373d]',
  },
  immediate_urgent_alert: {
    label: 'EMERGENCY INCIDENT PROTOCOL',
    color: 'text-[#fca5a5] bg-[#451315]/80 border-[#751b1f]',
  },
  archive: {
    label: 'Auto-Archived',
    color: 'text-[#8c959f] bg-[#16181a]/60 border-[#22262a]',
  },
  move_to_spam: {
    label: 'Flagged as Spam',
    color: 'text-[#f87171] bg-[#280c0d]/80 border-[#451315]',
  }
};
