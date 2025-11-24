
import React, { useEffect, useState } from 'react'
import OverviewCard from '../components/OverviewCard'
// import TaskCard from '../components/TaskCard'
import { fetchTasks } from '../RestAPI'

export default function Dashboard(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    setLoading(true)
    fetchTasks().then(r => setTasks(r.data || [])).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const total = tasks.length
  const done = tasks.filter(t=>t.completed).length
  const notDone = total - done
  const high = tasks.filter(t=>t.priority==='high').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <OverviewCard title="Semua Tugas" value={total}></OverviewCard>
        <OverviewCard title="Selesai" value={done}></OverviewCard>
        <OverviewCard title="Menunggu" value={notDone}></OverviewCard>
        <OverviewCard title="Prioritas Tinggi" value={high}></OverviewCard>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-3">Tugas Terbaru</h2>
        {loading ? <div>Loading...</div> : 
          tasks.slice(0,5).map(t => 
            <TaskCard 
              key={t.id} 
              task={t} 
              onToggleComplete={()=>{}} 
              onDelete={()=>{}} 
            />
          )
        }
      </div>
    </div>
  )
}
