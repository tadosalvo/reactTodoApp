import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import { useReducer } from "react";
import appReducer from "./reducers";

import { v4 as uuidv4 } from "uuid";

function App() {
  const initialTodos = [
    {
      title: "Todo Example",
      description: "Description",
      author: "Logged in User",
      complete: false,
      dateCreated: "Date Created",
      dateCompleted: "Date Completed",
      id: uuidv4(),
    },
  ];

  //const [user, setUser] = useState("");
  //const [todos, setTodos] = useState(initialTodos);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });
  return (
    <div>
      <h1>Todo App</h1>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} dispatch={dispatch} />
      {state.user && (
        <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
