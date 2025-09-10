import { useState } from 'react';

function ToDoItem({ todo, toggleComplete, deleteTodo, editTodo, toggleEditing, theme = "light" }) {
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() !== '') {
      editTodo(todo.id, editText);
    }
  };

  // Updated light theme colors
  const itemBg = theme === "light" ? "bg-yellow-50 border-yellow-200" : "bg-gray-800 border-gray-700";
  const textColor = theme === "light" ? "text-purple-800" : "text-white";
  const completedColor = theme === "light" ? "line-through text-pink-400" : "line-through text-red-400";
  const inputBg = theme === "light" ? "bg-pink-50 text-purple-900" : "bg-gray-900 text-white";

  return (
    <li className={`flex items-center justify-between p-2 border-b ${itemBg}`}>
      {todo.isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex w-full">
          <input
            className={`flex-1 rounded-l px-2 py-1 ${inputBg}`}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit" className="bg-pink-500 text-white px-3 rounded-r">Save</button>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className={todo.completed ? completedColor : textColor}>
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleEditing(todo.id)}
              className={theme === "light" ? "text-purple-500" : "text-yellow-500"}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className={theme === "light" ? "text-pink-600" : "text-red-600"}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default ToDoItem;
