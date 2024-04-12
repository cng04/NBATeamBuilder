import React, { useContext, useEffect } from 'react'
import bballCourt from '../images/ballCourt.jpeg'
import '../css/Court.css'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../App';
import { Button } from '@mui/material';


export default function Court(props) {
  // Holds the selectedPlayers data, the posSelected data from the context initialized in App.js
  const [selectedPlayers, setSelectedPlayers, posSelected, setPosSelected] = useContext(PlayerContext);

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
          <img className="court-image" src={bballCourt}/>
          <div className="user1">
            <Button value="PG" user="user1" onClick={handleClick}>PG</Button>
            <Button value="SG" user="user1" onClick={handleClick}>SG</Button>
            <Button value="SF" user="user1" onClick={handleClick}>SF</Button>
            <Button value="PF" user="user1" onClick={handleClick}>PF</Button>
            <Button value="C" user="user1" onClick={handleClick}>C</Button>
          </div>
          <div className="user2">
            <Button variant="contained" value="PG" user="user2" onClick={handleClick}>PG</Button>
            <Button variant="contained" value="SG" user="user2" onClick={handleClick}>SG</Button>
            <Button variant="contained" value="SF" user="user2" onClick={handleClick}>SF</Button>
            <Button variant="contained" value="PF" user="user2" onClick={handleClick}>PF</Button>
            <Button variant="contained" value="C" user="user2" onClick={handleClick}>C</Button>
          </div>
      </div>
      <div className="render-players-container">
        <div className="user1-players">
          {
            selectedPlayers.get("user1") && selectedPlayers.get("user1").size > 0 ? (
              Array.from(selectedPlayers.get("user1").values()).map((value, index) => {
                return <h1>{value.Player}</h1>
              })
              // For some reason the params have to be ordered as (value, key) 
              // selectedPlayers.get("user1").forEach((value, key) => {
              //   return <h1>Hello</h1>;
              // })
            ) : <h1>Team 1 not Selected</h1>
          }
        </div>
        <div className="user2-players">
        {
            selectedPlayers.get("user2") && selectedPlayers.get("user1").size > 0 ? (
              Array.from(selectedPlayers.get("user2").values()).map((value, index) => {
                return <h1>{value.Player}</h1>
              })
              // For some reason the params have to be ordered as (value, key) 
              // selectedPlayers.get("user1").forEach((value, key) => {
              //   return <h1>Hello</h1>;
              // })
            ) : <h1>Team 2 Not Selected</h1>
          }
        </div>
      </div>
    </>
  )
}
