import ToDoItem from './ToDoItem';

function ToDoList({ todos, toggleComplete, deleteTodo, editTodo, toggleEditing, theme = "dark" }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleEditing={toggleEditing}
          theme={theme}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
