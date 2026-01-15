// import React, { useState } from "react";
// import {
//   uploadPropertyImage,
//   uploadDocument
// } from "../../../../../../Api/property.api";

// export default function PropertiesTab({
//   properties,
//   addProperty,
//   deleteProperty,
//   updateProperty,
// }) {
//   const [formData, setFormData] = useState({
//     _id: null,
//     title: "",
//     description: "",
//     location: "",
//     price: "",
//     images: [],
//     documents: [],
//   });

//   const isEditMode = !!formData._id;

//   /* ---------------- FORM HANDLERS ---------------- */
//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImagesChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...Array.from(e.target.files)],
//     }));
//     e.target.value = null;
//   };

//   const handleDocumentsChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       documents: [...prev.documents, ...Array.from(e.target.files)],
//     }));
//     e.target.value = null;
//   };

//   const resetForm = () => {
//     setFormData({
//       _id: null,
//       title: "",
//       description: "",
//       location: "",
//       price: "",
//       images: [],
//       documents: [],
//     });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (isEditMode) {
//   //     updateProperty(formData); // backend PUT later
//   //   } else {
//   //     addProperty(formData);
//   //   }

//   //   resetForm();
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 1️⃣ create property
//       const res = await addProperty({
//         title: formData.title,
//         description: formData.description,
//         location: formData.location,
//         price: formData.price,
//       });

//       const propertyId = res._id;

//       // 2️⃣ upload images
//       for (let img of formData.images) {
//         await uploadPropertyImage(propertyId, img);
//       }

//       // 3️⃣ upload documents
//       for (let doc of formData.documents) {
//         await uploadDocument(propertyId, doc, "Other");
//       }

//       resetForm();
//       alert("Property submitted for approval");
//     } catch (err) {
//       alert("Failed to submit property");
//     }
//   };


//   const handleEdit = (property) => {
//     setFormData({
//       _id: property._id,
//       title: property.title,
//       description: property.description,
//       location: property.location,
//       price: property.price,
//       images: [],
//       documents: [],
//     });
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="properties-tab">
//       <h3>
//         {isEditMode ? "Edit Property" : "Add New Property"} (Admin Approval Required)
//       </h3>

//       {/* ================= FORM ================= */}
//       <form onSubmit={handleSubmit} className="property-form">
//         <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
//         <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

//         {/* IMAGES */}
//         <label>
//           Property Images
//           <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
//         </label>

//         {formData.images.length > 0 && (
//           <div className="image-preview">
//             {formData.images.map((file, i) => (
//               <img key={i} src={URL.createObjectURL(file)} alt="preview" width={100} />
//             ))}
//           </div>
//         )}

//         {/* DOCUMENTS */}
//         <label>
//           Property Documents
//           <input type="file" multiple accept="application/pdf,image/*" onChange={handleDocumentsChange} />
//         </label>

//         {formData.documents.length > 0 && (
//           <ul>
//             {formData.documents.map((f, i) => <li key={i}>📄 {f.name}</li>)}
//           </ul>
//         )}

//         <button type="submit">
//           {isEditMode ? "Update Property" : "Submit for Approval"}
//         </button>

//         {isEditMode && (
//           <button type="button" onClick={resetForm}>
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       <hr />

//       {/* ================= LIST ================= */}
//       <h3>Your Submitted Properties</h3>

//       <ul className="property-list">
//         {properties.map(p => (
//           <li key={p._id} className="property-card">
//             <h4>{p.title}</h4>
//             <p>{p.location}</p>
//             <p>৳ {p.price}</p>
//             <p>Status: <b>{p.status}</b></p>

//             {/* IMAGES */}
//             {p.images?.length > 0 && (
//               <div>
//                 {p.images.map((img, i) => (
//                   <img key={i} src={img} alt="property" width={120} />
//                 ))}
//               </div>
//             )}

//             {/* DOCUMENTS */}
//             {p.documents?.length > 0 && (
//               <ul>
//                 {p.documents.map((doc, i) => (
//                   <li key={i}>
//                     <a href={doc} target="_blank" rel="noreferrer">
//                       Document {i + 1}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* ACTIONS */}
//             {(p.status === "Pending" || p.status === "Rejected") && (
//               <div>
//                 <button onClick={() => handleEdit(p)}>Edit</button>
//                 <button onClick={() => deleteProperty(p._id)}>Delete</button>
//               </div>
//             )}

//             {p.status === "Approved" && (
//               <p style={{ color: "green" }}>
//                 ✔ Approved — Editing Disabled
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { uploadPropertyImage, uploadDocument } from "../../../../../../Api/property.api";

