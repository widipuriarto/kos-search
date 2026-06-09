import React from 'react';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
  return (
    <details className="group bg-white rounded-2xl border border-outline-light overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-base text-ink hover:text-brand hover:bg-brand-soft/20 hover:pl-8 transition-all duration-300">
        <span>{question}</span>
        <ChevronDown className="shrink-0 transition-transform duration-300 group-open:-rotate-180" />
      </summary>
      <div className="px-6 pb-6 text-ink-light leading-relaxed">
        {answer}
      </div>
    </details>
  );
};

export default FaqItem;
