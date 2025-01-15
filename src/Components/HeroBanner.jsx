import { Button } from '@mui/material'
import React from 'react'
import './Styles/HomePage.css'
import { Link } from 'react-router-dom'

const HeroBanner = () => {
  return (
    <div className='hp-container'>
        <p>FASTER, STRONGER <br/>FIGHT TO THE END</p>
        <Link to='/exercise'><button>Explore Exercises</button></Link>
    </div>
  )
}

export default HeroBanner