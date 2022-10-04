import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch, user }) {
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={"post-" + i} dispatch={dispatch} />
      ))}
    </div>
  );
}
