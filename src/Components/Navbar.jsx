import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import LOGO from './Assets/LOGO-img.jpg'
import './Styles/Navbar.css' 

const Navbar = () => {
    return (
        <div className='container'>
            <div className='logo'>
                <Link to='/'><img src={LOGO} /></Link>
            </div>
            <div className='links'>
                <Link to='/' style={{textDecoration:'none',}}><span>Home</span></Link>
                <Link to='/exercise' style={{textDecoration:'none',}}><span>Exercise</span></Link>
            </div>
        </div>
    )
}

export default Navbar