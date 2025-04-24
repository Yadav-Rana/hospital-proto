import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {motion} from "framer-motion";
import {
  FiLock,
  FiUser,
  FiAlertCircle,
  FiUserCheck,
  FiActivity,
  FiUsers,
} from "react-icons/fi";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      setError("Please fill in all fields");
      return;
    }

    // Admin should use the admin login page
    if (role === "admin") {
      navigate("/admin/login");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const user = await login(username, password, role);

      // Redirect based on role
      if (user.role === "doctor") {
        navigate("/doctor");
      } else if (user.role === "patient") {
        navigate("/patient");
      } else if (user.role === "caretaker") {
        navigate("/caretaker");
      }
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <div className="text-center">
          <motion.h2
            className="text-3xl font-extrabold glow-text"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.2, duration: 0.5}}
          >
            Login to Your Account
          </motion.h2>
          <p className="mt-2 text-zinc-400">
            Please enter your credentials to access your dashboard
          </p>
          {/* Admin login is hidden and only accessible via direct URL */}
        </div>

        {error && (
          <motion.div
            className="alert alert-error flex items-center"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
          >
            <FiAlertCircle className="mr-2" />
            {error}
          </motion.div>
        )}

        <motion.form
          className="mt-8 space-y-6 card"
          onSubmit={handleSubmit}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.3, duration: 0.5}}
        >
          <div className="form-group">
            <label className="form-label flex items-center mb-3">
              <FiUserCheck className="mr-2" /> Select Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`role-option ${role === "doctor" ? "active" : ""}`}
                onClick={() => setRole("doctor")}
              >
                <div className="icon-container">
                  <FiUser size={24} />
                </div>
                <span>Doctor</span>
              </div>
              <div
                className={`role-option ${role === "patient" ? "active" : ""}`}
                onClick={() => setRole("patient")}
              >
                <div className="icon-container">
                  <FiActivity size={24} />
                </div>
                <span>Patient</span>
              </div>
              <div
                className={`role-option ${
                  role === "caretaker" ? "active" : ""
                }`}
                onClick={() => setRole("caretaker")}
              >
                <div className="icon-container">
                  <FiUsers size={24} />
                </div>
                <span>Caretaker</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label flex items-center">
              <FiUser className="mr-2" /> Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label flex items-center">
              <FiLock className="mr-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </motion.form>

        <motion.div
          className="text-center mt-4 text-zinc-400 text-sm"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.5, duration: 0.5}}
        >
          <p className="font-medium mb-2">Demo Credentials:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <p className="font-medium text-teal-400">Doctor</p>
              <p>Username: doctor1</p>
              <p>Password: doc123</p>
            </div>
            <div>
              <p className="font-medium text-teal-400">Patient</p>
              <p>Username: patient1</p>
              <p>Password: pat123</p>
            </div>
            <div>
              <p className="font-medium text-teal-400">Caretaker</p>
              <p>Username: caretaker1</p>
              <p>Password: care123</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
