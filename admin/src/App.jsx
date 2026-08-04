import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import PendingUsers from "./Components/PendingUsers";
import PendingProducts from "./Components/PendingProducts";
import ApprovedProducts from "./Components/ApprovedProducts";
import ProtectedRoute from "./Components/ProtectedRoutes"

function App() {
  return (

    <Routes>

      {/* // <Route path="/" element={<Home />} /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/pending-users" element={
        <ProtectedRoute>
          <PendingUsers />
        </ProtectedRoute>
      } />

      <Route path="/pending-products" element={
        <ProtectedRoute>
          <PendingProducts />
        </ProtectedRoute>
      } />

      <Route path="/approved-products" element={
        <ProtectedRoute>
          <ApprovedProducts />
        </ProtectedRoute>
      } />

    </Routes>

  );
}

export default App;