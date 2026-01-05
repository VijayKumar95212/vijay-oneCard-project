import React from 'react'
import './Breadcrum.css';
import arrow_icon from '../Assest/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='bradcrum'>
        HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}                                               
      
    </div>
  )
}

export default Breadcrum;
