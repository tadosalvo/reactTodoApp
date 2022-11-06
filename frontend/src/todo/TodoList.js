import Todo from "./Todo";
import { useContext } from "react";
import { StateContext } from "../contexts";

export default function TodoList() {
  const { dispatch } = useContext(StateContext);
  const { state } = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={p.id} dispatch={dispatch} />
      ))}
    </div>
  );
}
