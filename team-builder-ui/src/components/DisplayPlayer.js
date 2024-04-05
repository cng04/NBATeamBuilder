import React, { useState, useEffect } from 'react';
import '../css/DisplayPlayer.css';
import { Button } from '@mui/material';

// This component displays each player "row" in the SelectPlayersView Component
export default function DisplayPlayer(props) {
  // State to hold player object
  const [player, setPlayer] = useState({});

  // State to disable select button when button is selected
  const [disabledSelect, setDisabledSelect] = useState(false);

  // State to disable select button when button is selected
  const [disabledCancel, setDisabledCancel] = useState(true);

  // Setting the player to be the object passed as a prop from SelectPlayersView 
  // Player Component
  useEffect(() => {
    setPlayer(props.data);
    console.log(props.disableSelectButton);
    setDisabledSelect(props.disableSelectButton);
    setDisabledCancel(!props.disableCancelButton);
  })

  const handleSelectButton = (click) => {
    props.sendPlayerIndexToParent(player.index, "add");
    // setDisabledSelect(true);
    // setDisabledCancel(false);
    // notifyParentofSelected(player.index);
    // setSelectedPlayer(player);
  }

  const handleCancelButton = (click) => {
    props.sendPlayerIndexToParent(player.index, "remove");
    // setDisabledSelect(false);
    // setDisabledCancel(true);
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
