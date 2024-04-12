import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../css/SelectPlayersView.css';
import DisplayPlayer from './DisplayPlayer';
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../App';
import { Button } from '@mui/material';
import { hasValue } from '../utility/Utility';

export default function SelectPlayersView(props) {
  // State to hold the players 
  const [players, setPlayers] = useState([]);

  // Holds the selectedPlayers data from the context initialized in App.js
  const [selectedPlayers, setSelectedPlayers] = useContext(PlayerContext);

  // State to hold the other user
  const [otherUser, setOtherUser] = useState("");

  // State to hold object indicating whether child component should show the select button
  const [displaySelect, setDisplaySelect] = useState();
 
  // Allow for routing in this component
  const navigate = useNavigate();

  // Getting the url param - has to match the param variable in App.js path value in <Route>
  let { pos, user } = useParams();

  useEffect(() => {
    if (user == "user1") {
      setOtherUser("user2");
    } else {
      setOtherUser("user1");
    }
    getPlayers();
    setDisplaySelect(determineDisableSelectButton);
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
      setPlayers(playerData.data);
    }
  )}

  // Receives a player index that has been selected by the user and either adds that index to the set or removes it
  // If user1 has selected a player, that user cannot select another player but user2 can select a player but not the player user1 selected and vice versa 
  const handlePlayerIndexFromChild = (data, operation, userId) => {
    const newMap = new Map(selectedPlayers);
    if (operation == "add") {
      // newMap.set(data, {user: userId, position: pos});
      newMap.get(userId).set(pos, data)
    } else if (operation == "remove") {
      newMap.get(userId).delete(pos);
    }
    setSelectedPlayers(newMap);
    navigate("/", data);
  }

  // function to determine whether to disable select button in child (DisplayPlayer component)
  // Hardcoded now - Refactor Later
  const determineDisableSelectButton = () => {
    // No player selected
    if (!selectedPlayers.get("user1").get(pos) && !selectedPlayers.get("user2").get(pos)) {
      return {
        "user1": false,
        "user2": false
      };
    // user1 has a player selected but user2 doesn't
    } else if (selectedPlayers.get("user1").get(pos) && !selectedPlayers.get("user2").get(pos)) {
      return {
        "user1": true,
        "user2" : false
      };
    // User2 has a player selected but user1 doesn't
    } else if (!selectedPlayers.get("user1").get(pos) && selectedPlayers.get("user2").get(pos)) {
      return {
        "user1": false,
        "user2": true
      };
    } else {
    // Both have a player selected
      return {
        "user1": true,
        "user2": true
      };
    }
  }


  return (
    <div className="select-player-view-container">
      {/* button to redirect user to the Court component  */}
      <div className="home-button-container">
        <Button variant='contained' style={{width: 100}} className="home-button" onClick={() => navigate("/")}>Home</Button>
      </div>
      {
        players && players.length > 0 ? (
          players.map((player, i) => {
            return <DisplayPlayer key={i} data={player} userId={user} position={pos}
            disableSelectButton={displaySelect} 
            disableCancelButton={hasValue(selectedPlayers, user, player.index)}
            sendPlayerIndexToParent={handlePlayerIndexFromChild}/>
          })
        ) : <></>
      }
    </div>
  )
}
