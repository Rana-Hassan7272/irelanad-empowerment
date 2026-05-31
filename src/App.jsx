import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Withdraw from './pages/Withdraw'
import Payees from './pages/Payees'
import DebitCard from './pages/DebitCard'
import Support from './pages/Support'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'
import Notifications from './components/Notifications'
import Layout from './components/Layout'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useApp()
  return (
    <>
      <Notifications />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="payees" element={<Payees />} />
          <Route path="debit-card" element={<DebitCard />} />
          <Route path="support" element={<Support />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
