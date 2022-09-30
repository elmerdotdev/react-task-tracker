import { FaTimes, FaCheck, FaArrowCircleLeft, FaPencilAlt, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle, onComplete, onRestore, onEdit }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <div>
                <h3>
                    {task.text} {onRestore ? (<FaCheckCircle style={{ color: 'green' }}></FaCheckCircle>) : (null)}
                </h3>
                <p>{task.day}</p>
                <p><Link to={`/task/${task.id}`} className="btn">View Details</Link></p>
            </div>

            <div className="icons">
                {onRestore ? (<FaArrowCircleLeft style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onRestore(task.id)} size={28} />) : (null)}
                {onComplete ? (<FaCheck style={{ color: 'green', cursor: 'pointer' }} onClick={() => onComplete(task.id)} size={28} />) : (null)}
                {onEdit ? (<Link to={`/task/edit/${task.id}`}><FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} size={28} /></Link>) : (null)}
                {onDelete ? (<FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} size={28} />) : (null)}
            </div>
        </div>
    )
}

export default Task