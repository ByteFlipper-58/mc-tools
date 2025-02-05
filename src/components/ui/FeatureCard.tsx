import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ to, icon, title, description }: FeatureCardProps) {
  return (
    <Link
      to={to}
      className="bg-[#2C2F33] p-6 rounded-lg hover:bg-[#34373C] transition-colors group"
    >
      <div className="flex flex-col items-center text-center">
        {icon}
        <h2 className="text-2xl font-minecraft mb-2">{title}</h2>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default FeatureCard;