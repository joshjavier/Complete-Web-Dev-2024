import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const initialNotes = [{ id: 1, title: 'Note title', content: 'Note content' }]

function App() {
  const [notes, setNotes] = useState(initialNotes)

  const addNote = ({ title, content }) => {
    const newNote = {
      id: [...notes].pop().id + 1,
      title,
      content,
    }
    setNotes(notes.concat(newNote))
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map(note =>
        <Note key={note.id} title={note.title} content={note.content} />
      )}
      <Footer />
    </div>
  );
}

export default App;
