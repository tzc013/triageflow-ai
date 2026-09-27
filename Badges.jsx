import React from 'react';
import { categoryStyles, priorityStyles, actionStyles } from '../../styles/tokens.js';

export function CategoryBadge({ category }) {
  const style = categoryStyles[category] || categoryStyles.other;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const style = priorityStyles[priority] || priorityStyles.normal;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border uppercase tracking-wider ${style.badge}`}>
      {style.label}
    </span>
  );
}

export function ActionBadge({ action }) {
  const style = actionStyles[action] || {
    label: action?.replace(/_/g, ' ') || 'Processed',
    color: 'text-[#b0b8c1] bg-[#1d2023] border-[#32373d]'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${style.color}`}>
      {style.label}
    </span>
  );
}
