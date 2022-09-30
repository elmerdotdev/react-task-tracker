import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import About from './components/About';
import TaskDetails from './components/TaskDetails';
import CompletedTasks from './components/CompletedTasks';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetchTasks();
      setTasks(res);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  // Edit Task
  const editTask = async (id, text, day, reminder, completed) => {
    const taskToEdit = await fetchTask(id);
    const updTask = {
      ...taskToEdit,
      text: text,
      day: day,
      reminder: reminder,
      completed: completed,
    };

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const res = await fetchTasks();
    setTasks(res);
  };

  // Complete Task
  const completeTask = async (id) => {
    const taskToComplete = await fetchTask(id);
    const updTask = { ...taskToComplete, completed: true };
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // Restore Task
  const restoreTask = async (id) => {
    const taskToRestore = await fetchTask(id);
    const updTask = { ...taskToRestore, completed: false };
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      )
    );
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                <h2>Pending Tasks</h2>
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks.filter((task) => task.completed === false)}
                    onComplete={completeTask}
                    onEdit={editTask}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <p className="error-message">
                    <em>No pending tasks to show</em>
                  </p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/completed"
            element={
              <CompletedTasks
                tasks={tasks.filter((task) => task.completed === true)}
                onRestore={restoreTask}
                onDelete={deleteTask}
              />
            }
          />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route
            path="/task/edit/:id"
            element={<EditTask onEdit={editTask} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
