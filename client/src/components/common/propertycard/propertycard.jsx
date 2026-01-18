import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiHome, FiMaximize2 } from 'react-icons/fi';
import Button from '../button/button';
import Card from '../card/card';
import './propertycard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Helper to get image URL (handles both Cloudinary and local URLs)
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
  // If it's already a full URL (Cloudinary), use it directly
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Otherwise, prepend API URL for legacy local uploads
  return `${API_URL}/${imagePath.replace(/\\/g, '/')}`;
};

export default function PropertyCard({ property }) {
  const { _id, title, location, bedrooms, area, price, propertyType, images } = property;

  // Get the first image or use a placeholder
  const imageUrl = images && images.length > 0 
    ? getImageUrl(images[0])
    : 'https://via.placeholder.com/400x300?text=No+Image';

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toLocaleString('en-IN');
  };

  return (
    <Link to={`/properties/${_id}`} className="property-card-link">
      <Card hoverable className="propertycard">
        <Card.Image src={imageUrl} alt={title || 'Property'} />

        <Card.Body>
          <h3 className="propertycard_title">{title || 'Untitled Property'}</h3>
          <div className="propertycard_location">
            <FiMapPin className="propertycard_icon" />
            <span>{location || 'Location not specified'}</span>
          </div>
          <div className="propertycard_details">
            <div className="propertycard_detail">
              <FiHome className="propertycard_icon" />
              <span>{bedrooms || 0} Beds</span>
            </div>
            <div className="propertycard_detail">
              <FiMaximize2 className="propertycard_icon" />
              <span>{area || 0} sq ft</span>
            </div>
          </div>
        </Card.Body>

        <Card.Footer>
          <div className="propertycard_footer">
            <span className="propertycard_type">{propertyType || 'Property'}</span>
            <span className="propertycard_price">৳{formatPrice(price)}</span>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}
