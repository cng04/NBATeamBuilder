import React from 'react'
import '../css/DisplayPlayer.css'

export default function DisplayPlayer(props) {
  return (
    <>
      <div className="players">{props.data.Player}</div>
    </>
    
  )
}
