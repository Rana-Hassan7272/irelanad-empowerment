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
    { id: 1, name: 'John Murphy', accountNumber: '12345678', bank: 'Permanent TSB (PTSB)' }
  ])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

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
      date: new Date().toISOString(),
      reference: 'GOVT/IEB/2025/001',
      from: 'Ireland Empowerment Benefit',
      status: 'completed',
    }
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
      notifications, loading, darkMode,
      login, logout, addPayee, addNotification, submitWithdrawal,
      toggleDarkMode: () => setDarkMode(d => !d),
    }}>
      {children}
    </AppContext.Provider>
  )
}
