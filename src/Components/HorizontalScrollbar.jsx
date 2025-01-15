import React from 'react'
import BodyPArt from './BodyPArt'

const HorizontalScrollbar = ({data, bodyPart, setBodyPart}) => {
  return (
    <div>
        {data.map((item) => (
            <div key={item.id||item}
            itemId={item.id||item}
            title={item.id||item}
            className='scrollbar-2'
            >
            <BodyPArt item={item} setBodyPart={setBodyPart} bodyPart={bodyPart}/>
            </div>
        ))}
    </div>
  )
}

export default HorizontalScrollbar