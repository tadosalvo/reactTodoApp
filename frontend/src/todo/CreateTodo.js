import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        title &&
          dispatch({
            type: "CREATE_TODO",
            author: user,
            title,
            description,
            dateCompleted: "Not completed",
            id: uuidv4(),
          });

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
