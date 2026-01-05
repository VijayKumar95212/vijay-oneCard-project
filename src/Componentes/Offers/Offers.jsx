import React from 'react'
import './Offer.css';
import exclucive_image from '../Assest/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
         <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
         </div>
         <div className="offers-right"></div>
      <img src={exclucive_image} alt="" />   
      
    </div>
  )
}

export default Offers;
