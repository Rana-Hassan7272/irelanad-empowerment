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

export default function Payees() {
  const { payees, addPayee } = useApp()
  const [form, setForm] = useState({ name: '', accountNumber: '', bank: '', customBank: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showForm, setShowForm] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Payee name is required'
    if (!form.accountNumber.trim()) e.accountNumber = 'Account number is required'
    if (!form.bank) e.bank = 'Please select a bank'
    if (form.bank === 'Other / Custom Bank' && !form.customBank.trim()) e.customBank = 'Please enter bank name'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    addPayee({
      name: form.name,
      accountNumber: form.accountNumber,
      bank: form.bank === 'Other / Custom Bank' ? form.customBank : form.bank,
    })
    setForm({ name: '', accountNumber: '', bank: '', customBank: '' })
    setErrors({})
    setLoading(false)
    setShowForm(false)
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const initials = name => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const bankColors = ['bg-emerald-100 text-emerald-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700', 'bg-pink-100 text-pink-700']

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Payees</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your saved payees</p>
        </div>
        <button
          onClick={() => setShowForm(s => !s)}
          className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Payee
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6 animate-slide-up">
          <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4">New Payee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input name="name" value={form.name} onChange={handleChange} className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="e.g. John Murphy" disabled={loading} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Account Number <span className="text-red-400">*</span></label>
              <input name="accountNumber" value={form.accountNumber} onChange={handleChange} className={`input-field ${errors.accountNumber ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="Enter account number" maxLength={20} disabled={loading} />
              {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bank <span className="text-red-400">*</span></label>
              <select name="bank" value={form.bank} onChange={handleChange} className={`input-field ${errors.bank ? 'border-red-400 focus:ring-red-400' : ''}`} disabled={loading}>
                <option value="">Select a bank...</option>
                {UK_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.bank && <p className="text-red-500 text-xs mt-1">{errors.bank}</p>}
            </div>
            {form.bank === 'Other / Custom Bank' && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bank Name <span className="text-red-400">*</span></label>
                <input name="customBank" value={form.customBank} onChange={handleChange} className={`input-field ${errors.customBank ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="Enter bank name" disabled={loading} />
                {errors.customBank && <p className="text-red-500 text-xs mt-1">{errors.customBank}</p>}
              </div>
            )}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5">
                {loading ? <><Spinner size="sm" color="white" /><span>Saving...</span></> : 'Save Payee'}
              </button>
            </div>
          </form>
        </div>
      )}

      {payees.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">No payees yet</p>
          <p className="text-sm text-gray-400 mt-1">Add your first payee to get started</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-700/50">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{payees.length} saved payee{payees.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {payees.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                <div className={`w-10 h-10 ${bankColors[i % bankColors.length]} dark:opacity-80 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                  {initials(p.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{p.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{p.bank} · {p.accountNumber}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
