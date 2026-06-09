"use client";

import { motion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Building } from "lucide-react";

const addresses = [
  { id: 1, title: "Home", type: "Home", address: "A-204, Lodha Bellissimo, N.M. Joshi Marg", city: "Mumbai", state: "Maharashtra", pin: "400011", icon: Home, isDefault: true },
  { id: 2, title: "Office", type: "Office", address: "WeWork Galaxy, 43 Residency Road", city: "Bangalore", state: "Karnataka", pin: "560025", icon: Briefcase, isDefault: false },
  { id: 3, title: "Warehouse", type: "Warehouse", address: "Plot No. 45, MIDC Industrial Area", city: "Pune", state: "Maharashtra", pin: "411026", icon: Building, isDefault: false },
];

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Saved Addresses</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage your pickup and drop-off locations.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr, i) => (
          <motion.div 
            key={addr.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="card card-hover relative group"
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-md" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#059669" }}>
                Default
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(2, 89, 221, 0.08)", color: "var(--brand-primary)" }}>
                <addr.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{addr.title}</h3>
            </div>
            <div className="space-y-1 mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
              <p>{addr.address}</p>
              <p>{addr.city}, {addr.state} {addr.pin}</p>
            </div>
            <div className="flex gap-2 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <button className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1">
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button className="flex-1 text-xs py-2 flex items-center justify-center gap-1 rounded-full transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-900/30">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: addresses.length * 0.1 }}
          className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-brand-primary"
          style={{ borderColor: "var(--border-active)", background: "rgba(2, 89, 221, 0.02)" }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(2, 89, 221, 0.1)", color: "var(--brand-primary)" }}>
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium" style={{ color: "var(--brand-primary)" }}>Add New Address</span>
        </motion.div>
      </div>
    </div>
  );
}
