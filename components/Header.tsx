import React from 'react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenMarketTrends: () => void;
  onOpenPriceHeatmaps: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenHowItWorks, 
  onOpenMarketTrends, 
  onOpenPriceHeatmaps,
  onOpenAbout 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              PinoyAppraiser
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={onOpenHowItWorks} 
              className="px-4 py-2 rounded-full text-slate-600 font-medium transition-all border border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            >
              How it works
            </button>
            <button 
              onClick={onOpenMarketTrends} 
              className="px-4 py-2 rounded-full text-slate-600 font-medium transition-all border border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            >
              Market Trends
            </button>
            <button 
              onClick={onOpenPriceHeatmaps} 
              className="px-4 py-2 rounded-full text-slate-600 font-medium transition-all border border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            >
              Price Heatmaps
            </button>
            <button 
              onClick={onOpenAbout} 
              className="px-4 py-2 rounded-full text-slate-600 font-medium transition-all border border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            >
              About
            </button>
          </nav>
          <a 
            href="mailto:pinoyappraiser+info@gmail.com?subject=Agent Inquiry" 
            className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Contact Agent
          </a>
        </div>
      </div>
    </header>
  );
};