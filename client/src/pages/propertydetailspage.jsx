import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import axios from "../Api/axios.js";
import { getPropertyById } from "../Api/property.api";
import { FiArrowLeft, FiMapPin, FiHome, FiMaximize2, FiCalendar, FiUser } from "react-icons/fi";
import "./propertydetailspage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Helper to get image URL (handles both Cloudinary and local URLs)
const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/800x500?text=No+Image";
  // If it's already a full URL (Cloudinary), use it directly
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Otherwise, prepend API URL for legacy local uploads
  return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
};

function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property", err);
        setError("Property not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleMessageOwner = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!property?._id || !property?.owner_id?._id) {
      console.error("Property ID or Owner ID is missing!");
      alert("Unable to start conversation. Property information is missing.");
      return;
    }

    // Don't allow owner to message themselves
    if (property.owner_id._id === user._id) {
      alert("You cannot message yourself!");
      return;
    }

    const payload = {
      propertyId: property._id,
      ownerId: property.owner_id._id,
    };

    try {
      // Use the imported API instance which handles token automatically
      const res = await axios.post("/conversations", payload);
      const conversation = res.data;
      
      // Navigate to appropriate dashboard based on user role
      const dashboardPath = user.role === "owner" ? "/dashboard/owner" : "/dashboard/buyer";
      navigate(dashboardPath, {
        state: { openConversationId: conversation._id, activeTab: "messages" },
      });
    } catch (err) {
      console.error("Failed to start conversation", err.response?.data || err.message);
      alert("Failed to start conversation. Please try again.");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toLocaleString("en-IN");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="property-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading property details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div>
        <Navbar />
        <main className="property-details-error">
          <h1>Property not found</h1>
          <p>{error || "The property you're looking for doesn't exist."}</p>
          <Link to="/properties" className="back-link">
            <FiArrowLeft /> Back to Properties
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="property-details-page">
      <Navbar />

      <main className="property-details-main">
        <Link to="/properties" className="back-link">
          <FiArrowLeft /> Back to Properties
        </Link>

        <div className="property-details-content">
          {/* Image Gallery */}
          <section className="property-gallery">
            <div className="gallery-main">
              <img
                src={getImageUrl(property.images?.[activeImage])}
                alt={property.title}
                className="gallery-main-image"
              />
            </div>
            {property.images && property.images.length > 1 && (
              <div className="gallery-thumbnails">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={getImageUrl(img)} alt={`${property.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Property Info */}
          <div className="property-info-grid">
            <section className="property-main-info">
              <div className="property-header">
                <div>
                  <span className="property-type-badge">{property.propertyType || "Property"}</span>
                  <h1 className="property-title">{property.title}</h1>
                  <div className="property-location">
                    <FiMapPin />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="property-price">
                  <span className="price-label">Price</span>
                  <span className="price-value">৳{formatPrice(property.price)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="property-features">
                <h2>Property Features</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <FiHome className="feature-icon" />
                    <div>
                      <span className="feature-label">Bedrooms</span>
                      <span className="feature-value">{property.bedrooms || 0}</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <FiHome className="feature-icon" />
                    <div>
                      <span className="feature-label">Bathrooms</span>
                      <span className="feature-value">{property.bathrooms || 0}</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <FiMaximize2 className="feature-icon" />
                    <div>
                      <span className="feature-label">Area</span>
                      <span className="feature-value">{property.area || 0} sq ft</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <FiCalendar className="feature-icon" />
                    <div>
                      <span className="feature-label">Listed On</span>
                      <span className="feature-value">{formatDate(property.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="property-description">
                <h2>Description</h2>
                <p>{property.description || "No description available."}</p>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="property-sidebar">
              <div className="sidebar-card">
                <h3>Interested in this property?</h3>

                {property.owner_id && (
                  <div className="owner-info">
                    <FiUser className="owner-icon" />
                    <div>
                      <span className="owner-label">Listed by</span>
                      <span className="owner-name">{property.owner_id.name || "Owner"}</span>
                    </div>
                  </div>
                )}

                <div className="sidebar-actions">
                  <button className="btn-primary" onClick={handleMessageOwner}>
                    Message Owner
                  </button>
                  <button className="btn-secondary">Request Visit</button>
                  <button className="btn-outline">Save Property</button>
                </div>

                <p className="sidebar-help">📞 Need help? Contact our support team</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PropertyDetailsPage;
