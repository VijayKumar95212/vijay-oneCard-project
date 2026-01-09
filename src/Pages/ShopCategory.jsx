import React, { useContext, useEffect, useState } from "react";
import "./Css/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Componentes/Assest/dropdown_icon.png";
import Item from "../Componentes/Item/Item";
import axios from "axios";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [dbproducts, setDbProducts] = useState([]);

 useEffect(() => {
  const productGet = async () => {
    try {
      const res = await axios.get(
        "https://onecard-backend.onrender.com/api/product/listproducts"
      );

      const normalizedDbProducts = res.data.products.map((item) => ({
        id: item._id,
        name: item.name,
        image: `https://onecard-backend.onrender.com/uploads/${item.image}`,
        new_price: item.price,
        old_price: item.old_price || item.price,
        category: item.category.toLowerCase(),
      }));

      setDbProducts(normalizedDbProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  productGet();
}, []);


   // 🔹 Normalize context products
  const normalizedContextProducts = all_product.map((item) => ({
    ...item,
    category: item.category.toLowerCase(),
  }));

  // 🔹 Combine both sources
  const combinedProducts = [
    ...normalizedContextProducts,
    ...dbproducts,
  ];
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span>out of 36 products
        </p>
        <div className="shopcategry-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {/* {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      {/* <div className="shopcategory-products">
        {products.map((item) => (
          <div key={item._id}>
            {item.name}
            <p>{item.price}</p>
            <img src={`https://onecard-backend.onrender.com/uploads/${item.image}`} alt="" />
            <p>{item.category}</p>
          </div>
        ))}
      </div> */}
 {/* <div className="shopcategory-products">
        {products.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={`https://onecard-backend.onrender.com/uploads/${item.image}`}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })} */} 
  {combinedProducts
          .filter(
            (item) =>
              item.category === props.category.toLowerCase()
          )
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}

      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};

export default ShopCategory;
