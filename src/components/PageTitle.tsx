import React from 'react';
import BackButton from './BackButton';
import { useLocation } from 'react-router-dom';

interface PageTitleProps {
  children: React.ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  return (
    <div className="flex items-center gap-4 mb-6">
      {showBackButton && <BackButton />}
      <h1 className="text-2xl font-minecraft text-light-100">
        {children}
      </h1>
    </div>
  );
}

export default PageTitle;