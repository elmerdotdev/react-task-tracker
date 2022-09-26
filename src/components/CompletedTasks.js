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
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </>
  )
}

export default CompletedTasks