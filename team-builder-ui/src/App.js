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

  // Data Structure of selected players is a map of two submaps, which indicate the players selected
  // for that user. Each user submap is a map of key/value pairs of position (e.g. PG) and the player object
  // selected
  let defaultMap = new Map();
  defaultMap.set("user1", new Map());
  defaultMap.set("user2", new Map());

  // Map which holds two maps (user1 and user2 as keys). Each map has the position as the key and the player object as the value
  const [selectedPlayers, setSelectedPlayers] = useState(defaultMap);

  return (
    <PlayerContext.Provider value={[selectedPlayers, setSelectedPlayers]}>
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
