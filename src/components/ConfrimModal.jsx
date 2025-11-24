import React from 'react'

export default function ConfirmModal({open, title='Confirm', message, onCancel, onConfirm}) {
  if(!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-3 py-1 rounded border">Batal</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 text-white">Hapus</button>
        </div>
      </div>
    </div>
  )
}