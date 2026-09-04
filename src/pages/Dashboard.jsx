import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import IrelandFlag from '../components/IrelandFlag'

function getTimeGreeting(timeZone = 'Europe/Dublin') {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: 'numeric',
      hour12: false,
    }).format(new Date())
  )
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}

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
  const { user, transactions, verificationRestricted } = useApp()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState(() => getTimeGreeting())

  useEffect(() => {
    const updateGreeting = () => setGreeting(getTimeGreeting())
    updateGreeting()
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

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
      label: 'Convert', to: '/convert', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">Good {greeting},</p>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">{user.shortName}</h1>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-3 py-2 shadow-sm">
          <IrelandFlag size={24} />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 hidden sm:block">IEB Banking</span>
        </div>
      </div>

      {verificationRestricted && (
        <div className="flex items-center gap-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl p-4 shadow-sm">
          <div className="w-11 h-11 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-800 dark:text-red-300 text-sm">Account Restricted</p>
            <p className="text-red-700 dark:text-red-400 text-sm mt-0.5">Complete the verification</p>
          </div>
          <button
            onClick={() => navigate('/support')}
            className="flex-shrink-0 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wide"
          >
            FIX NOW
          </button>
        </div>
      )}

      {/* Balance Card */}
      <div className="bank-card-gradient rounded-3xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-12 w-20 h-20 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <p className="text-emerald-200/80 text-xs font-medium uppercase tracking-widest mb-1">Total Balance</p>
              <div className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${verificationRestricted ? 'opacity-50' : ''}`}>
                <AnimatedBalance value={user.balance} />
              </div>
              {verificationRestricted && (
                <div className="mt-3 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 rounded-lg px-2.5 py-1">
                    <svg className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-amber-200 text-xs font-semibold">Funds on Hold</span>
                  </div>
                  <p className="text-white/60 text-xs">
                    Available: <span className="text-white font-semibold">£0.00</span>
                    <span className="mx-1.5">·</span>
                    Held: <span className="text-amber-300 font-semibold">£{user.balance.toLocaleString('en-GB')}</span>
                  </p>
                </div>
              )}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            { label: 'Account Status', value: verificationRestricted ? 'Restricted' : 'Active', badge: true, restricted: verificationRestricted },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              {item.badge ? (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  item.restricted
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                }`}>
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
