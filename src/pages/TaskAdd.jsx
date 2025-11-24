import React from 'react' 
import TaskForm from '../components/TaskForm'
import { createTask } from '../RestAPI'
import { useNavigate } from 'react-router-dom'

export default function TaskAdd(){
  const nav = useNavigate()

  async function submit(data){
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    try {
      await createTask(payload)
      nav(-1)
    } catch(err){
      alert('Gagal menambah tugas ke list')
    }
  }

  function cancel(){
    nav(-1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Tugas</h1>
      <TaskForm onSubmit={submit} onCancel={cancel} submitLabel="Add Task" />
    </div>
  )
}