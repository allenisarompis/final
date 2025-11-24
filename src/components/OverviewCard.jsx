import React from 'react'

export default function OverviewCard({title, value, children}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-2 text-xs text-gray-400">{children}</div>
    </div>
  )
}