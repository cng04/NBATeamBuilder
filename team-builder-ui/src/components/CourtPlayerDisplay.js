import React from 'react'
import { Button } from '@mui/material';
import '../css/CourtPlayerDisplay.css';
import { useNavigate } from 'react-router-dom' 

// Component for displaying a selected player in the Court component
export default function CourtPlayerDisplay(props) {
    // Allow for routing in this component
    const navigate = useNavigate();

    // Handles the edit button click and navigates to the selectPlayers view of the appropriate position and user
    const handleEditClick = (click) => {
        navigate("/selectPlayers" + "/" + props.position + "/" + props.user);
    }

  return (
    <>
    <div className="player-container">
        <div className="player-pos">
            <h2>{props.position}:</h2>
        </div>
        <div className="player-name">
            <h2>{props.playerData.Player}</h2>
        </div>
        <div className="player-team">
            <h2>{props.playerData.Tm}</h2>
        </div>
        <Button variant="outlined" color="info" style={{marginLeft: 20}} onClick={handleEditClick}>Edit</Button>
    </div>
    </>
    
  )
}
