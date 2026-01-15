import React from 'react';
import Button from '../../../components/common/button/button';
import SearchBar from '../../../components/common/searchbar/searchbar';
import modernhouseimg from '../../../assets/luxury_and_rich_home_exterior_side_view.png';
import './herosection.css';


export default function HeroSection() {
  return (
    <section className="herosection">
      <div className="herosection_top">
        <div className="herosection_content">
          <h1>Find Your Dream Home</h1>
          <p>
            Explore our curated selection of exquisite properties meticulously tailored to your unique dream home vision
          </p>
          <Button variant="primary" size="large">
            Sign up
          </Button>
        </div>
        <div className="herosection_image">
          <img src={modernhouseimg} alt="Modern house" />
        </div>
      </div>
      <div className="herosection_search">
        <SearchBar />
      </div>
    </section>
  );
}



