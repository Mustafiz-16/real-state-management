// import React from "react";

// function NotificationsTab({ notifications }) {
//     return (
//         <div className="mt-6">
//             {notifications && notifications.length > 0 ? (
//                 <ul className="space-y-4">
//                     {notifications.map((note, idx) => (
//                         <li key={idx} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
//                             <p className="text-sm text-gray-700">{note.message}</p>
//                             <span className="text-xs text-gray-400">{note.date}</span>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-500">No notifications found.</p>
//             )}
//         </div>
//     );
// }

// export default NotificationsTab;
// import React from 'react';
// import { Bell } from 'lucide-react';

// const PRIMARY_COLOR = "#ff6b36";

// export default function NotificationsTab({ notifications }) {
//     return (
//         <div className="space-y-2">
//             {notifications.map((n, i) => (
//                 <div key={i} className="flex items-start p-3 bg-orange-50/50 rounded-xl border border-orange-200/50 hover:bg-orange-100 transition shadow-sm">
//                     <Bell className={`w-5 h-5 text-[${PRIMARY_COLOR}] mt-0.5 flex-shrink-0`} />
//                     <p className="ml-3 text-sm text-gray-800">{n}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

import React from 'react';
import { Bell } from 'lucide-react';
import './notification.css';

export default function NotificationsTab({ notifications }) {
  return (
    <div className="notifications-tab">
      {notifications.map((n, i) => (
        <div key={i} className="notification-item">
          <Bell />
          <p>{n}</p>
        </div>
      ))}
    </div>
  );
}
