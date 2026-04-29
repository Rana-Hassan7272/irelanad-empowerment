import React from 'react'

export default function IrelandFlag({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 0.67}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-sm ${className}`}
    >
      <rect width="300" height="600" fill="#169B62" />
      <rect x="300" width="300" height="600" fill="#FFFFFF" />
      <rect x="600" width="300" height="600" fill="#FF883E" />
    </svg>
  )
}
