import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import CalculateDate from "../CalculateDate";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, description, author, dateCompleted, dateCreated, complete }) => ({
      url: "/todos",
      method: "post",
      data: {
        title,
        description,
        author,
        dateCompleted,
        dateCreated,
        complete,
      },
    })
  );

  useEffect(() => {
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        author: todo.data.author,
        title: todo.data.title,
        description: todo.data.description,
        dateCompleted: todo.data.dateCompleted,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        id: todo.data.id,
      });
    }
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        title &&
          createTodo({
            title,
            description,
            author: user,
            dateCompleted: "Not completed",
            dateCreated: CalculateDate.currDate(),
            complete: false,
          });

        // title &&
        //   dispatch({
        //     type: "CREATE_TODO",
        //     author: todo.data.author,
        //     title: todo.data.title,
        //     description: todo.data.description,
        //     dateCompleted: todo.data.dateCompleted,
        //     dateCreated: todo.data.dateCreated,
        //     complete: todo.data.complete,
        //     id: uuidv4(),
        //   });

        //setTodos([newTodo, ...todos]);
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input type="submit" value="Create" />
    </form>
  );
}
