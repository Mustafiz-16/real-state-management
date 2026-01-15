import React from "react";
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import Properties from "../components/properties/properties/properties";

export default function PropertiesPage() {
  return (
    <div>
      <Navbar />
      <Properties />
      <Footer />
    </div>
  );
}

























// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";
// import PropertyCard from "../components/common/propertycard/propertycard";

// import img1 from '../assets/WhatsApp Image 2025-11-09 at 20.18.45_de9d3580.jpg';
// import img2 from '../assets/WhatsApp Image 2025-11-09 at 20.24.34_bb97bdc6.jpg';

// function PropertiesPage() {
//   const dummyProperties = [
//     {
//       id: 1,
//       image: img1,
//       location: "Ranirbazar, Comilla",
//       bedrooms: 6,
//       sqft: 1800,
//       price: "85,00,000",
//       type: "Luxury Home",
//     },
//     {
//       id: 2,
//       image: img2,
//       location: "Ashoktala, Comilla",
//       bedrooms: 4,
//       sqft: 2500,
//       price: "1,25,00,000",
//       type: "Modern Villa",
//     },
//   ];

//   return (
//     <div>
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-4 py-10">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
//           <p className="text-gray-600">
//             Filter and explore our latest properties available for rent and sale.
//           </p>
//         </header>

//         {/* Simple filter bar (just UI for now) */}
//         <div className="bg-white shadow-sm rounded-lg p-4 mb-8 grid md:grid-cols-4 gap-3">
//           <input
//             className="border rounded px-3 py-2 text-sm"
//             placeholder="Location"
//           />
//           <select className="border rounded px-3 py-2 text-sm">
//             <option>Type</option>
//             <option>Apartment</option>
//             <option>House</option>
//           </select>
//           <select className="border rounded px-3 py-2 text-sm">
//             <option>Price range</option>
//             <option>0 – 50k</option>
//             <option>50k – 100k</option>
//           </select>
//           <button className="bg-brown-600 text-white rounded px-4 py-2 text-sm">
//             Search
//           </button>
//         </div>

//         {/* Property cards */}
//         <section className="grid md:grid-cols-3 gap-6">
//           {dummyProperties.map((property) => (
//             <PropertyCard key={property.id} property={property} />
//           ))}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default PropertiesPage;
