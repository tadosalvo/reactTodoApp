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
    case "COMPLETED_TODO":
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
