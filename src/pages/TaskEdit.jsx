import React, { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm'
import { fetchTask, replaceTask } from '../RestAPI'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskEdit(){
  const { id } = useParams()
  const nav = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    fetchTask(id)
      .then(r => setTask(r.data))
      .catch(()=>{})
      .finally(()=>setLoading(false))
  }, [id])

  async function submit(data){
    try {
      const payload = { ...data, updatedAt: new Date().toISOString() }
      await replaceTask(id, payload)
      nav(-1)
    } catch(err) {
      alert('Gagal Memperbarui Tugas')
    }
  }

  function cancel(){
    nav(-1)
  }

  if(loading) return <div>Loading...</div>
  if(!task) return <div>Tugas tidak ditemukan</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Tugas</h1>
      <TaskForm initial={task} onSubmit={submit} onCancel={cancel} submitLabel="Edit Tugas" />
    </div>
  )
}