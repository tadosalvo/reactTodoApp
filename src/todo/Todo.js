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
        <input
          type="checkbox"
          defaultChecked={complete}
          value={complete}
          onChange={(event) =>
            dispatch({
              type: "COMPLETED_TODO",
              title,
              user,
              description,
              dateCreated,
              dateCompleted,
              author,
              id,
              complete: event.target.checked,
            })
          }
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
