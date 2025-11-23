import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 6000,
  headers: { 'Content-Type': 'application/json' }
})

API.interceptors.response.use(
  res => res,
  err => {
    const message = err?.response?.data || err.message || 'Network error'
    return Promise.reject(message)
  }
)

export const fetchTasks = (params = {}) => API.get('/tasks', { params })
export const fetchTask = (id) => API.get(`/tasks/${id}`)
export const createTask = (payload) => API.post('/tasks', payload)
export const replaceTask = (id, payload) => API.put(`/tasks/${id}`, payload)
export const updateTask = (id, payload) => API.patch(`/tasks/${id}`, payload)
export const removeTask = (id) => API.delete(`/tasks/${id}`)

export default API