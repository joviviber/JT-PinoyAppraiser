import React from 'react';
import { AppraisalResult, PropertyDetails } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdWrapper } from './AdWrapper';

interface ValuationResultProps {
  data: AppraisalResult;
  input: PropertyDetails;
  onReset: () => void;
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

export const ValuationResult: React.FC<ValuationResultProps> = ({ data, input, onReset }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">Estimated Market Value</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-bold">{formatCurrency(data.minPrice)}</span>
              <span className="text-2xl md:text-3xl text-slate-400 font-light">-</span>
              <span className="text-4xl md:text-5xl font-bold text-blue-400">{formatCurrency(data.maxPrice)}</span>
            </div>
            <p className="mt-2 text-slate-400 text-sm">
              {input.propertyType} • {input.buildingName ? `${input.buildingName}, ` : ''}{input.city} • {input.sizeSqm} sqm
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Analysis Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Market Analysis
                </h4>
                <p className="text-slate-600 leading-relaxed text-justify">
                  {data.analysis}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Historical Price Trend (Estimate)
                </h4>
                <div className="h-64 w-full bg-slate-50 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.priceTrend}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 12}} 
                        dy={10}
                      />
                      <YAxis 
                        hide 
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#2563eb" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-blue-900 font-bold mb-4">Key Valuation Factors</h4>
                <ul className="space-y-4">
                  {data.comparableHighlights.map((highlight, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </div>
                      <p className="text-sm text-blue-800 leading-snug">{highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ad Placement in Sidebar */}
              <div className="mt-6">
                <AdWrapper />
              </div>

              <div className="mt-6">
                 <button 
                  onClick={onReset}
                  className="w-full bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Valuate Another Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4 max-w-2xl mx-auto">
        Disclaimer: This valuation is an AI-generated estimate based on general market data and does not constitute a formal appraisal. Actual property values may vary based on specific conditions, negotiation, and legal factors.
      </p>
    </div>
  );
};