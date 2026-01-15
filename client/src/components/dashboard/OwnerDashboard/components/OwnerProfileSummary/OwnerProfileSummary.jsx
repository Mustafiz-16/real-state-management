import React from "react";
import "./ownerprofile.css";

export default function OwnerProfileSummary({ owner }) {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="owner-profile-summary">
      <div className="profile-avatar">{owner.name.charAt(0)}</div>
      <div className="profile-info">
        <div className="profile-name">{owner.name}</div>
        <div className="profile-email">{owner.email}</div>
        <div className="profile-stats">
          <span>{owner.propertiesCount} Properties</span>
          <span>{owner.bookingsCount} Bookings</span>
          <span>{owner.documentsCount} Documents</span>
        </div>
      </div>
    </div>
  );
}
