import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import CreateCard from "./components/CreateCard";
import axios from 'axios';

function App() {

// API STUFF START
  const [query, setQuery] = useState('')
  const [container, setContainer] = useState([])
  const [endpoint, setEndPoint] = useState('')

  const onChangeHandler = (e) => {
    setQuery(e.target.value)
    console.log (query)
  }

  const onSubmitHandler = ((e) => {
    e.preventDefault()
    console.log(query)
    // something()
    const options = {
      method: 'GET',
      url: 'https://house-plants2.p.rapidapi.com/search',
      params: {query: `${query}`},
      headers: {
        'X-RapidAPI-Key': 'ADD SECRET KEY',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
      }
    };
    
    axios.request(options)
    .then(function (response) {
      console.log(response.data)
      return response;
    })
    .then(response => {
  console.log(response)
  if (!Array.isArray(response.data)) {
    throw new Error (response.data)
  }
  setContainer(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
  })

  // API STUFF END
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

// console.log(container)

return (
  <div>
      <Header />
      <form onSubmit={onSubmitHandler}>
        <input type="text" placeholder="Search plants" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {container.map(({item},index) => {
        return (
          <div key={index}>

            <p>
              <img src = {item.Img} />
            </p>
            <p>
             {item ['Common name']} 
            </p>
            <p>
              {item.Family}
            </p>
            <p>
             {item.Watering} 
            </p>
          </div>
        )
      })}
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