// export default function PropertiesTab({ properties, addProperty, deleteProperty, updateProperty }) {
//   const [formData, setFormData] = useState({
//     _id: null,
//     title: "",
//     description: "",
//     location: "",
//     price: "",
//     images: [],
//     documents: [],
//   });

//   const isEditMode = !!formData._id;

//   /* ---------------- FORM HANDLERS ---------------- */
//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleImagesChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...Array.from(e.target.files)],
//     }));
//     e.target.value = null;
//   };

//   const handleDocumentsChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       documents: [...prev.documents, ...Array.from(e.target.files)],
//     }));
//     e.target.value = null;
//   };

//   const resetForm = () => {
//     setFormData({
//       _id: null,
//       title: "",
//       description: "",
//       location: "",
//       price: "",
//       images: [],
//       documents: [],
//     });
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 1️⃣ create property
//       const property = await addProperty({
//         title: formData.title,
//         description: formData.description,
//         location: formData.location,
//         price: formData.price,
//       });

//       const propertyId = property._id;

//       // 2️⃣ upload images
//       for (let img of formData.images) {
//         await uploadPropertyImage(propertyId, img);
//       }

//       // 3️⃣ upload documents
//       for (let doc of formData.documents) {
//         await uploadDocument(propertyId, doc, "Other");
//       }

//       resetForm();
//       alert("Property submitted for approval. Uploaded " + formData.images.length + " images and " + formData.documents.length + " documents.");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit property");
//     }
//   };

//   const handleEdit = (property) => {
//     setFormData({
//       _id: property._id,
//       title: property.title,
//       description: property.description,
//       location: property.location,
//       price: property.price,
//       images: [],
//       documents: [],
//     });
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="properties-tab">
//       <h3>{isEditMode ? "Edit Property" : "Add New Property"} (Admin Approval Required)</h3>

//       <form onSubmit={handleSubmit} className="property-form">
//         <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
//         <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

//         {/* IMAGES */}
//         <label>
//           Property Images ({formData.images.length} selected)
//           <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
//         </label>

//         {formData.images.length > 0 && (
//           <div className="image-preview">
//             {formData.images.map((file, i) => (
//               <img key={i} src={URL.createObjectURL(file)} alt="preview" width={100} />
//             ))}
//           </div>
//         )}

//         {/* DOCUMENTS */}
//         <label>
//           Property Documents ({formData.documents.length} selected)
//           <input type="file" multiple accept="application/pdf,image/*" onChange={handleDocumentsChange} />
//         </label>

//         {formData.documents.length > 0 && (
//           <ul>
//             {formData.documents.map((f, i) => (
//               <li key={i}>📄 {f.name}</li>
//             ))}
//           </ul>
//         )}

//         <button type="submit">{isEditMode ? "Update Property" : "Submit for Approval"}</button>
//         {isEditMode && <button type="button" onClick={resetForm}>Cancel Edit</button>}
//       </form>

//       <hr />

//       <h3>Your Submitted Properties</h3>
//       <ul className="property-list">
//         {properties.map(p => (
//           <li key={p._id} className="property-card">
//             <h4>{p.title}</h4>
//             <p>{p.location}</p>
//             <p>৳ {p.price}</p>
//             <p>Status: <b>{p.status}</b></p>

//             {/* IMAGES */}
//             {p.images?.length > 0 && (
//               <div>
//                 {p.images.map((img, i) => (
//                   <img key={i} src={img} alt="property" width={120} />
//                 ))}
//               </div>
//             )}

//             {/* DOCUMENTS */}
//             {p.documents?.length > 0 && (
//               <ul>
//                 {p.documents.map((doc, i) => (
//                   <li key={i}>
//                     <a href={doc} target="_blank" rel="noreferrer">Document {i + 1}</a>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* ACTIONS */}
//             {(p.status === "Pending" || p.status === "Rejected") && (
//               <div>
//                 <button onClick={() => handleEdit(p)}>Edit</button>
//                 <button onClick={() => deleteProperty(p._id)}>Delete</button>
//               </div>
//             )}

