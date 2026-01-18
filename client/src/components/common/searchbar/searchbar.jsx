import React, { useState } from 'react';
import { FiMapPin, FiHome, FiDollarSign, FiSearch } from 'react-icons/fi';
import Button from '../button/button';
import './searchbar.css';

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleClear = () => {
    setFilters({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
    });
    if (onSearch) {
      onSearch({});
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <div className="searchbar_group">
        <div className="searchbar_field">
          <FiMapPin className="searchbar_icon" />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Search by location..."
            className="searchbar_input"
          />
        </div>

        <div className="searchbar_divider"></div>

        <div className="searchbar_field">
          <FiHome className="searchbar_icon" />
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="searchbar_input searchbar_select"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="searchbar_divider"></div>

        <div className="searchbar_field searchbar_field--price">
          <FiDollarSign className="searchbar_icon" />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="searchbar_input searchbar_input--small"
          />
          <span className="searchbar_price-separator">-</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="searchbar_input searchbar_input--small"
          />
        </div>
      </div>

      <div className="searchbar_actions">
        <Button type="button" variant="secondary" size="medium" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit" variant="primary" size="medium">
          <FiSearch className="searchbar_btn-icon" /> Search
        </Button>
      </div>
    </form>
  );
}
