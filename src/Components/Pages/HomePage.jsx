import React, { useState } from 'react'
import HeroBanner from '../HeroBanner'
import SearchExercises from '../SearchExercises'
import Exercises from '../Exercises'

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState([])

  return (
    <div>
      <HeroBanner />
      <SearchExercises
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        setExercises={setExercises} />
      <Exercises
        bodyPart={bodyPart}
        exercises={exercises}
        setExercises={setExercises}
      />
    </div>
  )
}

export default HomePage