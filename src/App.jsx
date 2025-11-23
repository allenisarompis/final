import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-52">
        <main className="container mx-auto p-6">
          <Routes>
            {/* Placeholder routes - Orang 1-3 akan mengisi ini */}
            <Route path="/" element={<div>Dashboard Placeholder</div>} />
            <Route path="/tasks" element={<div>Tasks Placeholder</div>} />
            <Route path="/tasks/add" element={<div>Add Task Placeholder</div>} />
            <Route path="/tasks/edit/:id" element={<div>Edit Task Placeholder</div>} />
            <Route path="/tasks/today" element={<div>Today Tasks Placeholder</div>} />
            <Route path="/tasks/high" element={<div>High Priority Placeholder</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
