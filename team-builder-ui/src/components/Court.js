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
        {
          selectedPlayers && selectedPlayers.size > 0 ? (
            selectedPlayers.forEach((values, keys) => {
              console.log(values);
            })
          ) : <></>
        }
      </div>
    </>
  )
}
