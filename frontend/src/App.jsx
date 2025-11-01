import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      console.log('Sending todo:', { text: newTodo });
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`, { text: newTodo });
      console.log('Server response:', response.data);
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo: ' + error.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button type="submit" className="add-button">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;