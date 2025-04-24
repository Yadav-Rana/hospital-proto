import {createContext, useState, useContext, useEffect} from "react";
import mockDataService from "../services/mockDataService";

// Initialize mock data
mockDataService.initializeData();

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // If the user is logged in, refresh their data from the service
      if (parsedUser && parsedUser.id && parsedUser.role) {
        const refreshUserData = async () => {
          try {
            let userData;

            // Get fresh user data based on role
            if (parsedUser.role === "doctor") {
              userData = await mockDataService.users.getDoctorById(
                parsedUser.id
              );
            } else if (parsedUser.role === "patient") {
              userData = await mockDataService.users.getPatientById(
                parsedUser.id
              );
            } else if (parsedUser.role === "caretaker") {
              userData = await mockDataService.users.getCaretakerById(
                parsedUser.id
              );
            } else {
              // For admin, just use the stored data
              userData = parsedUser;
            }

            // Update the current user with fresh data
            setCurrentUser(userData);
            // Also update localStorage
            localStorage.setItem("user", JSON.stringify(userData));
          } catch (error) {
            console.error("Error refreshing user data:", error);
            // If there's an error, still use the stored data
            setCurrentUser(parsedUser);
          } finally {
            setLoading(false);
          }
        };

        refreshUserData();
      } else {
        setCurrentUser(parsedUser);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password, role) => {
    try {
      // Use the mock data service for client-side authentication
      const data = await mockDataService.auth.login(username, password, role);

      // Save user to state and localStorage
      setCurrentUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Use the mock data service for client-side logout
      await mockDataService.auth.logout();

      // Clear user from state and localStorage
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove the user from local state even if there's an error
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin: currentUser?.role === "admin",
    isDoctor: currentUser?.role === "doctor",
    isPatient: currentUser?.role === "patient",
    isCaretaker: currentUser?.role === "caretaker",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
