// function AdminDashboardPage() {
//   return (
//     <div className="min-h-screen bg-[#f7f4f0]">
//       <Navbar />
//       <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>

import AdminDashboard from "../components/dashboard/Admindashboard/Admin/admindashboard";

        
//         {/* Stats cards: Total users, Properties, Bookings, Revenue */}
//         <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="text-3xl font-bold text-blue-600">1,247</div>
//             <div className="text-sm text-gray-600 mt-1">Total Users</div>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="text-3xl font-bold text-green-600">456</div>
//             <div className="text-sm text-gray-600 mt-1">Properties</div>
//           </div>
//           {/* more stats */}
//         </section>

//         {/* Pending listings table */}
//         {/* Recent activity log */}
//         {/* User management quick actions */}
//       </main>
//       <Footer />
//     </div>
//   );
// }
export default function AdminDashboardPage() {
    return (
        <div>
            <AdminDashboard />
        </div>
    )
}