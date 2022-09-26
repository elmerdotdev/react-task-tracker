import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import TaskDetails from './components/TaskDetails'
import CompletedTasks from './components/CompletedTasks'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const res = await fetch('http://localhost:5000/tasks?completed=false')
            const data = await res.json()
            setTasks(data)
        }

        getTasks()
    }, [])

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    // Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    // Complete Task
    const completeTask = async (id) => {
        const taskToComplete = await fetchTask(id)
        const updTask = { ...taskToComplete, completed: true }
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        )
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                
                <Routes>
                    <Route path='/' element={
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks tasks={tasks} onComplete={completeTask} onToggle={toggleReminder} />
                            ) : (
                                'No Tasks To Show'
                            )}
                        </>
                    } />
                    <Route path='/about' element={<About />} />
                    <Route path='/completed' element={<CompletedTasks />} />
                    <Route path='/task/:id' element={<TaskDetails />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
