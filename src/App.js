import React, { useState, useEffect, useCallback, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/authContext";
import Auth from "./components/Auth";

import Header from "./components/Header";
// import Footer from "./components/Footer";
import Card from "./components/Card";
import CreateCard from "./components/CreateCard";
import Home from "./components/Home";
import Garden from "./components/Garden";
import axios from 'axios';

function App() {

  const authCtx = useContext(AuthContext);



  const [notes, setNotes] = useState([]);
  
  // function addNote(newNote) {
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    //   });
  //   }
  
    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }

// console.log(container)

const fetchNotes = async () => {

  const storedId = localStorage.getItem('userId')
  try {

    const { data } = await axios.get(`http://localhost:4005/getPosts/${storedId}`);
    console.log("Data fetch", data);

    setNotes(data);
  } catch (error) {
    console.log(error);
  }
};

const addNote = async (newNote) => {

  const storedId = localStorage.getItem('userId')
  try {

    const { data } = await axios.post(`http://localhost:4005/posts/${storedId}`, newNote)

    console.log("added Note", data);
    alert("Plant added to your garden!")

    fetchNotes();
  } catch (error) {
    console.log("error", error);
  }

}

useEffect(() => {

  fetchNotes();
}, []);



return (
  <div >
      <Header />

      <CreateCard onAdd={addNote}/>

          <Routes>
                  <Route path="/" element={<Home fetchNotes={fetchNotes} setNotes={setNotes}/>} />
                  <Route path="/garden" element={<Garden fetchNotes={fetchNotes} setNotes={setNotes}/>} />
                  <Route
                    path="/auth"
                    element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
                  />
           </Routes>

      <div>
      {notes.map((noteItem, index) => {
        return (
          <Card
          key={index}
          id={index}
            title={noteItem.title}
            content={noteItem.content}
            notes={noteItem.notes}
            notes2={noteItem.notes2}
            onDelete={deleteNote}
          />
        );
      })}
      </div>


    </div>
  );
}

export default App;
