"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

export default function LiveMapMock() {
  return (
    <div className="card col-span-1 lg:col-span-2 relative overflow-hidden h-[400px] p-0 flex flex-col group">
      
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Live Map</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-ring" style={{ background: "var(--brand-success)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--brand-success)" }}>2 Active</span>
          </div>
        </div>
        
        <button className="glass w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white transition-colors shadow-sm">
          <Navigation className="w-4 h-4" style={{ color: "var(--brand-primary)" }} />
        </button>
      </div>

      {/* Mock Map Background (Grid/Grid style) */}
      <div className="absolute inset-0 z-0 opacity-40 bg-grid" style={{ backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 z-0 bg-mesh opacity-60" />

      {/* Map Content SVG */}
      <div className="absolute inset-0 z-10">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Main Route Polyline */}
          <motion.path 
            d="M 150 300 Q 250 280, 350 200 T 650 100" 
            fill="none" 
            stroke="var(--brand-primary)" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="animate-draw-stroke opacity-60"
            style={{ strokeDasharray: 800, strokeDashoffset: 800 }}
          />

          {/* Pickup Marker */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <circle cx="150" cy="300" r="12" fill="var(--brand-primary)" className="opacity-20" />
            <circle cx="150" cy="300" r="6" fill="var(--brand-primary)" />
            <text x="150" y="325" fontSize="12" fontWeight="600" fill="var(--text-secondary)" textAnchor="middle">Mumbai</text>
          </motion.g>

          {/* Drop Marker */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 1 }}
          >
            <circle cx="650" cy="100" r="12" fill="var(--brand-secondary)" className="opacity-20" />
            <circle cx="650" cy="100" r="6" fill="var(--brand-secondary)" />
            <text x="650" y="125" fontSize="12" fontWeight="600" fill="var(--text-secondary)" textAnchor="middle">Pune</text>
          </motion.g>

          {/* Active Truck Marker */}
          <motion.g
            initial={{ scale: 0, x: 250, y: 250 }}
            animate={{ 
              scale: 1,
              x: [250, 450, 550], 
              y: [250, 150, 120] 
            }}
            transition={{ 
              scale: { delay: 1.5, type: "spring" },
              x: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" },
              y: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }
            }}
          >
            {/* Pulse Ring */}
            <circle cx="0" cy="0" r="20" fill="var(--brand-primary)" className="animate-pulse-ring" />
            
            {/* Driver Avatar Bubble */}
            <circle cx="0" cy="0" r="14" fill="#fff" stroke="var(--border-subtle)" strokeWidth="2" />
            <text x="0" y="4" fontSize="10" fontWeight="bold" fill="var(--brand-primary)" textAnchor="middle">🚛</text>
            
            {/* ETA Pill */}
            <rect x="-30" y="-35" width="60" height="20" rx="10" fill="var(--bg-primary)" stroke="var(--border-subtle)" />
            <text x="0" y="-21" fontSize="10" fontWeight="bold" fill="var(--text-primary)" textAnchor="middle">~45 min</text>
          </motion.g>
        </svg>
      </div>

    </div>
  );
}
