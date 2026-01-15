import React from 'react';
import './featurecard.css';

export default function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="featurecard" style={{ backgroundColor: bgColor }}>
      <div className="featurecard_icon">
        {icon}
      </div>
      <h3 className="featurecard_title">{title}</h3>
      <p className="featurecard_description">{description}</p>
    </div>
  );
}
