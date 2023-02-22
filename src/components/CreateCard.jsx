import React, { useState } from "react";


// create useEffect then create axios.post req and include URL ofor endpoint on backend

function CreateCard(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    notes:"",
    notes2:""
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
      notes: "",
      notes2: ""
    });
    event.preventDefault();
    console.log(note)
    
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
        <textarea
          name="notes2"
          onChange={handleChange}
          value={note.notes2}
          placeholder="Notes"
          rows="1"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateCard;