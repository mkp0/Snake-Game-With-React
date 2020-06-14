import React from 'react'

export default function Snake({snakeDots}) {
    return (
        <div>
            {
                snakeDots.map(
                    (a,b) =>{
                    const style = {
                    left  : `${a[0]}rem`,
                    top : `${a[1]}rem`
                                }
                    return (<div key = {b} className='snakeDot' style={style}>  </div>)
                    }
                )
            }
        </div>
    )
}
