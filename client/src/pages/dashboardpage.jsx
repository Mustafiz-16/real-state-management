import React from "react";
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";

import BuyerDashboard from "./buyerdashboardpage";
import OwnerDashboard from "./ownerdashboardpage";
import AdminDashboard from "./admindashboardpage";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user, redirect to login
  if (!user) {
    window.location.href = "/auth";
    return null;
  }

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  // Render the correct dashboard component based on role
  const renderDashboardByRole = () => {
    switch (user.role) {
      case "buyer":
        return <BuyerDashboard user={user} />;
      case "owner":
        return <OwnerDashboard user={user} />;
      case "admin":
        return <AdminDashboard user={user} />;
      default:
        return <p>Invalid role</p>;
    }
  };

  return (
    <div>
      <Navbar
        isLoggedIn={!!user}
        userName={user.name.split(" ")[0]}
        notificationsCount={user.notificationsCount || 0}
        onSignOut={handleSignOut}
      />

      {renderDashboardByRole()}

      <Footer />
    </div>
  );
};

export default DashboardPage;
