import React from "react";
import PropertyCard from "../../common/propertycard/PropertyCard";
import "./propertygrid.css";

export default function PropertyGrid({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="propertygrid-empty">
        <p>No properties found matching your criteria.</p>
      </div>
    );
  }

  return (
    <section className="propertygrid">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </section>
  );
}
