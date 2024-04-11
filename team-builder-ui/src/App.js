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
  // State to hold the indicies of the selected players
  const [selectedPlayers, setSelectedPlayers] = useState(new Map());

  // State to hold whether a position has a player selected from. If it has, the user cannot 
  // select another player from that positional view unless that person has been deselected
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
