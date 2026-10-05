import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [payees, setPayees] = useState([
    {
      id: 1,
      name: 'Desmond Mohan',
      accountType: 'Business Current Account',
      accountNumber: '35387104',
      sortCode: '990613',
      bic: 'IPBSIE2D',
      iban: 'IE49IPBS99061335387104',
      bank: 'IPBS',
    }
  ])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const verificationRestricted = false

  const user = {
    name: 'Mr Desmond Mohan',
    shortName: 'Mr Desmond',
    balance: 700000,
    accountNumber: '****  ****  ****  4821',
    sortCode: '90-22-47',
    iban: 'IE29 AIBK 9322 1412 3456 78',
  }

  const transactions = [
    {
      id: 1,
      description: 'Credit Transfer Received',
      amount: 700000,
      type: 'credit',
      currency: 'GBP',
      date: '2026-09-28T10:00:00.000Z',
      reference: 'GOVT/IEB/2025/001',
      from: 'Ireland Empowerment Benefit',
      to: 'Mr Desmond Mohan',
      status: 'completed',
    },
    {
      id: 2,
      description: 'Withdrawal to Mr Desmond',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-09-29T09:15:00.000Z',
      reference: 'WD/IEB/2026/001',
      from: 'Mr Desmond Mohan',
      to: 'Mr Desmond',
      status: 'completed',
    },
    {
      id: 3,
      description: 'Withdrawal to Mr Desmond',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-09-29T11:30:00.000Z',
      reference: 'WD/IEB/2026/002',
      from: 'Mr Desmond Mohan',
      to: 'Mr Desmond',
      status: 'completed',
    },
    {
      id: 4,
      description: 'Withdrawal Failed',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-09-29T14:00:00.000Z',
      reference: 'WD/IEB/2026/003',
      from: 'Mr Desmond Mohan',
      to: 'Mr Desmond',
      status: 'failed',
    },
    {
      id: 5,
      description: 'Withdrawal Failed',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-09-29T16:45:00.000Z',
      reference: 'WD/IEB/2026/004',
      from: 'Mr Desmond Mohan',
      to: 'Mr Desmond',
      status: 'failed',
    },
    {
      id: 6,
      description: 'Withdrawal Failed',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-10-01T09:30:00+01:00',
      reference: 'WD/IEB/2026/005',
      from: 'Mr Desmond Mohan',
      to: 'Desmond Mohan',
      status: 'failed',
      message: 'This withdrawal could not be completed.',
      payee: {
        name: 'Desmond Mohan',
        accountType: 'Business Current Account',
        accountNumber: '35387104',
        sortCode: '990613',
        bic: 'IPBSIE2D',
        iban: 'IE49IPBS99061335387104',
      },
    },
    {
      id: 7,
      description: 'Withdrawal Failed',
      amount: 10000,
      type: 'debit',
      currency: 'EUR',
      date: '2026-10-01T14:15:00+01:00',
      reference: 'WD/IEB/2026/006',
      from: 'Mr Desmond Mohan',
      to: 'Desmond Mohan',
      status: 'failed',
      message: 'This withdrawal could not be completed.',
      payee: {
        name: 'Desmond Mohan',
        accountType: 'Business Current Account',
        accountNumber: '35387104',
        sortCode: '990613',
        bic: 'IPBSIE2D',
        iban: 'IE49IPBS99061335387104',
      },
    },
  ]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const login = async (username, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    if (username.trim().toLowerCase() === 'mr desmond' && password === 'Demondireland') {
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password. Please try again.' }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const addPayee = (payee) => {
    const newPayee = { ...payee, id: Date.now() }
    setPayees(prev => [...prev, newPayee])
    addNotification('Payee added successfully', 'success')
    return newPayee
  }

  const addNotification = (message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }

  const submitWithdrawal = async () => {
    await new Promise(r => setTimeout(r, 1500))
    addNotification('Withdrawal request submitted', 'success')
    return { success: false, message: 'Please complete your profile to proceed' }
  }

  return (
    <AppContext.Provider value={{
      isAuthenticated, user, transactions, payees,
      notifications, loading, darkMode, verificationRestricted,
      login, logout, addPayee, addNotification, submitWithdrawal,
      toggleDarkMode: () => setDarkMode(d => !d),
    }}>
      {children}
    </AppContext.Provider>
  )
}
