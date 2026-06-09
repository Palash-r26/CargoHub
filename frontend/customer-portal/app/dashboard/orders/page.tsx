"use client";

import { motion } from "framer-motion";
import { Package, Search, ExternalLink, Calendar, MapPin, CheckCircle2, Clock, Truck } from "lucide-react";

const orders = [
  { id: "CH-0821", date: "Today, 10:30 AM", status: "In Transit", from: "Mumbai", to: "Pune", amount: "₹1,250", type: "Tata Ace" },
  { id: "CH-0819", date: "Yesterday", status: "Delivered", from: "Delhi", to: "Jaipur", amount: "₹4,500", type: "14ft Truck" },
  { id: "CH-0815", date: "05 Jun 2026", status: "Pending", from: "Bangalore", to: "Chennai", amount: "₹3,200", type: "8ft Pickup" },
  { id: "CH-0801", date: "01 Jun 2026", status: "Delivered", from: "Ahmedabad", to: "Surat", amount: "₹950", type: "Tata Ace" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">My Orders</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>View and manage all your past and current shipments.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input 
              type="text" 
              placeholder="Search order ID..." 
              className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm rounded-xl outline-none transition-all focus:ring-2"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
            />
          </div>
          <button className="btn-secondary whitespace-nowrap">Filter</button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-0 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Route</th>
                <th>Vehicle Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(2, 89, 221, 0.08)" }}>
                        <Package className="w-5 h-5" style={{ color: "var(--brand-primary)" }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{order.id}</p>
                        <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                          <Calendar className="w-3 h-3" /> {order.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.from}</span>
                      <div className="w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
                      <span className="font-medium">{order.to}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <Truck className="w-4 h-4" /> {order.type}
                    </div>
                  </td>
                  <td className="font-mono font-semibold">{order.amount}</td>
                  <td>
                    {order.status === "Delivered" && <span className="badge badge-delivered"><CheckCircle2 className="w-3 h-3" /> Delivered</span>}
                    {order.status === "In Transit" && <span className="badge badge-transit"><Truck className="w-3 h-3" /> In Transit</span>}
                    {order.status === "Pending" && <span className="badge badge-pending"><Clock className="w-3 h-3" /> Pending</span>}
                  </td>
                  <td className="text-right">
                    <button className="btn-icon">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
