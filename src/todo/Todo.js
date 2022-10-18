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
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <div>
        Completed:
        <input
          type="checkbox"
          defaultChecked={false}
          value={complete}
          onChange={(event) => {
            dispatch({
              type: "TOGGLE_TODO",
              title,
              user,
              description,
              dateCreated,
              dateCompleted,
              author,
              id,
              complete: event.target.checked,
            });
          }}
        />
        Delete:
        <input
          type="submit"
          value="Delete"
          onClick={(event) => {
            event.preventDefault();
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
