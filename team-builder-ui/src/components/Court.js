import React, { useContext, useEffect, useState } from 'react'
import bballCourt from '../images/ballCourt.jpeg'
import '../css/Court.css'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../App';
import { Button } from '@mui/material';
import CourtPlayerDisplay from './CourtPlayerDisplay';
import { searchMapForPos } from '../utility/Utility';


export default function Court(props) {
  // Holds the selectedPlayers data, the posSelected data from the context initialized in App.js
  const [selectedPlayers, setSelectedPlayers, posSelected, setPosSelected] = useContext(PlayerContext);

  // Positions on an NBA Team
  const [ listOfPos, setListOfPos ] = useState(["PG", "SG", "SF", "PF", "C"]);

  useEffect(() => {
    console.log(selectedPlayers);
  }, [])

  // Allow for routing in this component
  const navigate = useNavigate();

  // Function to redirect to SelectPlayerView based on which position is selected
  // Redirects to url with appropriate position as the param
  const handleClick = async (click) => {
    // Accessing the custom attribute user in the Button jsx elemenets below
    const user = click.target.getAttribute("user");
    navigate("/selectPlayers" + "/" + click.target.value + "/" + user);
  }

  return (
    <>
      <div className="court-container">
          {/* <img className="court-image" src={bballCourt}/> */}
          <div className="player-select-container">
            <div className="player-select">
              {
                listOfPos.map((pos) => {
                  return (searchMapForPos(selectedPlayers, "user1", pos)) ? (
                    <CourtPlayerDisplay user={"user1"} className="player" position={pos} playerData={selectedPlayers.get("user1").get(pos)}/> 
                  ) :
                  (
                    <Button style={{marginTop: 60}} value={pos} user="user1" onClick={handleClick}>{pos}</Button>
                  )
                })
              }
            </div>
            <div className="player-select">
              {
                listOfPos.map((pos) => {
                  return (searchMapForPos(selectedPlayers, "user2", pos)) ? (
                    <CourtPlayerDisplay user={"user2"} className="player" position={pos} playerData={selectedPlayers.get("user2").get(pos)}/> 
                  ) :
                  (
                    <Button style={{marginTop: 60}} color="secondary" value={pos} user="user2" onClick={handleClick}>{pos}</Button>
                  )
                })
              }
            </div>
          </div>
      </div>
    </>
  )
}
