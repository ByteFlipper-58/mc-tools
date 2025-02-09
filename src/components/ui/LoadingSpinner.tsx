import React from 'react';
import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
    </div>
  );
}

export default LoadingSpinner;