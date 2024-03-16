import React, { useState } from 'react'
import bballCourt from '../images/ballCourt.jpeg'
import '../css/Court.css'


export default function Court(props) {
  const [players, setPlayers] = useState([]);

  const [selectedPlayers, setSelectedPlayers] = useState([]);


  const handleClick = async (click) => {
    await fetch("http://localhost:8000/displayPosition/PG", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(playerData => {
      // console.log(data);
      console.log(playerData.data);
      setPlayers(playerData);
    });
  }

  return (
    <>
      <div className="court-container">
        <img className="court-image" src={bballCourt}/>
        <button onClick={handleClick}>PG</button>
      </div>
    </>
  )
}
