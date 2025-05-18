import ToDoItem from './ToDoItem';

function ToDoList({ todos, toggleComplete, deleteTodo, editTodo, toggleEditing }) {
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
        />
      ))}
    </ul>
  );
}

export default ToDoList;
