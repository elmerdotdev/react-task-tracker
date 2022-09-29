import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditTask = ({ onEdit }) => {
  const [task, setTask] = useState({})
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  const [completed, setCompleted] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
        const data = await res.json()

        if (res.status === 404) {
            navigate('/')
        }

        setTask(data)
        setText(data.text)
        setDay(data.day)
        setReminder(data.reminder)
        setCompleted(data.completed)
    }

    fetchTask()
  }, [ params, navigate ])

  const onSubmit = (e) => {
      e.preventDefault()

      if (!text) {
          alert('Please add a task')
          return
      }

      onEdit(params.id, text, day, reminder, completed)

      navigate('/')
  }

  return (
      <form className="edit-form" onSubmit={onSubmit}>
          <div className="form-control">
              <label>Task</label>
              <input type="text" placeholder="Add Task" defaultValue={task.text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="form-control">
              <label>Day &amp; Time</label>
              <input type="text" placeholder="Add Day &amp; Time" defaultValue={task.day} onChange={(e) => setDay(e.target.value)} />
          </div>
          <div className="form-control form-control-check">
              <label htmlFor="reminderChkbox">Set Reminder</label>
              <input id="reminderChkbox" type="checkbox" defaultChecked={task.reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
          </div>
          <div className="form-control form-control-check">
              <label htmlFor="completedChkbox">Completed</label>
              <input id="completedChkbox" type="checkbox" defaultChecked={task.completed} checked={completed} onChange={(e) => setCompleted(e.currentTarget.checked)} />
          </div>

          <input type="submit" value="Save Task" className="btn btn-block" />
      </form>
  )
}

export default EditTask