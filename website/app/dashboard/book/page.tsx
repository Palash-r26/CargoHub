"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Navigation, Package, IndianRupee, CheckCircle2, ArrowRight, Truck } from "lucide-react";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-display font-bold text-gray-900 mb-4"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 max-w-md"
        >
          Your vehicle has been booked. Driver details will be shared shortly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a href="/dashboard/track?id=CH-2024-0900" className="btn-primary">
            Track Shipment <Navigation className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">New Booking</h1>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full z-0" 
            style={{ background: "var(--brand-primary)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${(step - 1) * 50}%` }}
            transition={{ duration: 0.5 }}
          />
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= s ? 'bg-white border-blue-600 text-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
                style={{ 
                  borderColor: step >= s ? "var(--brand-primary)" : "",
                  color: step >= s ? "var(--brand-primary)" : ""
                }}
                animate={{ scale: step === s ? 1.1 : 1 }}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </motion.div>
              <span className="text-xs font-semibold text-gray-500 absolute top-10 whitespace-nowrap">
                {s === 1 ? 'Locations' : s === 2 ? 'Cargo Details' : 'Review & Pay'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 card overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h2 className="text-lg font-bold mb-4 text-gray-900">Pickup & Drop Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Pickup Location</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-blue-500" />
                      <input type="text" className="input-field pl-10" placeholder="Search pickup address..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Drop Location</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--brand-secondary)" }} />
                      <input type="text" className="input-field pl-10" placeholder="Search drop address..." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl h-[300px] flex items-center justify-center border border-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <p className="text-sm font-semibold text-gray-400 relative z-10">Map preview will appear here</p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-lg font-bold mb-4 text-gray-900">Cargo Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {["Mini", "Tempo", "Truck"].map((v) => (
                  <button key={v} className="border border-gray-200 rounded-xl p-4 text-left hover:border-blue-500 transition-colors focus:border-blue-600 focus:bg-blue-50">
                    <Truck className="w-6 h-6 mb-2 text-gray-600" />
                    <h3 className="font-bold text-gray-900">{v}</h3>
                    <p className="text-xs text-gray-500">Up to {v === 'Mini' ? '300kg' : v === 'Tempo' ? '1 Ton' : '5 Ton'}</p>
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Cargo Type</label>
                  <select className="input-field bg-white">
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Documents</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Estimated Weight (kg)</label>
                  <input type="number" className="input-field" placeholder="e.g. 500" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-lg font-bold mb-4 text-gray-900">Review & Pay</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="font-bold text-gray-700">Tempo (up to 1 Ton)</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Electronics, ~500kg</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Base Fare (18 km)</span>
                    <span className="font-mono">₹450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monsoon Surcharge</span>
                    <span className="font-mono">₹30</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
                    <span>Total Amount</span>
                    <span className="font-mono" style={{ color: "var(--brand-primary)" }}>₹480</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="border border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 font-semibold text-gray-700 hover:border-blue-500 hover:bg-blue-50">
                  <IndianRupee className="w-5 h-5 text-green-600" /> UPI (Razorpay)
                </button>
                <button className="border border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 font-semibold text-gray-700 hover:border-blue-500 hover:bg-blue-50">
                  Wallet (Bal: ₹250)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-end gap-4 border-t border-gray-100 pt-6">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="btn-secondary">
              Back
            </button>
          )}
          <button onClick={handleNext} className="btn-primary">
            {step === 3 ? 'Confirm & Pay' : 'Continue'} <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
