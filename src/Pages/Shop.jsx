import React from 'react'
import Hero from '../Componentes/Hero/Hero';
import Popular from '../Componentes/Popular/Popular';
import Offers from '../Componentes/Offers/Offers';
import NewCollections from '../Componentes/NewCollections/NewCollections';
import NewsLetter from '../Componentes/NewsLetter/NewsLetter';


const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
      
    </div>
  )
}

export default Shop;
