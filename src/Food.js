import React from 'react'

export default function Food({Dot}) {

    const style={
        left : `${Dot[0]}rem`,
        top : `${Dot[1]}rem`,
    }

    return (
        <div  className='snakeFood' style={style}>     
        </div>
    )
}
