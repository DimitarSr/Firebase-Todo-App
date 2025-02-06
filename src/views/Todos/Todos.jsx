import { useContext, useState } from 'react';
import { DatabaseContext } from '../../contexts/DatabaseContext';
import './Todos.css';

const Todos = () => {
  const { todos, handleAddTodo, handleDeleteTodo, handleToggleTodo } =
    useContext(DatabaseContext);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTask.trim() === '') return;

    try {
      await handleAddTodo(newTask);
      setNewTask('');
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="todos-container">
      <div className="todos-box">
        <h2>My To-Do List</h2>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <button type="submit" disabled={newTask.trim() === ''}>
            Add
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <ul className="todo-list">
          {todos.length === 0 ? (
            <p className="no-todos">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todo.completed)}
                />
                <span>{todo.text}</span>
                <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
