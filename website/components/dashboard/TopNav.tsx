"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bell, Search, MapPin } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  
  // Create breadcrumb from pathname
  const paths = pathname.split('/').filter(Boolean);
  const currentPath = paths[paths.length - 1] || 'overview';
  const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="sticky top-0 z-40 w-full glass" style={{ borderBottom: "1px solid var(--border-subtle)", borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <div className="h-16 px-6 flex items-center justify-between">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Dashboard</span>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>/</span>
          <motion.span 
            key={title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold" 
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </motion.span>
        </div>

        {/* Center: Live Weather Strip */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">Mumbai · 32°C · 🌧 Monsoon Surcharge Active</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input 
              type="text" 
              placeholder="Search (⌘K)" 
              className="pl-9 pr-4 py-2 text-sm rounded-full outline-none w-48 transition-all focus:w-64"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
            />
          </div>
          
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}>
            <Bell className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white"
              style={{ background: "var(--brand-secondary)" }}
            />
          </button>
        </div>

      </div>

      {/* Live Ticker Strip */}
      <div className="h-8 flex items-center overflow-hidden" style={{ background: "rgba(2, 89, 221, 0.05)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="whitespace-nowrap flex items-center animate-marquee text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> CH-0821 picked up in Mumbai</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> New driver Suresh online</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> ₹680 payment received</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> CH-0819 delivered</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> 15 new trucks added in Pune</span>
          {/* Duplicate for seamless loop */}
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> CH-0821 picked up in Mumbai</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> New driver Suresh online</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> ₹680 payment received</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> CH-0819 delivered</span>
          <span className="inline-block mx-4"><span style={{ color: "var(--brand-secondary)" }}>●</span> 15 new trucks added in Pune</span>
        </div>
      </div>
    </div>
  );
}
