import { createContext, useEffect, useState, useContext } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} from '../services/database.service';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

export const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }

    const fetchTodos = async () => {
      try {
        const data = await getTodos(user.uid);
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [user]);

  const handleAddTodo = async (text) => {
    if (!user) return;

    try {
      await addTodo(text);
      setTodos(await getTodos(user.uid));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!user) return;

    try {
      await deleteTodo(id);
      setTodos(await getTodos(user.uid));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id, currentStatus) => {
    if (!user) return;
    try {
      await toggleTodoStatus(id, currentStatus);
      setTodos(await getTodos(user.uid));
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{ todos, handleAddTodo, handleDeleteTodo, handleToggleTodo }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
