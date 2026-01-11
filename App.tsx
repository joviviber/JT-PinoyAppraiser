import React, { useState } from 'react';
import { Header } from './components/Header';
import { AppraisalForm } from './components/AppraisalForm';
import { ValuationResult } from './components/ValuationResult';
import { PrivacyModal } from './components/PrivacyModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { MarketTrendsModal } from './components/MarketTrendsModal';
import { PriceHeatmapsModal } from './components/PriceHeatmapsModal';
import { AboutModal } from './components/AboutModal';
import { TermsModal } from './components/TermsModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { AdWrapper } from './components/AdWrapper';
import { AppraisalResult, PropertyDetails } from './types';

function App() {
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [inputData, setInputData] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isMarketTrendsOpen, setIsMarketTrendsOpen] = useState(false);
  const [isPriceHeatmapsOpen, setIsPriceHeatmapsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleSuccess = (res: AppraisalResult, details: PropertyDetails) => {
    setResult(res);
    setInputData(details);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    // Reload the application from the base URL to ensure a complete reset
    window.location.href = import.meta.env.BASE_URL;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header 
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)} 
        onOpenMarketTrends={() => setIsMarketTrendsOpen(true)}
        onOpenPriceHeatmaps={() => setIsPriceHeatmapsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main className="flex-grow">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="mt-8 text-xl font-bold text-slate-800">Analyzing Market Data...</h3>
            <p className="text-slate-500 mt-2">Checking comparable properties in the area</p>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {!result ? (
            <>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Hero Text */}
                <div className="space-y-8 animate-slide-in-left">
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                      beta release 1.0
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
                      ALWAYS CONSULT A PRC LICENSED REAL ESTATE APPRAISER
                    </div>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    Know the true value of your <span className="text-blue-600">Property.</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                    PinoyAppraiser leverages advanced AI to analyze Philippine real estate trends and provide instant valuation estimates. As these results are artificially processed without direct human supervision, they are intended strictly for initial reference and informational insight only.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Instant Results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Market Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>Philippine Data</span>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-md mx-auto lg:ml-auto">
                  <AppraisalForm onSuccess={handleSuccess} setLoading={setLoading} />
                </div>
              </div>
              
              {/* Ad Placement - Below Fold for Home */}
              <div className="mt-16">
                 <AdWrapper />
              </div>
            </>
          ) : (
            <ValuationResult 
              data={result} 
              input={inputData!} 
              onReset={handleReset} 
            />
          )}

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center sm:text-left grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">PinoyAppraiser</h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Empowering Filipino homeowners and investors with transparent, AI-driven property insights. Built for the modern real estate market.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-white text-left">Valuation Calculator</button></li>
              <li><button onClick={() => setIsMarketTrendsOpen(true)} className="hover:text-white text-left">Market Trends</button></li>
              <li><button onClick={() => setIsPriceHeatmapsOpen(true)} className="hover:text-white text-left">Price Heatmaps</button></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white text-left">Privacy Policy</button></li>
              <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-white text-left">Terms of Service</button></li>
              <li><button onClick={() => setIsDisclaimerOpen(true)} className="hover:text-white text-left">Disclaimer</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} PinoyAppraiser. All rights reserved.
        </div>
      </footer>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
      <MarketTrendsModal isOpen={isMarketTrendsOpen} onClose={() => setIsMarketTrendsOpen(false)} />
      <PriceHeatmapsModal isOpen={isPriceHeatmapsOpen} onClose={() => setIsPriceHeatmapsOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <DisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
    </div>
  );
}

export default App;