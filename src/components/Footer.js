// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  // const [tasks, setTasks] = useState([])

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const res = await fetch('http://localhost:5000/tasks?completed=true')
  //     const data = await res.json()
  //     setTasks(data)
  //   }

  //   getTasks()
  // }, [])

  return (
    <footer>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/completed">Completed Tasks</Link>
        </div>
        <p>Copyright &copy; 2022</p>
    </footer>
  )
}

export default Footer