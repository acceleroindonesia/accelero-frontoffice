'use client'

import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  label?: string
  error?: string
}

const Select: React.FC<SelectProps> = ({ children, label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Select
