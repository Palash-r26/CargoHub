"use client";

import { motion } from "framer-motion";
import { HeadphonesIcon, MessageSquare, Phone, Mail, FileText, ChevronRight } from "lucide-react";

const faqs = [
  { q: "How do I track my shipment?", a: "You can track your shipment by entering the Order ID in the Track Shipment page or from your Orders list." },
  { q: "What are the cancellation charges?", a: "Cancellations made within 1 hour of booking are free. After that, a 10% fee is applied." },
  { q: "How do I add money to my Wallet?", a: "Go to the Payments page and click 'Add Funds'. You can pay via UPI, Credit Card, or Net Banking." },
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Support</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>We're here to help. Get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Options */}
        <div className="col-span-1 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="feature-card group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Typical reply in 5 mins</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="feature-card group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>+91 1800 123 4567</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="feature-card group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>support@cargohub.in</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Create Ticket & FAQs */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: "var(--brand-primary)" }} /> Raise a Ticket
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Order ID (Optional)</label>
                  <input type="text" className="input-field py-2" placeholder="e.g. CH-0821" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Issue Type</label>
                  <select className="input-field py-2 appearance-none">
                    <option>Delay in Delivery</option>
                    <option>Payment Issue</option>
                    <option>Vehicle Condition</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
                <textarea className="input-field py-2 h-24 resize-none" placeholder="Describe your issue..."></textarea>
              </div>
              <button className="btn-primary w-full">Submit Ticket</button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{faq.q}</h4>
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
