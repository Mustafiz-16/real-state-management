// import React from "react";
// import "./propertyApproval.css";

// export default function PropertyApprovalCard({ property, onApprove, onReject }) {
//   return (
//     <div className="admin-property-card">
//       <h3>{property.title}</h3>

//       <p><b>Owner:</b> {property.owner?.name}</p>
//       <p><b>Location:</b> {property.location}</p>
//       <p><b>Price:</b> ৳{property.price}</p>
//       <p><b>Description:</b> {property.description}</p>

//       {property.images?.length > 0 && (
//         <div className="admin-image-preview">
//           {property.images.map((img, i) => (
//             <img key={i} src={img} alt="property" />
//           ))}
//         </div>
//       )}

//       <div className="admin-actions">
//         <button
//           className="approve-btn"
//           onClick={() => onApprove(property._id)}
//         >
//           Approve
//         </button>

//         <button
//           className="reject-btn"
//           onClick={() => onReject(property._id)}
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./propertyApproval.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Helper to get URL (handles both Cloudinary and local URLs)
const getMediaUrl = (url) => {
  if (!url) return null;
  // If it's already a full URL (Cloudinary), use it directly
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Otherwise, prepend API URL for legacy local uploads
  return `${API_URL}/${url.replace(/\\/g, "/")}`;
};

export default function PropertyApprovalCard({
  property,
  onApprove,
  onReject,
}) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    onReject(property._id, rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
  };

  return (
    <div className="property-card-container">
      {/* Images */}
      <div className="property-image-gallery">
        {property.images?.length > 0 ? (
          property.images.map((img, i) => (
            <div key={i} className="img-wrapper">
              <img src={getMediaUrl(img)} alt={`Property ${i}`} />
            </div>
          ))
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      {/* Details */}
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>

        <div className="info-grid">
          <p>
            <span>Owner:</span> {property.owner?.name}
          </p>
          <p>
            <span>Location:</span> {property.location}
          </p>
          <p>
            <span>Price:</span> ৳{property.price}
          </p>
        </div>

        <p className="description">
          <span>Description:</span> {property.description}
        </p>

        {/* ✅ DOCUMENTS SECTION */}
        {property.documents?.length > 0 && (
          <div className="document-section">
            <h4>Property Documents</h4>
            <ul>
              {property.documents.map((doc, idx) => (
                <li key={idx}>
                  📄{" "}
                  <a href={getMediaUrl(doc)} target="_blank" rel="noreferrer">
                    Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="admin-actions">
          <button
            className="btn approve-btn"
            onClick={() => onApprove(property._id)}
          >
            ✅ Approve
          </button>
          <button
            className="btn reject-btn"
            onClick={() => setShowRejectModal(true)}
          >
            ❌ Reject
          </button>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reject Property</h3>
            <p>Please provide a reason for rejecting "{property.title}":</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
            />
            <div className="modal-actions">
              <button
                className="btn cancel-btn"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>
              <button className="btn reject-btn" onClick={handleReject}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
