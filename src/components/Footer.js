import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks?completed=true')
      const data = await res.json()
      setTasks(data)
    }

    getTasks()
  })

  return (
    <footer>
        <p>Copyright &copy; 2022</p>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {tasks.length > 0 ? (
          <Link to="/completed">Completed Tasks</Link>
        ):(null)}
    </footer>
  )
}

export default Footer