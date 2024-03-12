import React from 'react'
import bballCourt from '../images/ballCourt.jpeg'
import '../css/Court.css'


export default function Court(props) {
  return (
    <>
      <div className="court-container">
        <img className="court-image" src={bballCourt}/>
      </div>
    </>
  )
}
