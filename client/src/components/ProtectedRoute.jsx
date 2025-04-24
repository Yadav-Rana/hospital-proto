import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    return children;
  }

  // If user's role is not in allowedRoles, redirect to appropriate dashboard
  if (!allowedRoles.includes(currentUser.role)) {
    // Redirect based on role
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'doctor':
        return <Navigate to="/doctor" replace />;
      case 'patient':
        return <Navigate to="/patient" replace />;
      case 'caretaker':
        return <Navigate to="/caretaker" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has an allowed role
  return children;
};

export default ProtectedRoute;
