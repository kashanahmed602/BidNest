import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import PendingUsers from "./Components/PendingUsers";
import PendingProducts from "./Components/PendingProducts";
import ApprovedProducts from "./Components/ApprovedProducts";
import ProtectedRoute from "./Components/ProtectedRoutes"
import ApprovedUsers from "./Components/ApprovedUsers";
import PendingAuctions from "./Components/PendingAuction";

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

      <Route path="/approved-users" element={<ProtectedRoute><ApprovedUsers/></ProtectedRoute>}/>

      <Route path="/pending-auctions" element={<ProtectedRoute><PendingAuctions/></ProtectedRoute>}/>



    </Routes>

  );
}

export default App;