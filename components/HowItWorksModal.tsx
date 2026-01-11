import React from 'react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Analysis
            </h3>
            <p>
              PinoyAppraiser leverages advanced Artificial Intelligence (Google Gemini) to simulate the valuation process. By analyzing available market data, recent listings, and historical price trends across specific locations in the Philippines, the system calculates a probable value range for your property based on the details you provide (Location, Size, Type, etc.).
            </p>
          </section>

          <section className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h3 className="text-lg font-bold text-amber-800 mb-2">Important Disclaimer</h3>
            <p className="text-amber-900 text-sm mb-3">
              The results provided by this tool are <strong>ESTIMATES ONLY</strong>.
            </p>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1">
              <li>This data is for personal information and educational purposes only.</li>
              <li>This is <strong>NOT</strong> a formal appraisal report.</li>
              <li>This should <strong>NOT</strong> be treated as factual or final.</li>
              <li>Do not use this result for bank loan applications, court proceedings, or taxation purposes.</li>
            </ul>
          </section>

          <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
            <p className="text-slate-800 text-lg mb-2">Need an official valuation?</p>
            <p className="font-bold text-slate-900 text-xl">
              For official purposes, we highly recommend engaging the services of a PRC Licensed Real Estate Appraiser in the Philippines.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Only a licensed professional can provide a legally binding appraisal report after conducting an actual physical inspection of the property.
            </p>
          </section>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};