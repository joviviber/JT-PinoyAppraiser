import React, { useEffect, useState } from 'react';
import { getMarketTrends } from '../services/geminiService';
import { MarketTrendsData } from '../types';

interface MarketTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketTrendsModal: React.FC<MarketTrendsModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<MarketTrendsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !data) {
      fetchTrends();
    }
  }, [isOpen]);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getMarketTrends();
      setData(result);
    } catch (err) {
      setError("Unable to load latest market trends. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </span>
              Daily Market Trends
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
              Powered by AI • Updates daily at 5:00 AM PH Time
            </p>
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
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-slate-50">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Gathering latest real estate news...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-800 font-medium">{error}</p>
              <button onClick={fetchTrends} className="mt-4 text-blue-600 hover:underline">Try Again</button>
            </div>
          ) : data ? (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 text-center font-medium">
                  Digest Date: {data.date}
                </p>
              </div>

              {data.items.map((item, index) => (
                <article key={index} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 mb-2 uppercase tracking-wide">
                        {item.source}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {item.summary}
                      </p>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 group"
                      >
                        Read full story
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                    <div className="hidden sm:flex flex-shrink-0 text-slate-200 font-extrabold text-4xl select-none">
                      {index + 1}
                    </div>
                  </div>
                </article>
              ))}

              <div className="text-center pt-8 pb-4">
                <p className="text-xs text-slate-400">
                  Disclaimer: This content is summarized by AI from public sources. Please verify details with the original publishers.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};