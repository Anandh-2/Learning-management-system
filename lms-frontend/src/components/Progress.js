import React from 'react'
import '../styles/Progress.css'

function Progress({value}) {
  return (
    <svg width={80} height={80}>
    <circle
        stroke='#253D2C'
        r={10}
        cx={2}
        cy={2}
    />
    </svg>
  )
}

export default Progress