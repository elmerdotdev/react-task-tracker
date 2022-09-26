import { FaTimes, FaCheck, FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle, onComplete, onRestore }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <div>
                <h3>
                    {task.text}
                </h3>
                <p>{task.day}</p>
                <p><Link to={`/task/${task.id}`} className="btn">View Details</Link></p>
            </div>

            <div>
                {onDelete ? (<FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} />) : (null)}
                {onComplete ? (<FaCheck style={{ color: 'green', cursor: 'pointer' }} onClick={() => onComplete(task.id)} />) : (null)}
                {onRestore ? (<FaArrowCircleLeft style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onRestore(task.id)} />) : (null)}
            </div>
        </div>
    )
}

export default Task