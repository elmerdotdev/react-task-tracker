import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onComplete, onRestore, onEdit }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onComplete={onComplete} onRestore={onRestore} onEdit={onEdit} />
            ))}
        </>
    )
}

export default Tasks