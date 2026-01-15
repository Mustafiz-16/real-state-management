import React, { useEffect, useState } from "react";
import SearchBar from "../../common/searchbar/SearchBar";
import PropertyGrid from "../propertygrid/propertygrid";
import { getApprovedProperties } from "../../../Api/property.api";
import "./properties.css";

export default function Properties() {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        const res = await getApprovedProperties();
        setAllProperties(res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProperties();
  }, []);

  const handleSearch = (filters) => {
    let results = [...allProperties];

    // Filter by location
    if (filters.location && filters.location.trim() !== '') {
      const searchTerm = filters.location.toLowerCase().trim();
      results = results.filter((property) =>
        property.location?.toLowerCase().includes(searchTerm) ||
        property.title?.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by property type
    if (filters.propertyType && filters.propertyType !== '') {
      results = results.filter(
        (property) => property.propertyType?.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Filter by min price
    if (filters.minPrice && filters.minPrice !== '') {
      const minPrice = parseInt(filters.minPrice);
      results = results.filter((property) => property.price >= minPrice);
    }

    // Filter by max price
    if (filters.maxPrice && filters.maxPrice !== '') {
      const maxPrice = parseInt(filters.maxPrice);
      results = results.filter((property) => property.price <= maxPrice);
    }

    setFilteredProperties(results);
  };

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>Browse Properties</h1>
        <p>Filter and explore our latest properties available for rent and sale.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="properties-loading">
          <div className="loading-spinner"></div>
          <p>Loading properties...</p>
        </div>
      ) : error ? (
        <div className="properties-error">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="properties-count">
            <p>Showing {filteredProperties.length} of {allProperties.length} properties</p>
          </div>
          <PropertyGrid properties={filteredProperties} />
        </>
      )}
    </div>
  );
}






