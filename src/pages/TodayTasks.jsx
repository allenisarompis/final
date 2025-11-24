import React, { useEffect, useState } from 'react'
import { fetchTasks, updateTask, removeTask } from '../RestAPI'
import TaskCard from '../components/TaskCard' 

export default function TodayTasks(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchList()
  }, [])

  function fetchList(){
    setLoading(true)
    fetchTasks()
      .then(r => setTasks(r.data || []))
      .catch(()=>{})
      .finally(()=>setLoading(false))
  }

  const today = new Date().toISOString().split("T")[0]

  const filtered = tasks.filter(t => t.deadline === today)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tugas Hari Ini</h1>

      {loading ? <div>Loading...</div> : (
        filtered.length === 0
          ? <div className="text-gray-500">Tidak ada tugas untuk hari ini</div>
          : filtered.map(t => (
              <TaskCard 
                key={t.id}
                task={t}
                onToggleComplete={async () => {
                  await updateTask(t.id, { completed: !t.completed })
                  fetchList()
                }}
                onDelete={async () => {
                  await removeTask(t.id)
                  fetchList()
                }}
              />
            ))
      )}
    </div>
  )
}