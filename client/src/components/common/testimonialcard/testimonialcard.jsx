import React from 'react';
import { FiStar } from 'react-icons/fi';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial }) {
  const { name, location, rating, image, review } = testimonial;

  return (
    <div className="testimonialcard">
      <div className="testimonialcard_image">
        <img src={image} alt={name} />
      </div>
      
      <div className="testimonialcard_content">
        <div className="testimonialcard_header">
          <div>
            <h4 className="testimonialcard_name">{name}</h4>
            <p className="testimonialcard_location">{location}</p>
          </div>
          <div className="testimonialcard_rating">
            <FiStar className="star-icon" />
            <span>{rating}</span>
          </div>
        </div>
        
        <p className="testimonialcard_review">{review}</p>
      </div>
    </div>
  );
}
