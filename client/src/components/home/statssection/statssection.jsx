import React from 'react';
import './statssection.css';
import modernhouseimg from '../../../assets/luxury_and_rich_home_exterior_side_view.png';

export default function StatsSection() {
  return (
    <section className="statssection">
      <div className="statssection_image">
        <img src={modernhouseimg} alt="Modern house" />
      </div>
      <div className="statssection_content">
        <h2>We Help You To Find<br/>Your Dream Home</h2>
        <p>
          From cozy cottages to luxurious estates, our dedicated team guides you through every step of the journey, ensuring your dream home becomes a reality
        </p>
        <div className="statssection_number">
          <div>
            <h3>6K+</h3>
            <span>Houses Sold</span>
          </div>
          <div>
            <h3>2K+</h3>
            <span>Trusted Agents</span>
          </div>
        </div>
      </div>
    </section>
  );
}
