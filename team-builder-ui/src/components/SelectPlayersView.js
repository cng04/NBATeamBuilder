import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../css/SelectPlayersView.css';
import DisplayPlayer from './DisplayPlayer';
import { useNavigate } from 'react-router-dom'


export default function SelectPlayersView(props) {
  // State to hold the players 
  const [players, setPlayers] = useState([]);

  // State to hold the indicies of the selected players
  const [selectedPlayers, setSelectedPlayers] = useState(new Set());
 
  // Allow for routing in this component
  const navigate = useNavigate();

  // Getting the url param
  let { pos } = useParams();

  useEffect(() => {
    getPlayers();
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
      // console.log(playerData.data);
      setPlayers(playerData.data);
    }
  )}

  // Receives a player index that has been selected by the user and either adds that index to the set or removes it 
  const handlePlayerIndexFromChild = (data, operation) => {
    const newSet = new Set(selectedPlayers);
    if (operation == "add") {
      newSet.add(data);
    } else if (operation == "remove") {
      newSet.delete(data);
    }
    console.log(newSet);
    setSelectedPlayers(newSet);
    console.log(selectedPlayers);
  }

  return (
    <div className="select-player-view-container">
      {
        players && players.length > 0 ? (
          players.map((player, i) => {
            return <DisplayPlayer key={i} data={player} 
            disableSelectButton={selectedPlayers.size != 0} 
            disableCancelButton={selectedPlayers.has(player.index)}
            sendPlayerIndexToParent={handlePlayerIndexFromChild}/>
          })
        ) : <></>
      }
    </div>
  )
}
