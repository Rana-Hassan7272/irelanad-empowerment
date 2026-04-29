import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import IrelandFlag from '../components/IrelandFlag'

export default function DebitCard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)

  const handleApply = () => {
    setShowMessage(true)
  }

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Debit Card</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your IEB debit card</p>
      </div>

      {/* Card preview */}
      <div className="bank-card-gradient rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <IrelandFlag size={28} />
              <span className="font-display font-bold text-sm">IEB</span>
            </div>
            <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center">
              <div className="w-6 h-4 border-2 border-yellow-700/30 rounded-sm" />
            </div>
          </div>
          <div className="mb-6">
            <p className="font-mono text-lg tracking-[0.2em] font-medium">**** **** **** ••••</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs mb-1">Card Holder</p>
              <p className="font-semibold text-sm">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Status</p>
              <span className="bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                Not Issued
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-red-500/80 rounded-full border-2 border-white/10" />
              <div className="w-10 h-10 bg-orange-400/80 rounded-full border-2 border-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Apply section */}
      <div className="card p-6 mb-4">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display font-semibold text-gray-900 dark:text-white">IEB Visa Debit Card</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get a contactless Visa debit card linked to your IEB account. Use it anywhere Visa is accepted worldwide.</p>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          {['No annual fee', 'Contactless payments', 'Apple Pay & Google Pay ready', 'Worldwide acceptance'].map(f => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {f}
            </div>
          ))}
        </div>

        {showMessage ? (
          <div className="animate-fade-in space-y-3">
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-4">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Contact Support Required</p>
                <p className="text-amber-700 dark:text-amber-400 text-sm mt-0.5">To proceed, please contact support to complete your card application.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/support')}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Go to Support
            </button>
          </div>
        ) : (
          <button
            onClick={handleApply}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Apply for Debit Card
          </button>
        )}
      </div>
    </div>
  )
}
