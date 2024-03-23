import logo from './logo.svg';
import './App.css';
import Court from './components/Court';
import SelectPlayersView from "./components/SelectPlayersView";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React from 'react'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Court/>}/>
        <Route path="/selectPlayers/:pos" element={<SelectPlayersView/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
