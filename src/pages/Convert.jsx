import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const CURRENCIES = [
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
]

const RATES_FROM_GBP = {
  GBP: 1,
  EUR: 1.17,
  USD: 1.27,
  CHF: 1.12,
  CAD: 1.74,
  AUD: 1.95,
  JPY: 199.5,
  NGN: 1980,
}

function convertAmount(amount, from, to) {
  const inGbp = amount / RATES_FROM_GBP[from]
  return inGbp * RATES_FROM_GBP[to]
}

export default function Convert() {
  const { addNotification } = useApp()
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState(null)
  const [eurUnlocked, setEurUnlocked] = useState(false)

  const isGbpToEur = fromCurrency === 'GBP' && toCurrency === 'EUR'
  const isLocked = isGbpToEur && !eurUnlocked

  const fromMeta = CURRENCIES.find(c => c.code === fromCurrency)
  const toMeta = CURRENCIES.find(c => c.code === toCurrency)

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  const handleUnlock = () => {
    setEurUnlocked(true)
    addNotification('GBP to EUR conversion unlocked', 'success')
  }

  const handleConvert = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!value || value <= 0) {
      addNotification('Enter a valid amount', 'error')
      return
    }
    if (isLocked) return

    const converted = convertAmount(value, fromCurrency, toCurrency)
    setResult({
      input: value,
      output: converted,
      rate: RATES_FROM_GBP[toCurrency] / RATES_FROM_GBP[fromCurrency],
    })
  }

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Currency Converter</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Convert between pounds and other currencies</p>
      </div>

      <form onSubmit={handleConvert} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{fromMeta.symbol}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => { setAmount(e.target.value); setResult(null) }}
              placeholder="0.00"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">From</label>
            <select
              value={fromCurrency}
              onChange={e => { setFromCurrency(e.target.value); setResult(null) }}
              className="input-field"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="btn-secondary p-3 sm:mb-0 mb-1 self-end sm:self-auto"
            aria-label="Swap currencies"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">To</label>
            <select
              value={toCurrency}
              onChange={e => { setToCurrency(e.target.value); setResult(null) }}
              className="input-field"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {isLocked && (
          <div className="rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-5 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-display font-semibold text-amber-900 dark:text-amber-200">GBP to EUR is locked</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1 mb-4">Unlock this conversion to continue</p>
            <button
              type="button"
              onClick={handleUnlock}
              className="btn-primary w-full sm:w-auto px-8"
            >
              Unlock 🔓
            </button>
          </div>
        )}

        {isGbpToEur && eurUnlocked && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl px-4 py-3">
            <span>🔓</span>
            <span className="font-medium">GBP to EUR conversion unlocked</span>
          </div>
        )}

        <button type="submit" disabled={isLocked} className="btn-primary w-full">
          Convert
        </button>
      </form>

      {result && !isLocked && (
        <div className="card p-6 mt-4 animate-slide-up">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Converted amount</p>
          <p className="font-display text-3xl font-bold text-gray-900 dark:text-white">
            {toMeta.symbol}{result.output.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {fromMeta.symbol}{result.input.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency} = {toMeta.symbol}{result.output.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Rate: 1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  )
}
