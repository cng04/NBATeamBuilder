import React, { useState, useEffect, useContext } from 'react'
import bballCourt from '../images/ballCourt.jpeg'
import '../css/Court.css'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../App'

export default function Court(props) {

  useEffect(() => {
  }, [])

  // Allow for routing in this component
  const navigate = useNavigate();

  // Function to redirect to SelectPlayerView based on which position is selected
  // Redirects to url with appropriate position as the param
  const handleClick = async (click) => {
    navigate("/selectPlayers" + "/" + click.target.value);
  }

  return (
    <>
      <div className="court-container">
        <>
        <img className="court-image" src={bballCourt}/>
        <button value="PG" onClick={handleClick}>PG</button>
        <button value="SG" onClick={handleClick}>SG</button>
        <button value="SF" onClick={handleClick}>SF</button>
        <button value="PF" onClick={handleClick}>PF</button>
        <button value="C" onClick={handleClick}>C</button>
        </>
      </div>
    </>
  )
}
