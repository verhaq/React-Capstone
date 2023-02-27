import React, { useState, useEffect, useCallback, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/authContext";
import Auth from "./components/Auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import CreateCard from "./components/CreateCard";
import Home from "./components/Home";
import axios from 'axios';

function App() {

  const authCtx = useContext(AuthContext);


// API STUFF START

  // API STUFF END
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

  try {

    const { data } = await axios.get("http://localhost:4005/getPosts");
    console.log("Data fetch", data);

    setNotes(data);
  } catch (error) {
    console.log(error);
  }
};

const addNote = async (newNote) => {

  try {

    setNotes(prevNotes => {
      alert("Entry submitted!")
      return [...prevNotes, newNote];
      });

    const { data } = await axios.post("http://localhost:4005/posts", newNote)

    console.log("added Note", data);

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

<Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
 </Routes>

      <Footer />
    </div>
  );
}

export default App;
