import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import IrelandFlag from '../components/IrelandFlag'

export default function DebitCard() {
  const { user, addNotification } = useApp()
  const navigate = useNavigate()
  const [cardBalance, setCardBalance] = useState(0)
  const [showTopUp, setShowTopUp] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleTopUp = (e) => {
    e.preventDefault()
    const amount = parseFloat(topUpAmount)
    if (!amount || amount <= 0) {
      addNotification('Enter a valid amount', 'error')
      return
    }
    setCardBalance(prev => prev + amount)
    addNotification(`£${amount.toLocaleString('en-GB')} added to your Mastercard`, 'success')
    setTopUpAmount('')
    setShowTopUp(false)
  }

  const handleDeleteCard = () => {
    setShowDeleteConfirm(false)
    addNotification('Please contact support to delete your card', 'info')
    navigate('/support')
  }

  const actions = [
    {
      label: 'Add Money to Card',
      sublabel: 'Top up',
      onClick: () => setShowTopUp(true),
      color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      label: 'Withdraw',
      sublabel: 'From card',
      onClick: () => navigate('/withdraw'),
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      label: 'Delete Card',
      sublabel: 'Remove card',
      onClick: () => setShowDeleteConfirm(true),
      color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    },
  ]

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Mastercard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your IEB Mastercard is active</p>
      </div>

      <div className="bank-card-gradient rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <IrelandFlag size={28} />
              <span className="font-display font-bold text-sm">IEB</span>
            </div>
            <span className="font-display font-bold text-sm tracking-wide">Mastercard</span>
          </div>
          <div className="mb-4">
            <p className="text-white/50 text-xs mb-1">Card Balance</p>
            <p className="font-display text-3xl font-bold">£{cardBalance.toLocaleString('en-GB')}</p>
          </div>
          <div className="mb-6">
            <p className="font-mono text-lg tracking-[0.2em] font-medium">**** **** **** 4821</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs mb-1">Card Holder</p>
              <p className="font-semibold text-sm">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Status</p>
              <span className="bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white/10" />
              <div className="w-10 h-10 bg-orange-400 rounded-full border-2 border-white/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-display font-semibold text-gray-900 dark:text-white">Mastercard is active</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your card is linked to your IEB account and ready to use.</p>
          </div>
        </div>
      </div>

      <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-3">Card Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {actions.map(action => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${action.color} transition-all duration-200 hover:scale-[1.02] active:scale-95`}
          >
            {action.icon}
            <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
            <span className="text-[10px] opacity-70">{action.sublabel}</span>
          </button>
        ))}
      </div>

      {showTopUp && (
        <div className="card p-6 mb-4 animate-slide-up">
          <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Top Up Mastercard</h3>
          <form onSubmit={handleTopUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount (£)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={topUpAmount}
                onChange={e => setTopUpAmount(e.target.value)}
                placeholder="0.00"
                className="input-field w-full"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowTopUp(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1">
                Add Money
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="card p-6 max-w-sm w-full animate-slide-up">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">Delete Mastercard?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              To delete your card, you will be directed to support to complete this request.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowDeleteConfirm(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button type="button" onClick={handleDeleteCard} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors">
                Delete Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
