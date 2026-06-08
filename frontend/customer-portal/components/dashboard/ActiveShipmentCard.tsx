"use client";

import { motion } from "framer-motion";
import { Phone, Navigation, ArrowRight } from "lucide-react";

interface Driver {
  name: string;
  rating: number;
  phone: string;
}

interface ShipmentProps {
  id: string;
  status: string;
  pickup: string;
  drop: string;
  vehicle: string;
  driver: Driver;
  eta: string;
  progress: number;
}

function ShipmentRow({ shipment }: { shipment: ShipmentProps }) {
  return (
    <div className="p-4 rounded-xl mb-4 bg-white border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-gray-900">{shipment.id}</span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-sm font-medium text-gray-600">{shipment.vehicle}</span>
        </div>
        <div className="badge" style={{ 
          background: "rgba(255, 102, 72, 0.1)", 
          color: "var(--brand-secondary)",
          border: "1px solid rgba(255, 102, 72, 0.2)"
        }}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse-ring bg-current" />
          {shipment.status}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
        <span>{shipment.pickup}</span>
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <span>{shipment.drop}</span>
      </div>

      {/* Animated Progress Bar */}
      <div className="relative h-1 bg-gray-100 rounded-full mb-5 mt-2">
        <div className="absolute left-0 top-0 bottom-0 bg-gray-200 rounded-full w-full overflow-hidden">
          {/* Dashed line background */}
          <div className="w-[200%] h-full flex" style={{ 
            backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(2, 89, 221, 0.1) 50%)",
            backgroundSize: "20px 100%"
          }} />
        </div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${shipment.progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-0 top-0 bottom-0 rounded-full relative"
          style={{ background: "var(--brand-primary)" }}
        >
          {/* Moving Truck Icon on the progress bar */}
          <motion.div 
            className="absolute -right-3 -top-3 w-6 h-6 flex items-center justify-center text-lg"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            🚚
          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">
            {shipment.driver.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">{shipment.driver.name} <span className="text-yellow-500">★ {shipment.driver.rating}</span></p>
            <p className="text-[11px] text-gray-500">ETA: {shipment.eta}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <a href={`/dashboard/track?id=${shipment.id}`} className="p-2 rounded-lg text-white transition-colors" style={{ background: "var(--brand-primary)" }}>
            <Navigation className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ActiveShipmentCard({ shipments }: { shipments: ShipmentProps[] }) {
  return (
    <div className="card col-span-1 bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>Active Shipments</h2>
        <a href="/dashboard/orders" className="text-sm font-semibold hover:underline" style={{ color: "var(--brand-primary)" }}>View All</a>
      </div>
      
      {shipments.length > 0 ? (
        <div className="flex flex-col">
          {shipments.map(s => <ShipmentRow key={s.id} shipment={s} />)}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">No active shipments.</p>
        </div>
      )}
    </div>
  );
}
