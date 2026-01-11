import React from 'react';

// This wrapper helps strict compliance with AdSense policies by:
// 1. Preventing accidental clicks (spacing)
// 2. Properly labeling ads to avoid "misleading content"
// 3. Reserving space to minimize Cumulative Layout Shift (CLS)

export const AdWrapper: React.FC = () => {
  return (
    <div className="w-full max-w-[728px] mx-auto my-8 flex flex-col items-center justify-center animate-fade-in">
      <span className="ad-label">Advertisement</span>
      <div className="w-full bg-slate-50 border border-slate-100 rounded-lg overflow-hidden min-h-[90px] flex items-center justify-center">
        {/* 
          In a real production environment with a specific ad slot, the <ins> tag would go here.
          Since we are using Auto Ads, this container provides a "safe zone" or can be used for manual placement.
          If Auto Ads places an ad here, it will fill the container.
        */}
        <div className="text-slate-300 text-xs font-medium p-4 text-center">
          Space reserved for Google AdSense
        </div>
      </div>
    </div>
  );
};