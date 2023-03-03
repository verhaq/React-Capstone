import React from "react";

function Card(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1 class="font-bold">{props.title}</h1>
      <p>{props.content}</p>
      <p>{props.notes}</p>
      <p>{props.notes2}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Card;