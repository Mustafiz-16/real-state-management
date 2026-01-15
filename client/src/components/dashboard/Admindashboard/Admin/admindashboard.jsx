// import React, { useState } from "react";
// import Navbar from "../../../layout/navbar/navbar";
// import Footer from "../../../layout/footer/footer";

// import AdminStatsCard from "../components/stats/adminstatscard";
// import AdminQuickActions from "../components/actions/adminquickactions";
// import ActivityLog from "../components/activity/activitylog";

// import UsersTab from "../components/tabs/usertab";
// import PropertiesTab from "../components/tabs/propertiestab";
// import BookingsTab from "../components/tabs/bookingtab";
// import ReportsTab from "../components/tabs/reportstab";

// import "./admindashboard.css";
// import "../components/tabs/admintab.css";

// // --- Dummy data ---
// const statsData = [
//     { label: "Total Users", value: 1 },
//     { label: "Properties", value: 2 },
//     { label: "Bookings", value: 2 },
//     { label: "Revenue", value: "৳ 00000" },
// ];

// const quickActions = [
//     { label: "Add User", onClick: () => alert("Add User clicked") },
//     { label: "Add Property", onClick: () => alert("Add Property clicked") },
// ];

// const activityLogs = [
//     { id: "l1", date: "2025-12-01", activity: "User Rahim registered" },
//     { id: "l2", date: "2025-12-02", activity: "Property Modern Villa added" },
// ];

// const dummyUsers = [
//     { id: "u1", name: "Rahim", email: "rahim@example.com", role: "buyer", status: "active" },
//     { id: "u2", name: "Fatema", email: "fatema@example.com", role: "owner", status: "active" },
// ];

// const dummyProperties = [
//     { id: "p1", title: "Modern Villa", owner: "Fatema", status: "active" },
//     { id: "p2", title: "Lake View Apartment", owner: "Rahim", status: "pending" },
// ];

// const dummyBookings = [
//     { id: "b1", property: "Modern Villa", buyer: "Rahim", status: "confirmed", isSold: true },
//     { id: "b2", property: "Lake View Apartment", buyer: "Fatema", status: "pending", isSold: false },
// ];

// export default function AdminDashboard() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const [activeTab, setActiveTab] = useState("users");

//     const handleSignOut = () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         window.location.href = "/auth";
//     };

//     return (
//         <div className="admin-dashboard-page">
//             {/* <Navbar isLoggedIn={true} userName={"Admin"} /> */}

//             <Navbar
//                 isLoggedIn={!!user}
//                 userName={user.name.split(" ")[0]}
//                 notificationsCount={user.notificationsCount || 0}
//                 onSignOut={handleSignOut}
//             />

//             <main className="admin-dashboard-main">
//                 <header className="admin-dashboard-header">
//                     <h1>Admin Dashboard</h1>
//                     <p>Overview of users, properties, bookings & reports</p>
//                 </header>

//                 {/* Stats */}
//                 <section className="admin-stats-section">
//                     {statsData.map((stat, i) => (
//                         <AdminStatsCard key={i} label={stat.label} value={stat.value} />
//                     ))}
//                 </section>

//                 {/* Quick Actions */}
//                 <AdminQuickActions actions={quickActions} />

//                 {/* Tabs */}
//                 <section className="admin-tabs-section">
//                     <div className="admin-tabs-nav">
//                         {["users", "properties", "bookings", "reports"].map((tab) => (
//                             <button
//                                 key={tab}
//                                 className={activeTab === tab ? "active" : ""}
//                                 onClick={() => setActiveTab(tab)}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="admin-tab-content">
//                         {activeTab === "users" && <UsersTab users={dummyUsers} />}
//                         {/* {activeTab === "users" && (
//                             <UsersTab users={user} loading={loadingUsers} />
//                         )} */}

//                         {activeTab === "properties" && <PropertiesTab properties={dummyProperties} />}
//                         {activeTab === "bookings" && <BookingsTab bookings={dummyBookings} />}
//                         {activeTab === "reports" && <ReportsTab />}
//                     </div>
//                 </section>

//                 {/* Activity Log */}
//                 <ActivityLog logs={activityLogs} />
//             </main>

//             <Footer />
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/navbar/navbar";
import Footer from "../../../layout/footer/footer";

import PropertyApprovalCard from "../components/propertyApprovalCard/propertyApprovalCard";
import "./admindashboard.css";

import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
} from "../../../../Api/admindashboard.api";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH PENDING PROPERTIES */
  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      const res = await getPendingProperties();
      setPendingProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
    } finally {
      setLoading(false);
    }
  };

  /* ✅ APPROVE */
  const handleApprove = async (propertyId) => {
    try {
      await approveProperty(propertyId);

      setPendingProperties((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (err) {
      alert("Approval failed");
    }
  };

  /* ❌ REJECT */
  const handleReject = async (propertyId, reason) => {
    try {
      await rejectProperty(propertyId, reason);

      setPendingProperties((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (err) {
      alert("Rejection failed");
    }
  };

  return (
    <div className="admin-dashboard-page">
      <Navbar
        isLoggedIn={true}
        userName={user?.name?.split(" ")[0]}
        onSignOut={() => {
          localStorage.clear();
          window.location.href = "/auth";
        }}
      />

      <main className="admin-dashboard-main">
        <h1>Property Approval Requests</h1>

        {loading ? (
          <p>Loading...</p>
        ) : pendingProperties.length === 0 ? (
          <p>No pending property requests 🎉</p>
        ) : (
          pendingProperties.map((property) => (
            <PropertyApprovalCard
              key={property._id}
              property={property}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import Navbar from "../../../layout/navbar/navbar";
// import Footer from "../../../layout/footer/footer";

// import PropertyApprovalCard from "../components/propertyApprovalCard/propertyApprovalCard";
// import "./admindashboard.css";

// export default function AdminDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [pendingProperties, setPendingProperties] = useState([]);

//   useEffect(() => {
//     // later: API call
//     setPendingProperties([
//       {
//         _id: "p1",
//         title: "Modern Villa",
//         owner: { name: "Fatema" },
//         location: "Dhanmondi",
//         price: 5000000,
//         description: "Luxury villa",
//         images: [],
//         status: "Pending",
//       },
//     ]);
//   }, []);

//   const handleApprove = (propertyId) => {
//     console.log("Approved:", propertyId);

//     // API:
//     // PATCH /api/properties/:id/approve

//     setPendingProperties(prev =>
//       prev.filter(p => p._id !== propertyId)
//     );
//   };

//   const handleReject = (propertyId) => {
//     console.log("Rejected:", propertyId);

//     // API:
//     // PATCH /api/properties/:id/reject
//     // + send message to owner

//     setPendingProperties(prev =>
//       prev.filter(p => p._id !== propertyId)
//     );
//   };

//   return (
//     <div className="admin-dashboard-page">
//       <Navbar
//         isLoggedIn={true}
//         userName={user?.name?.split(" ")[0]}
//         onSignOut={() => {
//           localStorage.clear();
//           window.location.href = "/auth";
//         }}
//       />

//       <main className="admin-dashboard-main">
//         <h1>Property Approval Requests</h1>

//         {pendingProperties.length === 0 ? (
//           <p>No pending property requests 🎉</p>
//         ) : (
//           pendingProperties.map(property => (
//             <PropertyApprovalCard
//               key={property._id}
//               property={property}
//               onApprove={handleApprove}
//               onReject={handleReject}
//             />
//           ))
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }
