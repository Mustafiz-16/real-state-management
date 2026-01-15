import React from 'react';
import PropertyCard from '../../../components/common/propertycard/propertycard';
import './popularresidences.css';

import img1 from '../../../assets/WhatsApp Image 2025-11-09 at 20.18.45_de9d3580.jpg';
import img2 from '../../../assets/WhatsApp Image 2025-11-09 at 20.24.34_bb97bdc6.jpg';

export default function PopularResidences() {
  const dummyProperties = [
    {
      id: 1,
      image: img1,
      location: "Ranirbazar, comilla",
      bedrooms: 6,
      sqft: 1800,
      price: "85,00,000",
      type: "Luxury Home"
    },
    {
      id: 2,
      image: img2,
      location: "Ashoktala, comilla",
      bedrooms: 4,
      sqft: 2500,
      price: "1,25,00,000",
      type: "Modern Villa"
    }
  ];

  return (
    <section className="popular-residences">
      <h2 className="popular-residences_title">Our Popular Residences</h2>
      <div className="popular-residences_grid">
        {dummyProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