//             {p.status === "Approved" && <p style={{ color: "green" }}>✔ Approved — Editing Disabled</p>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useState } from "react";
import { uploadPropertyImage, uploadDocument } from "../../../../../../Api/property.api";
import "./ownerpropertiestab.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Helper to get URL (handles both Cloudinary and local URLs)
const getMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${API_URL}/${url.replace(/\\/g, "/")}`;
};

export default function PropertiesTab({ properties, refreshProperties, addProperty, deleteProperty, updateProperty }) {
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    location: "",
    price: "",
    propertyType: "apartment",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isEditMode = !!formData._id;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    e.target.value = null;
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
    e.target.value = null;
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      title: "",
      description: "",
      location: "",
      price: "",
      propertyType: "apartment",
      bedrooms: "",
      bathrooms: "",
      area: "",
      images: [],
      documents: [],
    });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const property = await addProperty({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: formData.price,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
      });
      const propertyId = property._id;

      // Upload images
      for (let img of formData.images) {
        await uploadPropertyImage(propertyId, img);
      }

      // Upload documents
      for (let doc of formData.documents) {
        await uploadDocument(propertyId, doc, "Other");
      }

      resetForm();
      await refreshProperties();
      alert(`✅ Property submitted! Uploaded ${formData.images.length} images and ${formData.documents.length} documents.`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (property) => {
    setFormData({
      _id: property._id,
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price,
      propertyType: property.propertyType || "apartment",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      area: property.area || "",
      images: [],
      documents: [],
    });
    setShowForm(true);
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="owner-properties-container">
      {/* Header */}
      <div className="properties-header">
        <div>
          <h2>My Properties</h2>
          <p>{properties.length} properties listed</p>
        </div>
        <button 
          className="add-property-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "+ Add Property"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="property-form-card">
          <h3>{isEditMode ? "✏️ Edit Property" : "🏠 Add New Property"}</h3>
          <p className="form-subtitle">Properties require admin approval before being listed</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Property Title *</label>
                <input 
                  name="title" 
                  placeholder="e.g., Modern 3BR Apartment in Gulshan" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input 
                  name="location" 
                  placeholder="e.g., Gulshan, Dhaka" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Price (৳) *</label>
                <input 
                  type="number" 
                  name="price" 
                  placeholder="e.g., 50000" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms" 
                  placeholder="e.g., 3" 
                  value={formData.bedrooms} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input 
                  type="number" 
                  name="bathrooms" 
                  placeholder="e.g., 2" 
                  value={formData.bathrooms} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label>Area (sq ft)</label>
                <input 
                  type="number" 
                  name="area" 
                  placeholder="e.g., 1500" 
                  value={formData.area} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea 
                  name="description" 
                  placeholder="Describe your property features, amenities, nearby facilities..." 
                  value={formData.description} 
                  onChange={handleChange} 
                  required 
                  rows={4}
                />
              </div>

              {/* Image Upload */}
              <div className="form-group full-width">
                <label>Property Images</label>
                <div className="file-upload-area">
                  <input 
                    type="file" 
                    id="imageUpload"
                    multiple 
                    accept="image/*" 
                    onChange={handleImagesChange}
                    className="file-input"
                  />
                  <label htmlFor="imageUpload" className="file-label">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload images</span>
                    <span className="file-hint">JPG, PNG, WebP (Max 10MB each)</span>
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="preview-grid">
                    {formData.images.map((file, i) => (
                      <div key={i} className="preview-item">
                        <img src={URL.createObjectURL(file)} alt="preview" />
                        <button type="button" className="remove-btn" onClick={() => removeImage(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Document Upload */}
              <div className="form-group full-width">
                <label>Property Documents</label>
                <div className="file-upload-area">
                  <input 
                    type="file" 
                    id="docUpload"
                    multiple 
                    accept="application/pdf,image/*" 
                    onChange={handleDocumentsChange}
                    className="file-input"
                  />
                  <label htmlFor="docUpload" className="file-label">
                    <span className="upload-icon">📄</span>
                    <span>Click to upload documents</span>
                    <span className="file-hint">PDF, Images (Max 20MB each)</span>
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="doc-list">
                    {formData.documents.map((f, i) => (
                      <div key={i} className="doc-item">
                        <span>📄 {f.name}</span>
                        <button type="button" className="remove-btn-small" onClick={() => removeDocument(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : isEditMode ? "Update Property" : "Submit for Approval"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties Grid */}
      <div className="properties-grid">
        {properties.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🏠</span>
            <h3>No properties yet</h3>
            <p>Add your first property to get started</p>
            <button className="add-property-btn" onClick={() => setShowForm(true)}>
              + Add Property
            </button>
          </div>
        ) : (
          properties.map(p => (
            <div key={p._id} className="property-card-new">
              <div className="card-image">
                {p.images?.length > 0 ? (
                  <img src={getMediaUrl(p.images[0])} alt={p.title} />
                ) : (
                  <div className="no-image">
                    <span>🏠</span>
                    <span>No Image</span>
                  </div>
                )}
                <span className={`status-badge ${getStatusClass(p.status)}`}>
                  {p.status || "Pending"}
                </span>
              </div>
              
              <div className="card-content">
                <h4>{p.title}</h4>
                <p className="location">📍 {p.location}</p>
                <p className="price">৳ {Number(p.price).toLocaleString()}</p>
                
                <div className="card-meta">
                  {p.bedrooms && <span>🛏️ {p.bedrooms} Beds</span>}
                  {p.bathrooms && <span>🚿 {p.bathrooms} Baths</span>}
                  {p.area && <span>📐 {p.area} sqft</span>}
                </div>

                {p.images?.length > 1 && (
                  <p className="image-count">📷 {p.images.length} images</p>
                )}

                {p.documents?.length > 0 && (
                  <div className="doc-links">
                    {p.documents.map((doc, i) => (
                      <a key={i} href={getMediaUrl(doc)} target="_blank" rel="noreferrer" className="doc-link">
                        📄 Doc {i + 1}
                      </a>
                    ))}
                  </div>
                )}

                <div className="card-actions">
                  {(p.status === "pending" || p.status === "Pending" || p.status === "rejected" || p.status === "Rejected") && (
                    <>
                      <button className="btn-edit" onClick={() => handleEdit(p)}>✏️ Edit</button>
                      <button className="btn-delete" onClick={() => deleteProperty(p._id)}>🗑️ Delete</button>
                    </>
                  )}
                  {(p.status === "approved" || p.status === "Approved") && (
                    <span className="approved-badge">✅ Live on site</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}









// import React, { useState } from "react";

// export default function PropertiesTab({ properties, addProperty, deleteProperty }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     price: "",
//     images: [],
//     documents: [],
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImagesChange = (e) => {
//     const newImages = Array.from(e.target.files);

//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...newImages],
//     }));

//     e.target.value = null;
//   };

//   const handleDocumentsChange = (e) => {
//     const newDocs = Array.from(e.target.files);

//     setFormData((prev) => ({
//       ...prev,
//       documents: [...prev.documents, ...newDocs],
//     }));

//     e.target.value = null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addProperty(formData);

//     setFormData({
//       title: "",
//       description: "",
//       location: "",
//       price: "",
//       images: [],
//       documents: [],
//     });
//   };

//   return (
//     <div className="properties-tab">
//       <h3>Add New Property (Pending Admin Approval)</h3>

//       <form onSubmit={handleSubmit} className="property-form">
//         <input
//           type="text"
//           name="title"
//           placeholder="Property Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Property Location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price (BDT)"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Property Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         {/* IMAGES */}
//         <label>
//           Property Images
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImagesChange}
//           />
//         </label>

//         {/* 🔥 IMAGE PREVIEW */}
//         {formData.images.length > 0 && (
//           <div className="image-preview">
//             {formData.images.map((file, idx) => (
//               <img
//                 key={idx}
//                 src={URL.createObjectURL(file)}
//                 alt="preview"
//                 style={{ width: "120px", marginRight: "8px" }}
//               />
//             ))}
//           </div>
//         )}

//         {/* DOCUMENTS */}
//         <label>
//           Property Documents
//           <input
//             type="file"
//             accept="application/pdf,image/*"
//             multiple
//             onChange={handleDocumentsChange}
//           />
//         </label>

//         {/* 🔥 DOCUMENT LIST */}
//         {formData.documents.length > 0 && (
//           <ul>
//             {formData.documents.map((file, idx) => (
//               <li key={idx}>
//                 📄 {file.name}
//               </li>
//             ))}
//           </ul>
//         )}

//         <button type="submit">Submit for Approval</button>
//       </form>

//       <hr />

//       <h3>Your Submitted Properties</h3>

//       <ul className="property-list">
//         {properties.map((p) => (
//           <li key={p._id} className="property-card">
//             <h4>{p.title}</h4>
//             <p>{p.location}</p>
//             <p>Price: {p.price}</p>
//             <p>Status: <b>{p.status}</b></p>

//             {p.images?.length > 0 && (
//               <div>
//                 {p.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt="property"
//                     style={{ width: "150px", marginRight: "8px" }}
//                   />
//                 ))}
//               </div>
//             )}

//             {p.documents?.length > 0 && (
//               <ul>
//                 {p.documents.map((doc, idx) => (
//                   <li key={idx}>
//                     <a href={doc} target="_blank" rel="noreferrer">
//                       Document {idx + 1}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {p.status === "Pending" && (
//               <p style={{ color: "orange" }}>Waiting for admin approval</p>
//             )}

//             <button onClick={() => deleteProperty(p._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

