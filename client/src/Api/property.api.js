// Api/property.api.js
import API from "./axios";

export const getOwnerProperties = () =>
  API.get("/properties/owner/me");

export const createProperty = (data) =>
  API.post("/properties", {
    title: data.title,
    description: data.description,
    location: data.location,
    price: data.price,
  });

export const deleteProperty = (id) =>
  API.delete(`/properties/${id}`);

// export const uploadPropertyImage = (propertyId, file) => {
//   const fd = new FormData();
//   fd.append("propertyId", propertyId);
//   fd.append("image", file);

//   return API.post("/property-images/upload", fd);
// };

// export const uploadDocument = (propertyId, file, type) => {
//   const fd = new FormData();
//   fd.append("propertyId", propertyId);
//   fd.append("file", file);
//   fd.append("type", type);

//   return API.post("/documents/upload", fd);
// };

export const uploadPropertyImage = async (propertyId, file) => {
  const formData = new FormData();
  formData.append("propertyId", propertyId);
  formData.append("image", file); // must match router.single("image")
  
  // Don't set Content-Type header - let browser set it with proper boundary
  return API.post("/property-images/upload", formData);
};

// export const uploadDocument = async (propertyId, file, type = "Other") => {
//   const formData = new FormData();
//   formData.append("propertyId", propertyId);
//   formData.append("type", type);
//   formData.append("document", file); // must match router.single("document")
//   return API.post("/properties/documents", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };
// property.api.js
export const uploadDocument = async (propertyId, file, type = "Other") => {
  const formData = new FormData();
  formData.append("propertyId", propertyId);
  formData.append("type", type);
  formData.append("file", file); // must match router.single("file")
  
  // Don't set Content-Type header - let browser set it with proper boundary
  return API.post("/documents/upload", formData);
};

export const getApprovedProperties = () =>
  API.get("/properties/approved");

export const getPropertyById = (id) =>
  API.get(`/properties/${id}`);

export const searchProperties = (filters) =>
  API.get("/properties/approved", { params: filters });
