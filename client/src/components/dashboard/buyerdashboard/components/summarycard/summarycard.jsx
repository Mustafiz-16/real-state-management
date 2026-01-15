// import React from "react";

// const PRIMARY_COLOR = "#ff6b36";

// export default function SummaryCard({ label, value, Icon }) {
//     return (
//         <div className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100 flex items-center space-x-5 transform hover:scale-[1.02] transition duration-300 ease-in-out cursor-default hover:shadow-3xl">
//             <div className={`p-4 rounded-full bg-orange-50 text-[${PRIMARY_COLOR}] shadow-inner`}>
//                 <Icon className="w-7 h-7" />
//             </div>
//             <div>
//                 <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-medium">{label}</div>
//                 <div className="text-4xl font-extrabold text-gray-900">{value}</div>
//             </div>
//         </div>
//     );
// }
// import React from "react";

// const PRIMARY_COLOR = "#ff6b36";

// export default function SummaryCard({ label, value, Icon }) {
//   return (
//     <div className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100 flex items-center space-x-5 transform hover:scale-[1.02] transition duration-300 ease-in-out cursor-default hover:shadow-3xl">
//       <div className={`p-4 rounded-full bg-orange-50`} style={{ color: PRIMARY_COLOR }}>
//         {Icon && <Icon className="w-7 h-7" />}
//       </div>
//       <div>
//         <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-medium">
//           {label}
//         </div>
//         <div className="text-4xl font-extrabold text-gray-900">{value}</div>
//       </div>
//     </div>
//   );
// }
// import React from 'react';

// const PRIMARY_COLOR = "#ff6b36";

// export default function SummaryCard({ label, value, Icon }) {
//     return (
//         <div className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100 flex items-center space-x-5 transform hover:scale-[1.02] transition duration-300 ease-in-out cursor-default hover:shadow-3xl">
//             <div className={`p-4 rounded-full bg-orange-50 text-[${PRIMARY_COLOR}] shadow-inner`}>
//                 <Icon className="w-7 h-7" />
//             </div>
//             <div>
//                 <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-medium">{label}</div>
//                 <div className="text-4xl font-extrabold text-gray-900">{value}</div>
//             </div>
//         </div>
//     );
// }


import "./summarycard.css";

const PRIMARY_COLOR = "#ff6b36";

export default function SummaryCard({ label, value, Icon }) {
  return (
    <div className="summary-card">
      <div className="summary-card-icon" style={{ color: PRIMARY_COLOR }}>
        <Icon />
      </div>
      <div>
        <div className="summary-card-label">{label}</div>
        <div className="summary-card-value">{value}</div>
      </div>
    </div>
  );
}
