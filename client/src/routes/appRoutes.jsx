import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/servicespage.jsx";
import PropertiesPage from "../pages/propertiespage.jsx";
import PropertyDetailsPage from "../pages/propertydetailspage.jsx";
import ContactPage from "../pages/contactpage.jsx";
import AuthPage from "../pages/authpage.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
//import DashboardPage from "../pages/dashboardpage";
import BuyerDashboardPage from "../pages/buyerdashboardpage.jsx";
import OwnerDashboardPage from "../pages/ownerdashboardpage.jsx";
// import AgentDashboardPage from "../pages/AgentDashboardPage";
import AdminDashboardPage from "../pages/admindashboardpage.jsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard/buyer"
        element={
          <PrivateRoute role="buyer">
            <BuyerDashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/owner"
        element={
          <PrivateRoute role="owner">
            <OwnerDashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute role="admin">
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
