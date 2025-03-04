import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleCard({ title, icon, children }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-dark-200 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-dark-300 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-minecraft text-sm text-light-100">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-light-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-light-300" />
        )}
      </button>
      {isOpen && <div className="p-4 border-t border-dark-400">{children}</div>}
    </div>
  );
}

export default CollapsibleCard;