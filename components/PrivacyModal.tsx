import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Privacy Policy</h2>
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
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h3 className="text-lg font-bold text-slate-900 mt-4">1. Introduction</h3>
          <p>Welcome to Pinoy Appraiser. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

          <h3 className="text-lg font-bold text-slate-900 mt-4">2. Data We Collect</h3>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Technical Data (IP address, browser type) and Usage Data (how you use our website).</p>

          <h3 className="text-lg font-bold text-slate-900 mt-4">3. Advertising and Cookies</h3>
          <p>
            <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. 
            Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
            Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>. 
            Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-4">4. Property Data</h3>
          <p>Data input into the valuation calculator is processed securely via Google Gemini API and is not permanently stored on our servers.</p>

          <h3 className="text-lg font-bold text-slate-900 mt-4">5. Contact Us</h3>
          <p>For any questions regarding this privacy policy, please contact us at <a href="mailto:pinoyappraiser+info@gmail.com" className="text-blue-600 hover:underline">pinoyappraiser+info@gmail.com</a>.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};