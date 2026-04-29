import React from 'react'

export default function Spinner({ size = 'md', color = 'emerald' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  const colors = {
    emerald: 'border-emerald-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  }
  return (
    <div className={`${sizes[size]} border-2 ${colors[color]} rounded-full animate-spin`} />
  )
}
