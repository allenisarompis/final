import React, { useEffect, useState } from 'react'
import { fetchTasks, updateTask, removeTask } from '../RestAPI'
// import TaskCard from '../components/TaskCard'
import { Link } from 'react-router-dom'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  useEffect(()=> fetchList(), [])

  function fetchList(){
    setLoading(true)
    fetchTasks().then(r => setTasks(r.data || [])).catch(()=>{}).finally(()=>setLoading(false))
  }

  async function toggleComplete(task){
    try {
      await updateTask(task.id, { completed: !task.completed, updatedAt: new Date().toISOString() })
      setToast('Tugas diperbaharui')
      fetchList()
      setTimeout(()=>setToast(''), 2000)
    } catch(err){ alert('Gagal memperbarui tugas') }
  }

  async function remove(task){
    if(!confirm('Hapus tugas ini?')) return
    try {
      await removeTask(task.id)
      setToast('Tugas dihapus')
      fetchList()
      setTimeout(()=>setToast(''), 2000)
    } catch(err) { alert('Gagal menghapus tugas') }
  }

  const filtered = tasks.filter(t => {
    if(filter==='completed' && !t.completed) return false
    if(filter==='pending' && t.completed) return false
    if(search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Semua Tugas</h1>
        <Link
          to="/tasks/add"
          className="px-4 py-2 bg-[#9EB6D2] text-white rounded"
        >
          Tambah Tugas
        </Link>
      </div>

      <div className="flex gap-3">
        <input placeholder="Search title..." value={search} onChange={e => setSearch(e.target.value)} className="p-2 border rounded flex-1" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">Semua</option>
          <option value="completed">Selesai</option>
          <option value="pending">Menunggu</option>
        </select>
      </div>

      <div className="grid gap-3">
        {loading ? <div>Loading...</div> : (filtered.length === 0 ? <div className="text-gray-500">No tasks</div> : filtered.map(t => <TaskCard key={t.id} task={t} onToggleComplete={toggleComplete} onDelete={remove} />))}
      </div>

      {toast && <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded">{toast}</div>}
    </div>
  )
}