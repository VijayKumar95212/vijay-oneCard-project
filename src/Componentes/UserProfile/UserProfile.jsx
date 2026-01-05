import React, { useState, useEffect, useRef } from "react";
import "./UserProfile.css";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8597";
const defaultAvatar =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(`${BASE_URL}/api/getbyid/${userId}`);
      const u = res.data.user;

      const normalized = {
        name: u?.username || "",
        email: u?.email || "",
        phone: u?.phone || "",
        address: u?.address || "",
        avatar: u?.avatar || "",
      };

      setUser(normalized);
      setFormData(normalized);
    };

    fetchUser();
  }, []);

  /* ================= HANDLERS ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    const userId = localStorage.getItem("userId");
    await axios.put(`${BASE_URL}/api/update/${userId}`, formData);
    setUser(formData);
    setIsEditing(false);
    alert("Profile updated");
  };

  /* ================= AVATAR ================= */
  const openGallery = () => fileInputRef.current.click();

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("avatar", file);

    const userId = localStorage.getItem("userId");
    const res = await axios.post(
      `${BASE_URL}/api/upload-avatar/${userId}`,
      fd
    );

    setUser((prev) => ({
      ...prev,
      avatar: res.data.updatedUser.avatar,
    }));
  };

  const avatarSrc = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${BASE_URL}/uploads/${user.avatar}`
    : defaultAvatar;

  return (
    <div className="profile-container">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="sidebar desktop-only">
        <h2 className="sidebar-title">My Account</h2>

        <ul className="menu-list">
          {role === "admin" && (
            <li className="menu-item">
              <Link to="/admin">
                <FaHome /> My Products
              </Link>
            </li>
          )}

          <li className="menu-item active">
            <FaUser /> Profile
          </li>

          <li className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="mobile-nav">
        <Link to="/profile" className="mobile-item active">
          <FaUser />
          <span>Profile</span>
        </Link>

        {role === "admin" && (
          <Link to="/admin" className="mobile-item">
            <FaHome />
            <span>Admin</span>
          </Link>
        )}

        <button className="mobile-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <img src={avatarSrc} alt="avatar" onClick={openGallery} />

            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleAvatar}
            />

            <div>
              <h2>{user.name || "No Name"}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>

            {!isEditing && (
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="edit-form">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="full"
              />

              <div className="actions">
                <button className="save" onClick={handleUpdateProfile}>
                  Save
                </button>
                <button className="cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
