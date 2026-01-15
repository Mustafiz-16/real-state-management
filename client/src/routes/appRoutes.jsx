import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/servicespage";
import PropertiesPage from "../pages/propertiespage";
import PropertyDetailsPage from "../pages/propertydetailspage";
import ContactPage from "../pages/contactpage";
import AuthPage from "../pages/authpage";
import PrivateRoute from "./PrivateRoutes";
//import DashboardPage from "../pages/dashboardpage";
import BuyerDashboardPage from "../pages/buyerdashboardpage";
import OwnerDashboardPage from "../pages/ownerdashboardpage";
// import AgentDashboardPage from "../pages/AgentDashboardPage";
import AdminDashboardPage from "../pages/admindashboardpage";

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
