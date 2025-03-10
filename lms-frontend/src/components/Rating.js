import React from 'react'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import '../styles/Rating.css'


function Rating() {
  return (
    <div className='rating-box'>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <p><FaStar/><FaStar/><FaStar/><FaRegStarHalfStroke/><FaRegStar/></p>
    </div>
  )
}

export default Rating