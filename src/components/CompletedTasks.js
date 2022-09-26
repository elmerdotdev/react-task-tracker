import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Tasks from './Tasks'

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
        const res = await fetch(`http://localhost:5000/tasks?completed=true`)
        const data = await res.json()

        if (res.status === 404) {
            navigate('/')
        }

        setTasks(data)
    }

    fetchTasks()
  })

  

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