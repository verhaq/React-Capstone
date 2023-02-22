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
