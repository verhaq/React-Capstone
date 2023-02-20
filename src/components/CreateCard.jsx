import React, { useState } from "react";

function CreateCard(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    notes:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      notes: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Plant Name"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Watering Conditions"
          rows="1"
        />
        <textarea
          name="notes"
          onChange={handleChange}
          value={note.notes}
          placeholder="Light Requirements"
          rows="1"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateCard;