import React, { useState } from 'react';
import { Header } from './components/Header';
import { AppraisalForm } from './components/AppraisalForm';
import { ValuationResult } from './components/ValuationResult';
import { AppraisalResult, PropertyDetails } from './types';

function App() {
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [inputData, setInputData] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (res: AppraisalResult, details: PropertyDetails) => {
    setResult(res);
    setInputData(details);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
    setInputData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header />

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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                  beta release 1.0
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Know the true value of your <span className="text-blue-600">Property.</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                  PinoyAppraiser uses advanced AI to analyze Philippine real estate trends and give you an instant, data-backed valuation estimate for your home or investment.
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
              <li><a href="#" className="hover:text-white">Valuation Calculator</a></li>
              <li><a href="#" className="hover:text-white">Market Trends</a></li>
              <li><a href="#" className="hover:text-white">Price Heatmaps</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} PinoyAppraiser. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;