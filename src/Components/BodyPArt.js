import React from 'react'

const BodyPArt = ({item, setBodyPart , bodyPart}) => {
  return (
    
    <div className='bodyparts'>
        <h4 style={{cursor:'pointer'}}>{item}</h4>
    </div>
  )
}

export default BodyPArt