import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

function priorityColor(p) {
  if (p === 'high') return 'bg-red-100 text-red-800'
  if (p === 'medium') return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <input
        type="checkbox"
        className="mt-1"
        checked={task.completed}
        onChange={() => onToggleComplete(task)}
      />

      <div className="flex-1">
        <div className={clsx('font-medium', task.completed ? 'line-through text-gray-400' : '')}>
          {task.title}
        </div>
        <div className="text-sm text-gray-500">{task.description}</div>

        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-2 text-sm flex flex-col gap-1">
            {task.subtasks.map(st => (
              <div key={st.id} className="flex items-center gap-2">
                <input type="checkbox" checked={!!st.done} readOnly />
                <div className={st.done ? 'line-through text-gray-400 text-xs' : 'text-xs'}>
                  {st.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <div className={`px-2 py-1 rounded text-xs ${priorityColor(task.priority || 'low')}`}>
          {task.priority || 'low'}
        </div>
        <div className="text-xs text-gray-500">
          {task.deadline ? new Date(task.deadline).toLocaleDateString() : ''}
        </div>
        <div className="flex gap-2 mt-1">
          <Link to={`/tasks/edit/${task.id}`} className="hover:text-sky-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
              />
            </svg>
          </Link>
          <button onClick={() => onDelete(task)} className="hover:text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}