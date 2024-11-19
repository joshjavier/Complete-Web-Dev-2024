import React from "react";

function CreateArea({ addNote }) {
  /** @param {React.FormEvent<HTMLFormElement>} e */
  const onSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const noteInput = {}
    formData.forEach((value, key) => {
      noteInput[key] = value
    })
    addNote(noteInput)

    form.reset()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Take a note..." rows="3" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
