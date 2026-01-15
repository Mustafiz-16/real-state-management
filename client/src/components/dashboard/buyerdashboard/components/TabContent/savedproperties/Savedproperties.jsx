// import React from "react";

// export default function SavedTab({ savedProperties }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {savedProperties && savedProperties.length > 0 ? (
//                 savedProperties.map((property, idx) => (
//                     <div key={idx} className="border p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
//                         <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
//                         <p className="text-sm text-gray-500">{property.location}</p>
//                         <p className="text-sm text-gray-500">Price: ${property.price}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-gray-500">No saved properties found.</p>
//             )}
//         </div>
//     );
// }

// import React from 'react';
// import { MapPin, X } from 'lucide-react';

// const PRIMARY_COLOR = "#ff6b36";

// export default function SavedPropertiesTab({ properties }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {properties.map((p) => (
//                 <div key={p.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-white hover:shadow-lg transition cursor-pointer flex flex-col justify-between">
//                     <div>
//                         <span className="font-bold text-lg text-gray-900 block mb-1">{p.title}</span>
//                         <span className="text-sm text-gray-500 flex items-center mb-3">
//                             <MapPin className="w-4 h-4 mr-1"/>{p.location}
//                         </span>
//                     </div>
//                     <span className={`text-xl text-[${PRIMARY_COLOR}] font-extrabold mt-2`}>{p.price}</span>
//                     <button className="mt-3 text-red-500 text-xs font-medium self-end hover:text-red-700 transition flex items-center">
//                         <X className="w-3 h-3 mr-1"/> Remove from Wishlist
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }
import React from 'react';
import { MapPin, X } from 'lucide-react';
import './savedProperties.css';

export default function SavedPropertiesTab({ properties }) {
    return (
        <div className="saved-properties-grid">
            {properties.map((p) => (
                <div key={p.id} className="property-card">
                    <div>
                        <span className="property-title">{p.title}</span>
                        <span className="property-location">
                            <MapPin /> {p.location}
                        </span>
                    </div>
                    <span className="property-price">{p.price}</span>
                    <button className="remove-btn">
                        <X /> Remove from Wishlist
                    </button>
                </div>
            ))}
        </div>
    );
}
