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


export const uploadPropertyImage = async (propertyId, file) => {
  const formData = new FormData();
  formData.append("propertyId", propertyId);
  formData.append("image", file);
  
  return API.post("/property-images/upload", formData);
};


export const uploadDocument = async (propertyId, file, type = "Other") => {
  const formData = new FormData();
  formData.append("propertyId", propertyId);
  formData.append("type", type);
  formData.append("file", file);
  

  return API.post("/documents/upload", formData);
};

export const getApprovedProperties = () =>
  API.get("/properties/approved");

export const getPropertyById = (id) =>
  API.get(`/properties/${id}`);

export const searchProperties = (filters) =>
  API.get("/properties/approved", { params: filters });
