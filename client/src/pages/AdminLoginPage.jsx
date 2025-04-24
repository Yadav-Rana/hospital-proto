import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {motion} from "framer-motion";
import {FiLock, FiUser, FiAlertCircle, FiShield, FiKey} from "react-icons/fi";
import "../styles/LoginPage.css";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {login, currentUser} = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in as admin
  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const user = await login(username, password, "admin");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        setError("You do not have admin privileges");
      }
    } catch (err) {
      setError("Invalid admin credentials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 admin-login-page">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <div className="text-center">
          <motion.div
            className="admin-icon-container mx-auto mb-4"
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{delay: 0.1, duration: 0.5}}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "rgba(20, 184, 166, 0.2)",
              margin: "0 auto",
              color: "#14b8a6",
              border: "2px solid rgba(20, 184, 166, 0.5)",
            }}
          >
            <FiShield size={40} />
          </motion.div>
          <motion.h2
            className="text-3xl font-extrabold glow-text"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.2, duration: 0.5}}
          >
            Admin Access
          </motion.h2>
          <motion.p
            className="mt-2 text-zinc-400"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3, duration: 0.5}}
          >
            Restricted area. Authorized personnel only.
          </motion.p>
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
            <label htmlFor="username" className="form-label flex items-center">
              <FiUser className="mr-2" /> Admin Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="Enter admin username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label flex items-center">
              <FiKey className="mr-2" /> Admin Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Enter admin password"
            />
          </div>

          <div>
            <motion.button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
              disabled={loading}
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <FiShield className="mr-2" /> Secure Admin Login
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          className="demo-credentials mt-6 p-4"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.5, duration: 0.5}}
        >
          <h3 className="flex items-center text-teal-400 mb-2">
            <FiAlertCircle className="mr-2" /> Demo Admin Credentials
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="credential-item">
              <p>
                <strong>Username:</strong> admin
              </p>
              <p>
                <strong>Password:</strong> admin123
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
