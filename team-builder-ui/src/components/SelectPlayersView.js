import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DisplayPlayer from './DisplayPlayer';

export default function SelectPlayersView(props) {
  // State to hold the players 
  const [players, setPlayers] = useState([]);

  // Getting the url param
  let { pos } = useParams();

  useEffect(() => {
    getPlayers();
    console.log(players);
  }, [])

  // Async method to query PostgreSQL DB by Position
  const getPlayers = async () => {
    await fetch("http://localhost:8000/displayPosition" + "/" + pos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(playerData => {
      console.log(playerData.data);
      setPlayers(playerData.data);
    }
  )}

  const handleClick = () => {
    console.log(players);
  }

  return (
    <div className="select-player-view-container">
      <button onClick={handleClick}>Click</button>
      {
        players.map((player, i) => {
          return <DisplayPlayer key={i} data={player}/>
        })
      }
    </div>
  )
}
