import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Settings() {
  const { user, darkMode, toggleDarkMode } = useApp()
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <div className="card p-6 mb-4">
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase tracking-wide">Profile</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account Holder · IEB Banking</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Full Name', value: user.name },
            { label: 'Account Number', value: user.accountNumber },
            { label: 'Sort Code', value: user.sortCode },
            { label: 'IBAN', value: user.iban },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <div className="input-field bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-500 dark:text-gray-400 text-sm">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="card p-6 mb-4">
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase tracking-wide">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              {darkMode ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-xs text-gray-400">{darkMode ? 'Currently enabled' : 'Currently disabled'}</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${darkMode ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6 mb-4">
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase tracking-wide">Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive alerts via email' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Text messages for transactions' },
            { key: 'push', label: 'Push Notifications', desc: 'In-app notifications' },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.label}</p>
                <p className="text-xs text-gray-400">{n.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${notifications[n.key] ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${notifications[n.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card p-6 mb-6">
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase tracking-wide">Security</h2>
        <div className="space-y-3">
          {[
            { label: 'Two-Factor Authentication', status: 'Enabled', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
            { label: 'Biometric Login', status: 'Available', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
            { label: 'Login Alerts', status: 'On', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </>
        ) : 'Save Preferences'}
      </button>
    </div>
  )
}
