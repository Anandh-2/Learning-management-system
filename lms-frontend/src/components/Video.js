import React from 'react'

function Video() {
  return (
    <div>
        <h1>{course.name}</h1>
          <iframe
            width="768"
            height="480"
            src="https://www.youtube.com/embed/Ky7CA0eR1c0"
            title="video"
          />
    </div>
  )
}

export default Video