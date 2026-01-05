import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Getproduct.css";
import { Link } from "react-router-dom";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const API_ROOT = "http://localhost:8597/api/product";

  // 🔹 Get all products
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${API_ROOT}/listproducts`);
      // console.log("responnnn",res);
      
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_ROOT}/deleteproduct/${id}`);
      alert("Product deleted successfully");
      getAllProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // 🔍 Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="profile-card">
        <div className="profile-header">
          <h1>All Products</h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search product..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td className="action-btns">
                   <Link to={`/admin/updateproduct/${item._id}`} className="btn update"> <button
                      // className="btn update"
                      // onClick={() =>
                      //   (window.location.href = `/admin/updateproduct/${item._id}`)
                      // }
                    >
                     Update
                    </button></Link>

                    <button
                      className="btn delete"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetProduct;
