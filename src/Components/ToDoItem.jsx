import { useState } from 'react';

function ToDoItem({ todo, toggleComplete, deleteTodo, editTodo, toggleEditing }) {
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() !== '') {
      editTodo(todo.id, editText);
    }
  };

  return (
    <li className="flex items-center justify-between p-2 border-b">
      {todo.isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex w-full">
          <input
            className="flex-1 border rounded-l px-2 py-1"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit" className="bg-green-500 text-white px-3 rounded-r">Save</button>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className={todo.completed ? "line-through text-gray-500" : ""}>
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleEditing(todo.id)}
              className="text-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600"
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
