import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateProduct.css"; // reuse same CSS
import { useParams, useNavigate } from "react-router-dom";
import { baseUrlFun } from "../../../Base-url";

const UpdateProduct = () => {
  const { productId } = useParams();
  const id = productId; // product id from URL
  // console.log("tttttt",id)
  const navigate = useNavigate();
  const url = baseUrlFun();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  });

  const [oldImage, setOldImage] = useState("");

  // 🔹 Get product by id
  const getProductById = async () => {
    try {
      const res = await axios.get(`${url}/api/product/productbyId/${id}`);

      const p = res.data.product;

      setProduct({
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category,
        description: p.description,
        image: null, // new image optional
      });

      setOldImage(p.image); // existing image
    } catch (error) {
      console.error("Fetch product failed:", error);
    }
  };

  useEffect(() => {
  // console.log("Product ID:", productId);

  if (productId) {
    getProductById();
  }
}, [productId]);


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  // 🔹 Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("description", product.description);

      // image only if changed
      if (product.image) {
        formData.append("image", product.image);
      }

      await axios.put(`${url}/api/product/productupdate/${id}`, formData);

      alert("✅ Product updated successfully");
    navigate(`/getproduct`); // or wherever your list page is
    } catch (error) {
      console.error("Update failed:", error.response?.data || error);
      alert("❌ Product update failed");
    }
  };

  return (
    <div className="main-content">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Update Product</h1>
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
            placeholder="Define stock"
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
            <option value="kids">Kids</option>
          </select>

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          />

          {/* Show old image */}
          {oldImage && (
            <div style={{ marginBottom: "10px" }}>
              <p>Current Image:</p>
              <img src={`${url}/${oldImage}`} alt="product" width="120" />
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button type="submit" className="btn create">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
