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
  const [theme, setTheme] = useState('dark');

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

  // Theme-based styles
  const bgClass =
    theme === 'light'
      ? 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700';
  const boxBgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const borderClass = theme === 'light' ? 'border-l-8 border-purple-300' : 'border-l-8 border-purple-700';

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center p-2 sm:p-5`}>
      <button
        className="fixed top-2 right-2 sm:top-4 sm:right-4 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-700 transition z-10"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className={`w-full max-w-full sm:max-w-xl mx-auto ${boxBgClass} p-3 sm:p-10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${borderClass} transition-all duration-300 hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.37)] mt-6 sm:mt-8`}>
        <Header />
        <div className="flex flex-col sm:flex-row mb-4 gap-2 sm:gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className={`border-2 ${theme === 'light' ? 'border-purple-300 bg-gray-100 text-gray-900' : 'border-purple-700 bg-gray-800 text-white'} rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 ${theme === 'light' ? 'focus:ring-purple-300' : 'focus:ring-purple-700'} transition-all shadow-md text-sm sm:text-base`}
          />
          <button
            onClick={addTodo}
            className={`bg-gradient-to-r ${theme === 'light' ? 'from-purple-300 via-pink-300 to-red-300' : 'from-purple-700 via-pink-700 to-red-700'} text-white px-4 py-2 rounded-lg shadow-lg font-bold hover:scale-105 hover:shadow-xl transition-all text-sm sm:text-base`}
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
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;
