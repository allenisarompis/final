import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import TodayTasks from './pages/TodayTasks'
import Tasks from './pages/Tasks'
import HighPriorityTasks from './pages/HighPriorityTasks'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-52">
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/high" element={<HighPriorityTasks />} />
            <Route path="/tasks/today" element={<TodayTasks />} />

            <Route path="/tasks/add" element={<div>Placeholder Tambah Tugas</div>} />
            <Route path="/tasks/edit/:id" element={<div>Placeholder Edit Tugas</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}