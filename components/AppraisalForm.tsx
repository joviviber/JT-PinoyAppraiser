import React, { useState } from 'react';
import { PropertyDetails, PROPERTY_TYPES } from '../types';
import { getAppraisal } from '../services/geminiService';

interface AppraisalFormProps {
  onSuccess: (result: any, details: PropertyDetails) => void;
  setLoading: (loading: boolean) => void;
}

export const AppraisalForm: React.FC<AppraisalFormProps> = ({ onSuccess, setLoading }) => {
  const [formData, setFormData] = useState<PropertyDetails>({
    city: "",
    buildingName: "",
    propertyType: PROPERTY_TYPES[0],
    sizeSqm: 0,
    bedrooms: 0,
    bathrooms: 0
  });

  // Simple Math Captcha State
  const [captcha, setCaptcha] = useState(() => ({
    num1: Math.floor(Math.random() * 10) + 1,
    num2: Math.floor(Math.random() * 10) + 1
  }));
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const handleChange = (field: keyof PropertyDetails, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const regenerateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1
    });
    setCaptchaAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validate Human
    const expectedAnswer = captcha.num1 + captcha.num2;
    if (parseInt(captchaAnswer) !== expectedAnswer) {
      alert("Incorrect security answer. Please try again.");
      regenerateCaptcha();
      return;
    }

    // 2. Validate Form Data
    if (!formData.city) {
      alert("Please enter a city.");
      return;
    }
    if (!formData.sizeSqm || formData.sizeSqm <= 0) {
      alert("Please enter a valid property area size.");
      return;
    }

    setLoading(true);
    try {
      const result = await getAppraisal(formData);
      onSuccess(result, formData);
    } catch (error) {
      console.error(error);
      alert("Failed to get appraisal. Please ensure you have a valid API Key setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Property Details</h2>
        <p className="text-slate-500">Enter the details below to get an instant AI valuation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g. Makati, Taguig, Cebu City"
              required
            />
          </div>

          {/* Building or Subdivision */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Building/Subdivision</label>
            <input
              type="text"
              value={formData.buildingName}
              onChange={(e) => handleChange('buildingName', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g. Jazz Residences, Serendra"
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Property Type</label>
            <div className="relative">
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white"
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Area (sqm)</label>
            <input
              type="number"
              value={formData.sizeSqm || ''}
              onChange={(e) => handleChange('sizeSqm', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g. 50"
              min="10"
            />
          </div>
        </div>

        {/* Beds & Baths */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Bedrooms</label>
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={() => handleChange('bedrooms', Math.max(0, formData.bedrooms - 1))}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >-</button>
              <span className="text-xl font-bold text-slate-800 w-8 text-center">{formData.bedrooms}</span>
              <button 
                type="button"
                onClick={() => handleChange('bedrooms', formData.bedrooms + 1)}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >+</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Bathrooms</label>
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={() => handleChange('bathrooms', Math.max(0, formData.bathrooms - 1))}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >-</button>
              <span className="text-xl font-bold text-slate-800 w-8 text-center">{formData.bathrooms}</span>
              <button 
                type="button"
                onClick={() => handleChange('bathrooms', formData.bathrooms + 1)}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >+</button>
            </div>
          </div>
        </div>

        {/* Human Verification */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <label className="text-sm font-bold text-slate-700 block mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Human Verification
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-slate-600 text-sm">
              Please solve: <span className="font-bold text-slate-800 text-lg mx-1">{captcha.num1} + {captcha.num2} = ?</span>
            </p>
            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className="w-24 px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-center font-bold text-slate-800"
              placeholder="?"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Get Free Valuation
        </button>
      </form>
    </div>
  );
};