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
      className="bg-light-200 dark:bg-dark-300 p-10 rounded-2xl hover:bg-light-300 dark:hover:bg-dark-400 transition-all duration-300 group flex flex-col items-center text-center h-full hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex-1 flex flex-col items-center">
        {icon}
        <h2 className="text-2xl font-minecraft mb-4 text-dark-300 dark:text-light-100 group-hover:text-accent-500 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-100 dark:text-light-300 group-hover:text-dark-400 dark:group-hover:text-light-200 transition-colors duration-300">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default FeatureCard;