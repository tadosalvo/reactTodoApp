import CalculateDate from "./CalculateDate";

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: CalculateDate.currDate(),
        dateCompleted: action.dateCompleted,
        complete: false,
        id: action.id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((x) =>
        x.user === action.user && x.id === action.id
          ? {
              title: action.title,
              description: action.description,
              author: action.author,
              id: action.id,
              dateCreated: action.dateCreated,
              dateCompleted: CalculateDate.currDate(),
              complete: action.complete,
            }
          : x
      );
    case "DELETE_TODO":
      console.log("delete");
      return state.filter((x) => x.id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
