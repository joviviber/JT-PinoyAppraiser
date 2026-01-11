import React from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Disclaimer</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h3 className="text-amber-900 font-bold text-base mb-1">Not Professional Advice</h3>
            <p className="text-amber-800">
              The information provided by PinoyAppraiser is for general informational purposes only. It is <strong>NOT</strong> intended to substitute for the advice of a Professional Regulatory Commission (PRC) Licensed Real Estate Appraiser.
            </p>
          </div>

          <h3 className="text-base font-bold text-slate-900 mt-2">1. AI Limitations</h3>
          <p>
            This website uses Large Language Models (AI) to generate estimates. AI can hallucinate or produce inaccurate data. While supervised by professionals, the output may not reflect the absolute current market conditions due to data cut-off limits or lack of specific property context (e.g., interior condition, view, exact location).
          </p>

          <h3 className="text-base font-bold text-slate-900">2. "As-Is" Basis</h3>
          <p>
            All information on this site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. Financial Risk</h3>
          <p>
            Real estate values fluctuate. PinoyAppraiser shall not be held liable for any financial losses or damages resulting from the use of this tool. <strong>Do not use these results for bank loan applications, taxation, or legal proceedings.</strong>
          </p>

          <h3 className="text-base font-bold text-slate-900">4. Professional Recommendation</h3>
          <p>
            For accurate, legally binding valuations, we explicitly and strongly recommend hiring a <strong>PRC Licensed Real Estate Appraiser</strong> to conduct a physical inspection and thorough market analysis.
          </p>

          <h3 className="text-base font-bold text-slate-900">5. External Links</h3>
          <p>
            Our website may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-500/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};