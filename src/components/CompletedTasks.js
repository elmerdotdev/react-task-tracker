import { useState, useEffect } from 'react'
import Tasks from './Tasks'

const CompletedTasks = ({ onUpdate }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
        const res = await fetchTasks()
        setTasks(res)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks?completed=true`)
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Restore Task
  const restoreTask = async (id) => {
    const taskToRestore = await fetchTask(id)
    const updTask = { ...taskToRestore, completed: false }
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
    })

    setTasks(tasks.filter((task) => task.id !== id))
    onUpdate()
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <>
      <h2>Completed Tasks</h2>
      <Tasks tasks={tasks} onDelete={deleteTask} onRestore={restoreTask} />
    </>
  )
}

export default CompletedTasks