import React from "react";

function Note({ id, title, content, deleteNote }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => deleteNote(id)}>DELETE</button>
    </div>
  );
}

export default Note;
