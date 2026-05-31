import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import IrelandFlag from '../components/IrelandFlag'

function AnimatedBalance({ value }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    let start = 0
    const end = value
    const duration = 1500
    const stepTime = 16
    const steps = duration / stepTime
    const increment = end / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayed(end)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [value])
  return (
    <span>
      £{displayed.toLocaleString('en-GB')}
    </span>
  )
}

export default function Dashboard() {
  const { user, transactions } = useApp()
  const navigate = useNavigate()
  const now = new Date()

  const quickActions = [
    {
      label: 'Withdraw', to: '/withdraw', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      label: 'Add Payee', to: '/payees', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      label: 'Mastercard', to: '/debit-card', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      label: 'Support', to: '/support', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Good {now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'},</p>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">{user.shortName}</h1>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-3 py-2 shadow-sm">
          <IrelandFlag size={24} />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 hidden sm:block">IEB Banking</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bank-card-gradient rounded-3xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-12 w-20 h-20 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-emerald-200/80 text-xs font-medium uppercase tracking-widest mb-1">Total Balance</p>
              <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                <AnimatedBalance value={user.balance} />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
              <IrelandFlag size={36} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs mb-1">Account Name</p>
              <p className="text-white font-semibold text-sm">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Sort Code</p>
              <p className="text-white font-semibold text-sm">{user.sortCode}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs mb-1">Account Number</p>
              <p className="text-white font-mono font-semibold tracking-widest text-sm">{user.accountNumber}</p>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-red-500/80 rounded-full" />
              <div className="w-8 h-8 bg-orange-400/80 rounded-full -ml-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border ${action.color} transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md`}
            >
              {action.icon}
              <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4">Account Information</h2>
        <div className="space-y-3">
          {[
            { label: 'Account Holder', value: user.name },
            { label: 'IBAN', value: user.iban },
            { label: 'Sort Code', value: user.sortCode },
            { label: 'Bank', value: 'Ireland Empowerment Benefit' },
            { label: 'Account Status', value: 'Active', badge: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              {item.badge ? (
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {item.value}
                </span>
              ) : (
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200">Recent Transactions</h2>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
            {transactions.length} transaction
          </span>
        </div>
        <div className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{tx.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{tx.reference} · {new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+£{tx.amount.toLocaleString('en-GB')}</p>
                <p className="text-xs text-gray-400 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
