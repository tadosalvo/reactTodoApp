import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts";
import { useResource } from "react-request-hook";
import CalculateDate from "../CalculateDate";

export default function Todo({
  user,
  title,
  description,
  dateCreated,
  dateCompleted,
  author,
  id,
  complete,
  dispatch,
}) {
  const { secondaryColor } = useContext(ThemeContext);

  const [todoDel, deleteTodo] = useResource(({ id }) => ({
    url: "/todos/" + id,
    method: "delete",
  }));

  const [todoTog, toggleTodo] = useResource(
    ({ id, complete, dateCompleted }) => ({
      url: "/todos/" + id,
      method: "patch",
      data: {
        id,
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
    if (todoTog?.isLoading === false && todoTog?.data) {
      dispatch({
        type: "TOGGLE_TODO",
        title: todoTog.data.title,
        description: todoTog.data.description,
        author: todoTog.data.author,
        dateCompleted: todoTog.data.dateCompleted,
        dateCreated: todoTog.data.dateCreated,
        id: todoTog.data.id,
        complete: todoTog.data.complete,
      });
    }
  }, [todoTog]);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{description}</div>
      <div>
        Completed:
        <input
          type="checkbox"
          defaultChecked={false}
          value={complete}
          onChange={() => {
            toggleTodo({
              title,
              description,
              author,
              id: id,
              complete: !complete,
              dateCompleted: CalculateDate.currDate(),
              dateCreated,
            });

            // dispatch({
            //   type: "TOGGLE_TODO",
            //   title,
            //   user,
            //   description,
            //   dateCreated,
            //   dateCompleted,
            //   author,
            //   id,
            //   complete: event.target.checked,
            // });
          }}
        />
        Delete:
        <input
          type="submit"
          value="Delete"
          onClick={(event) => {
            event.preventDefault();
            deleteTodo({ id });
            dispatch({ type: "DELETE_TODO", id, user });
          }}
        />
      </div>
      <br />
      <div>
        <i>Created on: </i>
        {dateCreated}
      </div>
      <div>
        <i>Completed on: </i>
        {dateCompleted}
      </div>
      <br />
      <i>
        User: <b>{author}</b>
      </i>
    </div>
  );
}
