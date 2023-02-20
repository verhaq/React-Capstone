import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import CreateCard from "./components/CreateCard";
import axios from 'axios';

function App() {


  const [query, setQuery] = useState('')
  const [container, setContainner] = useState([])
  
  const options = {
    method: 'GET',
    url: 'https://house-plants2.p.rapidapi.com/search',
    params: {query: 'Fern'},
    headers: {
      'X-RapidAPI-Key': '5f7149f1e6msh907f30e37325da4p17a268jsn88f870106733',
      'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
  
    const [notes, setNotes] = useState([]);
  
    function addNote(newNote) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }


return (
  <div>
      <Header />
      <form>
        <input type="text" placeholder="Search plants"/>
        <button type="submit">Submit</button>
      </form>
      <CreateCard onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Card
          key={index}
          id={index}
            title={noteItem.title}
            content={noteItem.content}
            notes={noteItem.notes}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
