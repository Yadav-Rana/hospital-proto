import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {motion} from "framer-motion";
import {FiMenu, FiX, FiUser, FiLogOut} from "react-icons/fi";

const Navbar = () => {
  const {currentUser, logout, isAdmin, isDoctor, isPatient, isCaretaker} =
    useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      // Still navigate to home page even if there's an error
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <motion.h1
            className="text-2xl md:text-3xl font-bold glow-text"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            Hospital Management System
          </motion.h1>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-zinc-100 p-2 focus:outline-none"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex navbar-links">
          {currentUser ? (
            <>
              <span className="navbar-user flex items-center">
                <FiUser className="mr-2" />
                {currentUser.fullName || currentUser.username}
              </span>

              {/* Dashboard link based on role */}
              {isAdmin && (
                <Link to="/admin" className="navbar-link">
                  Admin Dashboard
                </Link>
              )}
              {isDoctor && (
                <Link to="/doctor" className="navbar-link">
                  Doctor Dashboard
                </Link>
              )}
              {isPatient && (
                <Link to="/patient" className="navbar-link">
                  Patient Dashboard
                </Link>
              )}
              {isCaretaker && (
                <Link to="/caretaker" className="navbar-link">
                  Caretaker Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="navbar-logout flex items-center"
                disabled={isLoggingOut}
              >
                <FiLogOut className="mr-2" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-dark-zinc-800 border-t border-dark-zinc-700 md:hidden z-50"
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2}}
          >
            <div className="container py-4 flex flex-col space-y-4">
              {currentUser ? (
                <>
                  <span className="navbar-user flex items-center">
                    <FiUser className="mr-2" />
                    {currentUser.fullName || currentUser.username}
                  </span>

                  {/* Dashboard link based on role */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="navbar-link"
                      onClick={toggleMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {isDoctor && (
                    <Link
                      to="/doctor"
                      className="navbar-link"
                      onClick={toggleMenu}
                    >
                      Doctor Dashboard
                    </Link>
                  )}
                  {isPatient && (
                    <Link
                      to="/patient"
                      className="navbar-link"
                      onClick={toggleMenu}
                    >
                      Patient Dashboard
                    </Link>
                  )}
                  {isCaretaker && (
                    <Link
                      to="/caretaker"
                      className="navbar-link"
                      onClick={toggleMenu}
                    >
                      Caretaker Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="navbar-logout flex items-center"
                    disabled={isLoggingOut}
                  >
                    <FiLogOut className="mr-2" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-primary"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
