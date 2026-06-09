"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Key, Moon, Globe } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage your profile, notifications, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav for Settings */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-semibold text-sm">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 font-medium text-sm transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 font-medium text-sm transition-colors">
            <Shield className="w-4 h-4" /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-2xl" style={{ color: "var(--brand-primary)" }}>
                RK
              </div>
              <div>
                <button className="btn-secondary text-xs py-1.5 px-4">Change Avatar</button>
                <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>First Name</label>
                  <input type="text" className="input-field py-2" defaultValue="Rahul" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Last Name</label>
                  <input type="text" className="input-field py-2" defaultValue="K." />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Email Address</label>
                  <input type="email" className="input-field py-2" defaultValue="rahul@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Phone Number</label>
                  <input type="tel" className="input-field py-2" defaultValue="+91 98765 43210" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button className="btn-primary">Save Changes</button>
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="font-semibold text-lg mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Language</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Select your preferred language</p>
                  </div>
                </div>
                <select className="input-field py-1 px-3 w-auto text-sm bg-transparent border-none">
                  <option>English (IN)</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Moon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Dark Mode</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Toggle dark appearance</p>
                  </div>
                </div>
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`w-11 h-6 rounded-full relative transition-colors ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
