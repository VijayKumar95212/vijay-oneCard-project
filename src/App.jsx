import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Navbar from "./Componentes/Navbar/Navbar";
import Footer from "./Componentes/Footer/Footer";
import men_banner from "./Componentes/Assest/banner_mens.png";
import women_banner from "./Componentes/Assest/banner_women.png";
import kid_banner from "./Componentes/Assest/banner_kids.png";
import ProtectRouting from "./Componentes/ProtectRouting/ProtectRouting";
import UserProfile from "./Componentes/UserProfile/UserProfile";
import Admin from "./Componentes/admin/Admin";
import CreateProduct from "./Componentes/admin/CreateProduct/CreateProduct";
import GetProduct from "./Componentes/admin/GetAllProduct/GetProduct";
import UpdateProduct from "./Componentes/admin/UpdateProduct/UpdateProduct";



function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
        />
        <Route path="/product" element={<Product />}/>
        <Route path="/product/:productId" element={<Product />}/> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/createproduct" element={<CreateProduct/>} />
          <Route path="/getproduct" element={<GetProduct/>} />
          <Route path="/admin/updateproduct/:productId" element={<UpdateProduct/>} />
         </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
