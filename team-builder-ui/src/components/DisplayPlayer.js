import React, { useContext, useState, useEffect } from 'react';
import '../css/DisplayPlayer.css';
import { Button } from '@mui/material';
import { PlayerContext } from '../App';
import { hasValue, searchUser, searchSelectedPos } from '../utility/Utility';


// This component displays each player "row" in the SelectPlayersView Component
export default function DisplayPlayer(props) {
  // State to hold player object
  const [player, setPlayer] = useState({});

  // State to disable select button when button is selected
  const [disabledSelect, setDisabledSelect] = useState(false);

  // State to disable select button when button is selected
  const [disabledCancel, setDisabledCancel] = useState(true);

  // Holds the selectedPlayers data, the posSelected data from the context initialized in App.js
  const [selectedPlayers, setSelectedPlayers, posSelected, setPosSelected] = useContext(PlayerContext);

  // Setting the player to be the object passed as a prop from SelectPlayersView 
  // Player Component
  useEffect(() => {
    setPlayer(props.data);
    let primaryUser = props.userId;
    setDisabledSelect(props.disableSelectButton[primaryUser]);
    setDisabledCancel(!props.disableCancelButton);

    console.log(searchSelectedPos(selectedPlayers, props.data.index, "position"));
    // console.log(props.position);

    // If player has been selected and (the primaryUser is not the user that selected the player OR the position tab is not the position that the player was originally selected from), disable both select and cancel buttons
    if (hasValue(selectedPlayers, props.data.index) && (primaryUser != searchUser(selectedPlayers, props.data.index, "user") || searchSelectedPos(selectedPlayers, props.data.index, "position") !== props.position)){
      setDisabledSelect(true);
      setDisabledCancel(true);
    }
  }, [])

  const handleSelectButton = (click) => {
    props.sendPlayerIndexToParent(player, "add", props.userId);
  }

  const handleCancelButton = (click) => {
    props.sendPlayerIndexToParent(player, "remove", props.userId);
  }

  return (
    <>
    {
      // console.log(disabledSelect)
    }
      <div className="player-container">
        <div className="player-name">
          {player.Player}
        </div>
        <div className="player-pos">
          {player.Pos}
        </div>
        <div className="player-team">
          {player.Tm}
        </div>
        <div className="player-age">
          {player.Age}
        </div>
        <Button variant='contained' disabled={disabledSelect} className="select-button" style={{marginLeft: 20}} onClick={handleSelectButton}>Select</Button>
        <Button variant='contained' color='error' disabled={disabledCancel} className="cancel-button" style={{marginLeft: 20}} onClick={handleCancelButton}>Cancel</Button>

      </div>
    </>
    
  )
}
