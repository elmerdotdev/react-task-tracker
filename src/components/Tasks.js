import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, completed }) => {
    return (
        <>
            {tasks.map((task) => (
                completed ? (
                    task.completed ? (
                    <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
                    ) : ( '' )
                ) : ( '' )
            ))}
        </>
    )
}

export default Tasks