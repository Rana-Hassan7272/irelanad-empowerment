import React from 'react'
import { useApp } from '../context/AppContext'

export default function Transactions() {
  const { transactions, user } = useApp()

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }
  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">All activity on your account</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total In', value: `£${user.balance.toLocaleString('en-GB')}`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Total Out', value: '£0.00', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
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

        {transactions.length === 0 ? (
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
            {transactions.map((tx) => (
              <div key={tx.id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
                    {tx.type === 'credit' ? (
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {tx.type === 'credit' ? '+' : '-'}£{tx.amount.toLocaleString('en-GB')}
                    </p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${
                      tx.status === 'completed'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>

                {/* Expanded detail row */}
                <div className="mt-3 ml-15 pl-15 hidden group-hover:grid grid-cols-2 gap-2 ml-[60px]">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">From</p>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{tx.from}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">To</p>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
