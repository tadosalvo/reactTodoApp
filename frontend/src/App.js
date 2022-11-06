import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import React, { useState, useEffect, useReducer } from "react";
//import { useResource } from "react-request-hook";
import appReducer from "./reducers";
import Header from "./Header";
import { ThemeContext, StateContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";

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

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s Todo`;
    } else {
      document.title = "Todo";
    }
  }, [user]);

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  // const [posts, getPosts] = useResource(() => ({
  //   url: "/posts",
  //   method: "get",
  // }));

  //useEffect(getPosts, []);

  // useEffect(() => {
  //   if (posts && posts.data) {
  //     dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
  //   }
  // }, [posts]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="Todo App" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <TodoList />
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
