"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, PackagePlus, MapPin, ClipboardList, 
  Wallet, Star, HeadphonesIcon, Settings, LogOut 
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: PackagePlus, label: "New Booking", route: "/dashboard/book" },
  { icon: MapPin, label: "Track Shipment", route: "/dashboard/track" },
  { icon: ClipboardList, label: "My Orders", route: "/dashboard/orders" },
  { icon: Wallet, label: "Payments", route: "/dashboard/payments" },
  { icon: Star, label: "Saved Addresses", route: "/dashboard/addresses" },
  { icon: HeadphonesIcon, label: "Support", route: "/dashboard/support" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] glass z-50 flex flex-col" style={{ 
      background: "var(--bg-primary)",
      borderRight: "1px solid var(--border-subtle)" 
    }}>
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm" style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))" }}>
            🚛
          </div>
          <span className="font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            CargoHub
          </span>
        </motion.div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link key={item.route} href={item.route}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden"
                style={{
                  background: isActive ? "rgba(2, 89, 221, 0.08)" : "transparent",
                  color: isActive ? "var(--brand-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ background: "var(--brand-secondary)" }}
                  />
                )}
                <item.icon className="w-5 h-5" style={{ color: isActive ? "var(--brand-primary)" : "var(--text-muted)" }} />
                <span className="text-sm">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Stats / User */}
      <div className="p-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mb-4 p-3 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Wallet</span>
            <span className="text-xs font-bold" style={{ color: "var(--brand-primary)" }}>₹250</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Active</span>
            <span className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--brand-secondary)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-ring" style={{ background: "var(--brand-secondary)" }}></span>
              2 bookings
            </span>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl transition-colors hover:bg-gray-50" style={{ color: "var(--text-secondary)" }}>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs" style={{ color: "var(--brand-primary)" }}>R</div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Rahul K.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Customer</p>
          </div>
          <LogOut className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
        </button>
      </div>
    </aside>
  );
}
