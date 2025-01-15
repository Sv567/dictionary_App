import React from 'react'
import { Link } from 'react-router-dom'
import './Styles/HomePage.css'

const ExerciseCart = ({exercise}) => {
  return (
    <div className='exercise-card'>
        <Link to={`/exercise/${exercise.id}`} style={{textDecoration:'none'}}>
            <img src={exercise.gifUrl} alt={exercise.name} loading='lazy'/>
            <div className='btn' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <button>{exercise.target}</button>
                <button>{exercise.bodyPart}</button>
                <button>{exercise.target}</button>
            </div>
            <p className='exercise-name'>{exercise.name}</p>
        </Link>
    </div>
  )
}

export default ExerciseCart