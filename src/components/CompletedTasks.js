import Tasks from './Tasks';

const CompletedTasks = ({ tasks, onDelete, onRestore }) => {
  return (
    <>
      <h2>Completed Tasks</h2>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} onRestore={onRestore} />
      ) : (
        <p className="error-message">
          <em>No completed tasks to show</em>
        </p>
      )}
    </>
  );
};

export default CompletedTasks;
