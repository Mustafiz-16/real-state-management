// import React from "react";

// export default function BookingsTab({ bookings }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {bookings && bookings.length > 0 ? (
//                 bookings.map((booking, idx) => (
//                     <div key={idx} className="border p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
//                         <h3 className="text-lg font-bold text-gray-800">{booking.propertyName}</h3>
//                         <p className="text-sm text-gray-500">Booking Date: {booking.date}</p>
//                         <p className="text-sm text-gray-500">Status: {booking.status}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-gray-500">No bookings found.</p>
//             )}
//         </div>
//     );
// }

// import React from 'react';
// import { MapPin, Clock } from 'lucide-react';

// export default function BookingsTab({ bookings }) {
//     return (
//         <div className="overflow-x-auto rounded-xl border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Property</th>
//                         <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-600 hidden md:table-cell">Location</th>
//                         <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date & Time</th>
//                         <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                     {bookings.map((b) => (
//                         <tr key={b.id} className="hover:bg-orange-50 transition duration-150">
//                             <td className="py-4 px-6 text-sm font-medium text-gray-900">
//                                 {b.propertyTitle}
//                                 <span className="block text-xs text-gray-500 md:hidden mt-1">
//                                     <MapPin className="w-3 h-3 inline mr-1"/>{b.location}
//                                 </span>
//                             </td>
//                             <td className="py-4 px-6 text-sm text-gray-600 hidden md:table-cell">
//                                 <MapPin className="w-4 h-4 text-gray-400 inline mr-1"/>{b.location}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium text-gray-800">
//                                 {b.date}
//                                 <div className="text-xs text-gray-500">
//                                     <Clock className="w-3 h-3 inline mr-1"/>{b.time}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6 whitespace-nowrap">
//                                 <span className={`inline-flex px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
//                                     b.status==="Confirmed" ? "bg-green-100 text-green-700 ring-1 ring-green-300" :
//                                     b.status==="Pending" ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300" :
//                                     "bg-red-100 text-red-700 ring-1 ring-red-300"
//                                 }`}>
//                                     {b.status}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React from "react";
import { MapPin, Clock } from "lucide-react";
import "./booking.css";

export default function BookingsTab({ bookings }) {
  return (
    <div className="bookings-table-container">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Property</th>
            <th className="desktop-location">Location</th>
            <th>Date & Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>
                {b.propertyTitle}
                <span className="mobile-location">
                  <MapPin style={{ width: "0.75rem", height: "0.75rem", marginRight: "0.25rem" }} />
                  {b.location}
                </span>
              </td>
              <td className="desktop-location">
                <MapPin style={{ width: "1rem", height: "1rem", color: "#9ca3af", marginRight: "0.25rem" }} />
                {b.location}
              </td>
              <td>
                {b.date}
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  <Clock style={{ width: "0.75rem", height: "0.75rem", marginRight: "0.25rem" }} />
                  {b.time}
                </div>
              </td>
              <td>
                <span
                  className={`bookings-status ${
                    b.status === "Confirmed"
                      ? "status-confirmed"
                      : b.status === "Pending"
                      ? "status-pending"
                      : "status-cancelled"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
