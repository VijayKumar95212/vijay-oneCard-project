import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Componentes/Breadcrum/Breadcrum';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Componentes/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Componentes/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Componentes/Relatedproduct/RelatedProduct';

const Product = () => {
 const {all_product} = useContext(ShopContext);
 const {productId} = useParams();
 const product = all_product.find((e)=> e.id === Number(productId))
  return (
    <div className=''>
      <Breadcrum product = {product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox/>
      <RelatedProduct/>
    </div>
  )
}

export default Product;
