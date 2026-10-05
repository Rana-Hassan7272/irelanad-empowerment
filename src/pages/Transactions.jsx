import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Transactions() {
  const { transactions, user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (location.state?.txId) {
      setSelectedId(location.state.txId)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }
  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }
  const formatAmount = (tx) => {
    const symbol = tx.currency === 'EUR' ? '€' : '£'
    return `${symbol}${tx.amount.toLocaleString('en-GB')}`
  }
  const statusClass = (status) => {
    if (status === 'completed') return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
    if (status === 'failed') return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
  }
  const totalOut = transactions
    .filter(tx => tx.type === 'debit' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
  const selected = sorted.find(tx => tx.id === selectedId)

  if (selected) {
    const symbol = selected.currency === 'EUR' ? '€' : '£'
    return (
      <div className="animate-fade-in max-w-2xl">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to history
        </button>

        <div className="card p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Withdrawal</p>
              <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">{selected.description}</h1>
              <p className="text-xs text-gray-400 mt-1">Ref: {selected.reference}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusClass(selected.status)}`}>
              {selected.status}
            </span>
          </div>

          <div className={`text-center py-5 rounded-2xl mb-5 ${
            selected.status === 'failed'
              ? 'bg-gray-50 dark:bg-gray-700/30'
              : selected.type === 'credit'
                ? 'bg-emerald-50 dark:bg-emerald-900/20'
                : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            <p className={`font-display text-3xl font-bold ${
              selected.status === 'failed'
                ? 'text-gray-400 line-through'
                : selected.type === 'credit'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-500'
            }`}>
              {selected.type === 'credit' ? '+' : '-'}{symbol}{selected.amount.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Date</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(selected.date)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{formatTime(selected.date)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">From</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{selected.from}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">To</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{selected.to || user.name}</span>
            </div>
          </div>

          {selected.message && (
            <div className={`flex items-start gap-3 rounded-2xl p-4 mb-5 border ${
              selected.status === 'failed'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
            }`}>
              <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selected.status === 'failed' ? 'text-red-500' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selected.status === 'failed' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'} />
              </svg>
              <div>
                <p className={`font-semibold text-sm ${selected.status === 'failed' ? 'text-red-800 dark:text-red-300' : 'text-amber-800 dark:text-amber-300'}`}>
                  {selected.status === 'failed' ? 'Withdrawal Failed' : 'Payment Processing'}
                </p>
                <p className={`text-sm mt-0.5 ${selected.status === 'failed' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>{selected.message}</p>
              </div>
            </div>
          )}

          {selected.payee && (
            <div className="border-t border-gray-100 dark:border-gray-700/50 pt-5">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Recipient Account Details</p>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'Account Holder Name', value: selected.payee.name },
                  { label: 'Account Type', value: selected.payee.accountType },
                  { label: 'Account Number', value: selected.payee.accountNumber, mono: true },
                  { label: 'Bank Sort Code', value: selected.payee.sortCode, mono: true },
                  { label: 'Bank ID (BIC)', value: selected.payee.bic, mono: true },
                  { label: 'IBAN', value: selected.payee.iban, mono: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between gap-3">
                    <span className="text-gray-400 flex-shrink-0">{row.label}</span>
                    <span className={`font-semibold text-gray-800 dark:text-gray-200 text-right ${row.mono ? 'font-mono text-xs sm:text-sm break-all' : ''}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">All activity on your account</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total In', value: `£${user.balance.toLocaleString('en-GB')}`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Total Out', value: `€${totalOut.toLocaleString('en-GB')}`, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Transactions', value: transactions.length.toString(), color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        ].map(s => (
          <div key={s.label} className={`card p-4 ${s.bg} border-0`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className={`font-display font-bold text-lg ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">All Transactions</span>
          <span className="text-xs text-gray-400">{transactions.length} record{transactions.length !== 1 ? 's' : ''}</span>
        </div>

        {sorted.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-700/30">
            {sorted.map((tx) => (
              <button
                key={tx.id}
                type="button"
                onClick={() => setSelectedId(tx.id)}
                className="w-full text-left px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    tx.status === 'failed'
                      ? 'bg-gray-100 dark:bg-gray-700/50'
                      : tx.status === 'processing'
                        ? 'bg-amber-100 dark:bg-amber-900/40'
                        : tx.type === 'credit'
                          ? 'bg-emerald-100 dark:bg-emerald-900/40'
                          : 'bg-red-100 dark:bg-red-900/40'
                  }`}>
                    {tx.type === 'credit' ? (
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    ) : (
                      <svg className={`w-5 h-5 ${
                        tx.status === 'failed' ? 'text-gray-400' : tx.status === 'processing' ? 'text-amber-600 dark:text-amber-400' : 'text-red-500'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(tx.date)}</p>
                      <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatTime(tx.date)}</p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Ref: {tx.reference}</p>
                  </div>

                  <div className="text-right flex-shrink-0 flex items-center gap-2">
                    <div>
                      <p className={`font-bold text-sm ${
                        tx.status === 'failed'
                          ? 'text-gray-400 line-through'
                          : tx.status === 'processing'
                            ? 'text-amber-600 dark:text-amber-400'
                            : tx.type === 'credit'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-500'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'}{formatAmount(tx)}
                      </p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium capitalize ${statusClass(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
