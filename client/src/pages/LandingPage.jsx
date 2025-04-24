import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {motion} from "framer-motion";
import {
  FiUser,
  FiUsers,
  FiActivity,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

// Import the nameplate styles
import "../styles/Nameplate.css";

const LandingPage = () => {
  const {currentUser} = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.5},
    },
  };

  const cardVariants = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {duration: 0.5},
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(20, 184, 166, 0.7)",
      borderColor: "#14b8a6",
      transition: {duration: 0.3},
    },
  };

  const nameplateVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {delay: 0.5, duration: 0.5},
    },
  };

  return (
    <div className="min-h-screen landing-page-container">
      {/* Hero Section - Minimal Centered Nameplate */}
      <section className="min-h-screen flex items-center justify-center particles-container">
        {/* Particles */}
        <div className="particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`particle ${
                i % 2 === 0 ? "particle-teal" : "particle-orange"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 3}px`,
                height: `${Math.random() * 4 + 3}px`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <div className="container text-center">
          <motion.div
            className="mb-24 relative overflow-visible nameplate-container"
            initial="hidden"
            animate="visible"
            whileHover="pulse"
            variants={nameplateVariants}
          >
            {/* No background box */}
            <div className="nameplate-content py-20 px-12 md:py-28 md:px-24">
              <motion.h1
                className="text-10xl md:text-7xl font-bold mb-8 glow-text"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(45, 212, 191, 0.5), 0 0 10px rgba(45, 212, 191, 0.3)",
                    "0 0 8px rgba(45, 212, 191, 0.6), 0 0 15px rgba(45, 212, 191, 0.4)",
                    "0 0 5px rgba(45, 212, 191, 0.5), 0 0 10px rgba(45, 212, 191, 0.3)",
                  ],
                  color: [
                    "rgba(45, 212, 191, 0.95)",
                    "rgba(56, 232, 211, 0.95)",
                    "rgba(45, 212, 191, 0.95)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                XYZ Hospital
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto subtitle-glow"
                animate={{
                  opacity: [0.85, 0.95, 0.85],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* A comprehensive solution for managing healthcare operations */}
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            {!currentUser ? (
              <>
                <motion.div whileHover={{scale: 1.05}} className="inline-block">
                  <Link
                    to="/login"
                    className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
                  >
                    User Login <FiArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                {/* <motion.div
                  whileHover={{scale: 1.05}}
                  className="inline-block"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.7}}
                >
                  <Link
                    to="/admin/login"
                    className="btn btn-secondary text-lg px-8 py-3 inline-flex items-center"
                  >
                    <FiShield className="mr-2" /> Admin Access
                  </Link>
                </motion.div> */}
              </>
            ) : (
              <motion.div whileHover={{scale: 1.05}} className="inline-block">
                <Link
                  to={`/${currentUser.role}`}
                  className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
                >
                  Go to Dashboard <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-dark-zinc-800">
        <div className="container">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 glow-text"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 px-4">
            <motion.div
              className="card card-hover"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{once: true}}
            >
              <div className="text-teal-400 text-4xl mb-4">
                <FiUser />
              </div>
              <h3 className="text-xl font-semibold mb-2">Doctor Management</h3>
              <p className="text-zinc-400">
                Efficiently manage doctor profiles, specializations, and
                schedules
              </p>
            </motion.div>

            <motion.div
              className="card card-hover"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{once: true}}
              transition={{delay: 0.1}}
            >
              <div className="text-teal-400 text-4xl mb-4">
                <FiActivity />
              </div>
              <h3 className="text-xl font-semibold mb-2">Patient Care</h3>
              <p className="text-zinc-400">
                Comprehensive patient records and medical history tracking
              </p>
            </motion.div>

            <motion.div
              className="card card-hover"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{once: true}}
              transition={{delay: 0.2}}
            >
              <div className="text-teal-400 text-4xl mb-4">
                <FiUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Caretaker Coordination
              </h3>
              <p className="text-zinc-400">
                Assign and manage caretakers for optimal patient support
              </p>
            </motion.div>

            <motion.div
              className="card card-hover"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{once: true}}
              transition={{delay: 0.3}}
            >
              <div className="text-teal-400 text-4xl mb-4">
                <FiShield />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Administrative Tools
              </h3>
              <p className="text-zinc-400">
                Powerful tools for hospital administrators to oversee operations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-8 glow-text"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
          >
            About Our System
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto text-center text-zinc-400"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.2}}
          >
            <p className="mb-4">
              Our XYZ Hospital management System is designed to streamline
              healthcare operations, improve patient care, and enhance
              communication between doctors, patients, and caretakers.
            </p>
            <p>
              The system provides role-based access for administrators, doctors,
              patients, and caretakers, ensuring that each user has access to
              the information and tools they need while maintaining data
              security and privacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-zinc-800 border-t border-dark-zinc-700">
        <div className="container text-center text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Hospital Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
