import React, { useState } from "react";
import "./CreateProduct.css";
import axios from "axios";
import { baseUrlFun } from "../../../Base-url";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock:"",
    category: "",
    description: "",
    image: null,
  });

  const url = baseUrlFun();
const navigate=useNavigate()
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE FROM GALLERY
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct({ ...product, image: file });
  };

  // ✅ CREATE PRODUCT + IMAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("image", product.image); // 🔥 important

      const res = await axios.post(
        `${url}/api/product/itemcreate`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Product created successfully");
      navigate("/getproduct")
      console.log(res.data);

      // reset form
      setProduct({
        name: "",
        price: "",
        stock:"",
        category: "",
        description: "",
        image: null,
      });

    } catch (error) {
      console.error(error);
      alert("❌ Product creation failed");
    }
  };
 



  return (
    <div className="main-content">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Create Product</h1>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
           <input
            type="number"
            name="stock"
            placeholder="Define stock "
            value={product.stock}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <button type="submit" className="btn create">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
