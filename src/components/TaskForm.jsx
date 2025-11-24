import React, { useState, useEffect } from 'react'

export default function TaskForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    tags: [],
    subtasks: [],
    completed: false,
    ...initial
  })

  useEffect(() => {
    setForm(prev => ({ ...prev, ...initial }))
  }, [initial])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function addSubtask() {
    setForm(prev => ({
      ...prev,
      subtasks: [
        ...(prev.subtasks || []),
        { id: Date.now(), title: '', done: false }
      ]
    }))
  }

  function handleSubtaskChange(idx, key, val) {
    const updated = [...(form.subtasks || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    setForm(prev => ({ ...prev, subtasks: updated }))
  }

  function removeSubtask(idx) {
    const updated = [...(form.subtasks || [])]
    updated.splice(idx, 1)
    setForm(prev => ({ ...prev, subtasks: updated }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      alert('Title is required')
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <label className="block text-sm font-medium">Judul *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            name="deadline"
            type="date"
            value={form.deadline ? form.deadline.split('T')[0] : ''}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Prioritas</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <label className="text-sm font-medium">Selesai</label>
          <input
            name="completed"
            type="checkbox"
            checked={form.completed}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Subtasks</label>
        <div className="space-y-2 mt-2">
          {(form.subtasks || []).map((st, idx) => (
            <div key={st.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={st.done}
                onChange={(e) => handleSubtaskChange(idx, 'done', e.target.checked)}
              />
              <input
                className="flex-1 p-2 border rounded"
                value={st.title}
                onChange={(e) => handleSubtaskChange(idx, 'title', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeSubtask(idx)}
                className="text-red-600"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="text-sky-600"
          >
            + Tambah Subtask
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-12 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}