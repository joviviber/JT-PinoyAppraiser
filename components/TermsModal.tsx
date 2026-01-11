import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <p className="text-xs text-slate-400">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h3 className="text-base font-bold text-slate-900 mt-4">1. Acceptance of Terms</h3>
          <p>
            By accessing or using PinoyAppraiser ("the Service"), you automatically accept and agree to be bound by the terms and provisions of this agreement the moment this website is used. 
            You expressly agree that your use of this Service is strictly limited to <strong>personal use and informational purposes only</strong>.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">2. Description of Service</h3>
          <p>PinoyAppraiser is an AI-powered tool designed to provide estimated market values for real estate properties in the Philippines. The Service utilizes Google Gemini API to analyze data. You acknowledge that these valuations are automated estimates and <strong>do not constitute professional appraisal reports</strong>.</p>

          <h3 className="text-base font-bold text-slate-900 mt-4">3. Monetization and Google AdSense</h3>
          <p>This website is supported by advertising revenue via Google AdSense. By using this site, you agree to the display of advertisements. We do not control the content of third-party ads and are not responsible for any products or services offered by advertisers.</p>

          <h3 className="text-base font-bold text-slate-900 mt-4">4. User Conduct</h3>
          <p>You agree not to misuse the Service or help anyone else do so. You must not try to gain unauthorized access to the Service, overload the API, or use the generated data for malicious purposes.</p>

          <h3 className="text-base font-bold text-slate-900 mt-4">5. Intellectual Property</h3>
          <p>The interface, logo, and unique code of PinoyAppraiser are the property of the developers. The AI-generated content is provided for your personal use.</p>

          <h3 className="text-base font-bold text-slate-900 mt-4">6. Limitation of Liability</h3>
          <p>In no event shall PinoyAppraiser, its operators, or its supervisors be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the Service, or for any investment decisions made based on the data provided.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-500/20"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};