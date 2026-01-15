// import React from "react";
// import { Briefcase } from "lucide-react";

// export default function ProfileSummary({ user }) {
//     return (
//         <section className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100/70">
//             <h2 className="text-2xl font-bold mb-5 text-gray-800 flex items-center">
//                 <Briefcase className="w-5 h-5 mr-2 text-[#ff6b36]"/> Profile Summary
//             </h2>
//             <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
//                 <li className="p-2 border-b border-gray-100"><strong>Name:</strong> {user.name}</li>
//                 <li className="p-2 border-b border-gray-100 col-span-2 md:col-span-1 lg:col-span-2"><strong>Email:</strong> {user.email}</li>
//                 <li className="p-2 border-b border-gray-100"><strong>Verified:</strong> <span className="text-green-600 font-semibold">{user.isVerified ? "Yes" : "No"}</span></li>
//                 <li className="p-2 border-b border-gray-100"><strong>Purchased:</strong> {user.purchasedCount}</li>
//                 <li className="p-2 border-b border-gray-100"><strong>Wishlist:</strong> {user.wishlistCount} items</li>
//                 <li className="p-2 border-b border-gray-100"><strong>Notifications:</strong> <span className="text-red-600 font-semibold">{user.notificationsCount} Unread</span></li>
//             </ul>
//         </section>
//     );
// }


// import React from 'react';
// import { Briefcase } from 'lucide-react';

// const PRIMARY_COLOR = "#ff6b36";

// export default function ProfileSummary({ user }) {
//     return (
//         <section className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100/70">
//             <h2 className="text-2xl font-bold mb-5 text-gray-800 flex items-center">
//                 <Briefcase className={`w-5 h-5 mr-2 text-[${PRIMARY_COLOR}]`} />
//                 Profile Summary
//             </h2>
//             <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
//                 <li className="p-2 border-b border-gray-100">
//                     <strong>Name:</strong> {user.name}
//                 </li>
//                 <li className="p-2 border-b border-gray-100 col-span-2 md:col-span-1 lg:col-span-2">
//                     <strong>Email:</strong> {user.email}
//                 </li>
//                 <li className="p-2 border-b border-gray-100">
//                     <strong>Verified:</strong> <span className="text-green-600 font-semibold">{user.isVerified ? "Yes" : "No"}</span>
//                 </li>
//                 <li className="p-2 border-b border-gray-100">
//                     <strong>Purchased:</strong> {user.purchasedCount}
//                 </li>
//                 <li className="p-2 border-b border-gray-100">
//                     <strong>Wishlist:</strong> {user.wishlistCount} items
//                 </li>
//                 <li className="p-2 border-b border-gray-100">
//                     <strong>Notifications:</strong> <span className="text-red-600 font-semibold">{user.notificationsCount} Unread</span>
//                 </li>
//             </ul>
//         </section>
//     );
// }


import React from "react";
import { Briefcase } from "lucide-react";
import "./profilesummary.css";

const PRIMARY_COLOR = "#ff6b36";

const user = JSON.parse(localStorage.getItem("user"));


export default function ProfileSummary({ user }) {
  return (
    <section className="profile-summary">
      <h2>
        <Briefcase />
        Profile Summary
      </h2>
      <ul>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li className="col-span-2">
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Verified:</strong>{" "}
          <span className="text-green">{user.isVerified ? "Yes" : "No"}</span>
        </li>
        <li>
          <strong>Purchased:</strong> {user.purchasedCount || 0}
        </li>
        <li>
          <strong>Wishlist:</strong> {user.wishlistCount || 0} items
        </li>
        <li>
          <strong>Notifications:</strong>{" "}
          <span className="text-red">{user.notificationsCount || 0} Unread</span>
        </li>
      </ul>
    </section>
  );
}
