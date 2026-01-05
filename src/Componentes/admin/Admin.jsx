import React from 'react'
import "./Admin.css";
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaHome,
  FaClipboardList,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";




const Admin = () => {
  return (
    <><div className="profile-container">
          {/* Sidebar */}
          <div className="sidebar">
            <h2 className="sidebar-title">My Account</h2>
    
            <ul className="menu-list">
              <li className="menu-item">
                <FaHome /><Link to="/createproduct">create product</Link>
              </li>
              {/* <li className="menu-item ">
                <FaClipboardList /> update product
              </li>
              <li className="menu-item">
                <FaHeart /> delete product
              </li> */}
              <li className="menu-item active">
                <FaUser /><Link to="/getproduct"> Get all products</Link>
              </li>
    
              <li className="menu-item logout">
          
                   <Link to = "/"> <FaSignOutAlt />Back home</Link>
                   
  
              </li>
             </ul>
          </div>
        </div>
        </>
  )
} 
  


export default Admin;
