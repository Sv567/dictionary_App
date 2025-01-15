import React, { useEffect } from 'react'
import { exerciseOptions, fetchData } from './utils/fetchData'
import ExerciseCart from './ExerciseCart'
import { Pagination } from '@mui/material'
import { useState } from 'react'
import ExercisePage from './Pages/ExercisePage'
import './Styles/HomePage.css'

const Exercises = ({ exercises, setExercises, bodyPart }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPErPage = 9;

  const indexOFLastExercise = currentPage * exercisesPErPage;

  const indexOFfirstExercise = indexOFLastExercise - exercisesPErPage;

  const currentExercises = exercises.slice(indexOFfirstExercise, indexOFLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scroll({ top: 1800, behavior: 'smooth' })
  }

  useEffect(() => {

    const fetchExercisesData = async () => {
      let exerciseData = [];
      if (bodyPart === 'all') {
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      } else {
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises${bodyPart}`, exerciseOptions)
      }
      setExercises(exerciseData)
    }
    fetchExercisesData();
  }, [bodyPart, setExercises])
  return (
    <>
    <h3 style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Showing Results</h3>
      <div className='exercises-field'  >
        {currentExercises.map((exercise) => (
          <div key={exercise.id}>
            <ExerciseCart exercise={exercise} />
          </div>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        {exercises.length > (exercisesPErPage) && <Pagination color='standard' shape='rounded' defaultPage={1} count={Math.ceil(exercises.length / 9)} page={currentPage} onChange={(e, value) => paginate(e, value)} size='large' />}
      </div>
    </>
  )
}

export default Exercises