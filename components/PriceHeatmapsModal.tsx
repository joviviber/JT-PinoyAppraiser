import React, { useState, useEffect } from 'react';
import { HEATMAP_LOCATIONS, HeatmapData } from '../types';
import { getPriceHeatmap } from '../services/geminiService';

interface PriceHeatmapsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short"
  }).format(amount);
};

export const PriceHeatmapsModal: React.FC<PriceHeatmapsModalProps> = ({ isOpen, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(HEATMAP_LOCATIONS[0]);
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<Record<string, HeatmapData>>({});

  useEffect(() => {
    if (isOpen) {
      fetchData(selectedLocation);
    }
  }, [isOpen, selectedLocation]);

  const fetchData = async (location: string) => {
    if (cache[location]) {
      setData(cache[location]);
      return;
    }

    setLoading(true);
    setData(null);
    try {
      const result = await getPriceHeatmap(location);
      setCache(prev => ({ ...prev, [location]: result }));
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getHeatmapColor = (level: string) => {
    switch (level) {
      case 'Luxury': return 'bg-red-500 text-white';
      case 'High-End': return 'bg-orange-400 text-white';
      case 'Mid-End': return 'bg-yellow-300 text-slate-900';
      case 'Budget': return 'bg-green-400 text-white';
      default: return 'bg-slate-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="font-bold text-slate-900">Locations</h2>
            <p className="text-xs text-slate-500">Select a major area</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {HEATMAP_LOCATIONS.map(loc => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedLocation === loc 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedLocation} Heatmap</h2>
              <p className="text-sm text-slate-500">Estimated Price per Sqm (PHP) • Powered by AI</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Analyzing {selectedLocation} market data...</p>
              </div>
            ) : data ? (
              <div className="space-y-6">
                
                {/* Summary Card */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Market Overview ({data.lastUpdated})</h4>
                  <p className="text-slate-700 leading-relaxed">{data.summary}</p>
                </div>

                {/* Heatmap Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.zones.map((zone, idx) => (
                    <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
                      <div className={`h-2 ${getHeatmapColor(zone.priceLevel)}`}></div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-slate-900 leading-tight">{zone.areaName}</h3>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                             zone.priceLevel === 'Luxury' ? 'bg-red-100 text-red-700' :
                             zone.priceLevel === 'High-End' ? 'bg-orange-100 text-orange-700' :
                             zone.priceLevel === 'Mid-End' ? 'bg-yellow-100 text-yellow-800' :
                             'bg-green-100 text-green-700'
                          }`}>
                            {zone.priceLevel}
                          </span>
                        </div>
                        <div className="mt-auto">
                          <p className="text-3xl font-extrabold text-slate-900 tracking-tight my-2">
                            {formatCurrency(zone.avgPriceSqm)}
                            <span className="text-xs font-normal text-slate-400 ml-1">/sqm</span>
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                            <span className="truncate max-w-[70%]">{zone.description}</span>
                            <span className={`font-semibold ${zone.growthRate.includes('+') ? 'text-green-600' : 'text-slate-600'}`}>
                              {zone.growthRate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center mt-8 text-xs text-slate-600">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-green-400 rounded-full"></div> Budget
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-yellow-300 rounded-full"></div> Mid-End
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-orange-400 rounded-full"></div> High-End
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full"></div> Luxury
                   </div>
                </div>

                <p className="text-center text-[10px] text-slate-400 pt-4">
                   Note: Prices are estimated averages for prime properties and may vary based on specific building, floor, and condition.
                </p>

              </div>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
};