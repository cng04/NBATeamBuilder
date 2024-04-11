import logo from './logo.svg';
import './App.css';
import Court from './components/Court';
import SelectPlayersView from "./components/SelectPlayersView";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React from 'react'
import { useState, createContext } from 'react';


export const PlayerContext = createContext();

function App() {
  // Map which holds the selected player objects (including index, name, position, stats) as the keys
  // and the user that selected the player (user1 or user2) as the values
  const [selectedPlayers, setSelectedPlayers] = useState(new Map());

  // State to hold whether for each user (user1 and user2) a player has been selected for the five positions. 
  // If a player has been selected, that user cannot select another player from that position unless 
  // the selected player has been deselected
  const [posSelected, setPosSelected] = useState({
    "user1": {
      "PG": false,
      "SG": false,
      "SF": false,
      "PF": false,
      "C": false
    }, 
    "user2": {
      "PG": false,
      "SG": false,
      "SF": false,
      "PF": false,
      "C": false
    }
  });

  return (
    <PlayerContext.Provider value={[selectedPlayers, setSelectedPlayers, posSelected, setPosSelected]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Court/>}/>
          <Route path="/selectPlayers/:pos/:user" element={<SelectPlayersView/>}/>
        </Routes>
      </BrowserRouter>
    </PlayerContext.Provider>
    
  );
}

export default App;
