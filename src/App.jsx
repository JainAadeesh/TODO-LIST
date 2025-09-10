import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import ToDoList from './Components/ToDoList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedLocal = localStorage.getItem('tasks');
    const savedSession = sessionStorage.getItem('tasks');
    if (savedSession) return JSON.parse(savedSession);
    if (savedLocal) return JSON.parse(savedLocal);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState('');

  const addTodo = () => {
    if (newTask.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: newTask,
      completed: false,
      isEditing: false,
    };
    setTasks([newTodo, ...tasks]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTasks(tasks.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTasks(tasks.map(todo => todo.id === id ? { ...todo, text: newText, isEditing: false } : todo));
  };

  const toggleEditing = (id) => {
    setTasks(tasks.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center p-2 sm:p-5">
      <div className="w-full sm:max-w-xl mx-auto bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border-l-8 border-purple-700 transition-all duration-300 hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.37)] mt-8">
        <Header />
        <div className="flex flex-col sm:flex-row mb-4 gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task . . ."
            className="border-2 border-purple-700 bg-gray-800 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all shadow-md"
          />
          <button
            onClick={addTodo}
            className="bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 text-white px-6 py-2 rounded-lg shadow-lg font-bold hover:scale-105 hover:shadow-xl transition-all"
          >
            Add
          </button>
        </div>
        <ToDoList
          todos={tasks}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleEditing={toggleEditing}
        />
      </div>
    </div>
  );
}

export default App;
