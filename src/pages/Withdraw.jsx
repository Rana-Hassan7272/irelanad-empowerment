import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Spinner from '../components/Spinner'

const UK_BANKS = [
  'Permanent TSB (PTSB)',
  'Barclays',
  'HSBC',
  'Lloyds Bank',
  'NatWest',
  'Santander UK',
  'Halifax',
  'Nationwide Building Society',
  'Royal Bank of Scotland',
  'TSB Bank',
  'Metro Bank',
  'Monzo',
  'Starling Bank',
  'Virgin Money',
  'Co-operative Bank',
  'Other / Custom Bank',
]

export default function Withdraw() {
  const { submitWithdrawal, user } = useApp()
  const [form, setForm] = useState({ amount: '', accountNumber: '', bankName: '', customBank: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrorMsg('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.amount || !form.accountNumber || !form.bankName) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    if (form.bankName === 'Other / Custom Bank' && !form.customBank.trim()) {
      setErrorMsg('Please enter your bank name.')
      return
    }
    setLoading(true)
    const result = await submitWithdrawal(form)
    setLoading(false)
    setErrorMsg(result.message)
    setSubmitted(true)
  }

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Withdraw Funds</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Transfer money from your account</p>
      </div>

      {/* Balance reminder */}
      <div className="card p-4 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Available Balance</p>
          <p className="font-display font-bold text-lg text-gray-900 dark:text-white">£{user.balance.toLocaleString('en-GB')}</p>
        </div>
      </div>

      {submitted && errorMsg && (
        <div className="mb-5 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 animate-fade-in">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Action Required</p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Amount (£) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">£</span>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="input-field pl-8"
                placeholder="0.00"
                min="1"
                step="0.01"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Account Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter account number"
              maxLength={20}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Bank Name <span className="text-red-400">*</span>
            </label>
            <select
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
            >
              <option value="">Select a bank...</option>
              {UK_BANKS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {form.bankName === 'Other / Custom Bank' && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Enter Bank Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="customBank"
                value={form.customBank}
                onChange={handleChange}
                className="input-field"
                placeholder="Type your bank name"
                disabled={loading}
              />
            </div>
          )}

          {errorMsg && !submitted && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="white" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Submit Withdrawal</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 justify-center">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        All transactions are encrypted and secure
      </div>
    </div>
  )
}
