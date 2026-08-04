import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Pending user
    if (
        user?.status === "pending" &&
        location.pathname !== "/pending-request"
    ) {
        return <Navigate to="/pending-request" replace />;
    }

    // Rejected user
    if (
        user?.status === "rejected" &&
        location.pathname !== "/account-rejected"
    ) {
        return <Navigate to="/account-rejected" replace />;
    }

    return children;
};

export default ProtectedRoute;