import React from 'react'
import '../css/Header.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

export default function Header() {
    // Allow for routing in this component
    const navigate = useNavigate();

    const handleClick = (click) => {
        if (click.target.value === "add") {
            navigate("/addPlayers");
        } else {
            // navigate("/editAddedPlayers");
        }
    }

  return (
    <>
        <div className="header-container">
             <Button value="add" style={{marginRight: 20}} variant="outlined" onClick={handleClick}>Add Player</Button>
             <Button value="edit" style={{marginRight: 20}} variant="outlined" onClick={handleClick}>Edit Added Players</Button>
        </div>
    </>
  )
}
