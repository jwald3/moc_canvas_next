import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-2 border-neutral-800 rounded-full border-t-transparent animate-spin">
      </div>
    </div>
  );
}; 