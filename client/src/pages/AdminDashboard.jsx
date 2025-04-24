import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {motion} from "framer-motion";
import {
  FiUser,
  FiUsers,
  FiActivity,
  FiShield,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiBarChart2,
} from "react-icons/fi";
import Modal from "../components/Modal";
import DoctorForm from "../components/DoctorForm";
import PatientForm from "../components/PatientForm";
import CaretakerForm from "../components/CaretakerForm";
import AssignmentForm from "../components/AssignmentForm";
import mockDataService from "../services/mockDataService";
import "../styles/AdminDashboardNew.css";

const AdminDashboard = () => {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const {tab} = useParams();
  const [activeTab, setActiveTab] = useState(tab || "overview");

  // Modal states
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isCaretakerModalOpen, setIsCaretakerModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  // Update URL when tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab !== "overview") {
      navigate(`/admin/${newTab}`);
    } else {
      navigate("/admin");
    }
  };

  // Sync with URL params when they change
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Form submission handlers
  const handleDoctorSubmit = async (formData) => {
    try {
      console.log("Doctor form submitted:", formData);
      // Use the mock data service to add a new doctor
      const newDoctor = await mockDataService.users.addDoctor(formData);
      console.log("New doctor added:", newDoctor);

      // Refresh the doctors list
      const updatedDoctors = await mockDataService.users.getDoctors();
      setDoctors(updatedDoctors);

      setIsDoctorModalOpen(false);
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handlePatientSubmit = async (formData) => {
    try {
      console.log("Patient form submitted:", formData);
      // Use the mock data service to add a new patient
      const newPatient = await mockDataService.users.addPatient(formData);
      console.log("New patient added:", newPatient);

      // Refresh the patients list
      const updatedPatients = await mockDataService.users.getPatients();
      setPatients(updatedPatients);

      setIsPatientModalOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleCaretakerSubmit = async (formData) => {
    try {
      console.log("Caretaker form submitted:", formData);
      // Use the mock data service to add a new caretaker
      const newCaretaker = await mockDataService.users.addCaretaker(formData);
      console.log("New caretaker added:", newCaretaker);

      // Refresh the caretakers list
      const updatedCaretakers = await mockDataService.users.getCaretakers();
      setCaretakers(updatedCaretakers);

      setIsCaretakerModalOpen(false);
    } catch (error) {
      console.error("Error adding caretaker:", error);
    }
  };

  const handleAssignmentSubmit = async (formData) => {
    try {
      console.log("Assignment form submitted:", formData);
      // Use the mock data service to create a new assignment
      const newAssignment = await mockDataService.assignments.createAssignment(
        formData
      );
      console.log("New assignment created:", newAssignment);

      // Refresh the assignments list
      const updatedAssignments =
        await mockDataService.assignments.getAssignments();
      setAssignments(updatedAssignments);

      setIsAssignmentModalOpen(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use the mock data service to fetch data
        const [doctorsData, patientsData, caretakersData, assignmentsData] =
          await Promise.all([
            mockDataService.users.getDoctors(),
            mockDataService.users.getPatients(),
            mockDataService.users.getCaretakers(),
            mockDataService.assignments.getAssignments(),
          ]);

        setDoctors(doctorsData);
        setPatients(patientsData);
        setCaretakers(caretakersData);
        setAssignments(assignmentsData);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Function to get doctor name by ID
  const getDoctorName = (id) => {
    const doctor = doctors.find((doc) => doc.id === id);
    return doctor ? doctor.fullName : "Unknown";
  };

  // Function to get patient name by ID
  const getPatientName = (id) => {
    const patient = patients.find((pat) => pat.id === id);
    return patient ? patient.fullName : "Unknown";
  };

  // Function to get caretaker name by ID
  const getCaretakerName = (id) => {
    const caretaker = caretakers.find((care) => care.id === id);
    return caretaker ? caretaker.fullName : "Unknown";
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <motion.div
          className="dashboard-header"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h2>Admin Dashboard</h2>
          <p>Welcome, {currentUser.username || "Administrator"}</p>
        </motion.div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-tabs">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => handleTabChange("overview")}
          >
            <FiBarChart2 size={20} />
            Overview
          </button>
          <button
            className={activeTab === "doctors" ? "active" : ""}
            onClick={() => handleTabChange("doctors")}
          >
            <FiUser size={20} />
            Doctors
          </button>
          <button
            className={activeTab === "patients" ? "active" : ""}
            onClick={() => handleTabChange("patients")}
          >
            <FiActivity size={20} />
            Patients
          </button>
          <button
            className={activeTab === "caretakers" ? "active" : ""}
            onClick={() => handleTabChange("caretakers")}
          >
            <FiUsers size={20} />
            Caretakers
          </button>
          <button
            className={activeTab === "assignments" ? "active" : ""}
            onClick={() => handleTabChange("assignments")}
          >
            <FiShield size={20} />
            Assignments
          </button>
        </div>

        <div
          className="dashboard-content"
          style={{
            overflow: "auto",
            maxHeight: "calc(100vh - 220px)",
            backgroundColor: "var(--dark-zinc-800)",
          }}
        >
          {loading ? (
            <div className="loading">Loading data...</div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="overview-tab" style={{overflow: "visible"}}>
                  <div className="stats-grid">
                    <motion.div
                      className="stat-card"
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.5, delay: 0.1}}
                    >
                      <div className="stat-icon">
                        <FiUser size={24} />
                      </div>
                      <h3>Total Doctors</h3>
                      <p className="stat-number">{doctors.length}</p>
                    </motion.div>
                    <motion.div
                      className="stat-card"
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.5, delay: 0.2}}
                    >
                      <div className="stat-icon">
                        <FiActivity size={24} />
                      </div>
                      <h3>Total Patients</h3>
                      <p className="stat-number">{patients.length}</p>
                    </motion.div>
                    <motion.div
                      className="stat-card"
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.5, delay: 0.3}}
                    >
                      <div className="stat-icon">
                        <FiUsers size={24} />
                      </div>
                      <h3>Total Caretakers</h3>
                      <p className="stat-number">{caretakers.length}</p>
                    </motion.div>
                    <motion.div
                      className="stat-card"
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.5, delay: 0.4}}
                    >
                      <div className="stat-icon">
                        <FiShield size={24} />
                      </div>
                      <h3>Total Assignments</h3>
                      <p className="stat-number">{assignments.length}</p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Doctors Tab */}
              {activeTab === "doctors" && (
                <div className="doctors-tab">
                  <h3>Doctors List</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Specialization</th>
                          <th>Experience</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map((doctor) => (
                          <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.fullName}</td>
                            <td>{doctor.professionalDetails.specialization}</td>
                            <td>
                              {doctor.professionalDetails.yearsOfExperience}{" "}
                              years
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  doctor.professionalDetails
                                    .registrationStatus === "Active"
                                    ? "badge-accent"
                                    : "badge-secondary"
                                }`}
                              >
                                {doctor.professionalDetails.registrationStatus}
                              </span>
                            </td>
                            <td>
                              <button
                                className="action-btn"
                                onClick={() => {
                                  // View doctor details
                                  console.log("View doctor:", doctor);
                                  // Here you would typically open a modal with doctor details
                                }}
                              >
                                <FiEye /> View
                              </button>
                              <button
                                className="action-btn"
                                onClick={() => {
                                  // Edit doctor
                                  console.log("Edit doctor:", doctor);
                                  // Here you would typically open a form to edit the doctor
                                }}
                              >
                                <FiEdit /> Edit
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={async () => {
                                  // Delete doctor
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete ${doctor.fullName}?`
                                    )
                                  ) {
                                    try {
                                      await mockDataService.users.deleteDoctor(
                                        doctor.id
                                      );
                                      // Refresh the doctors list
                                      const updatedDoctors =
                                        await mockDataService.users.getDoctors();
                                      setDoctors(updatedDoctors);
                                    } catch (error) {
                                      console.error(
                                        "Error deleting doctor:",
                                        error
                                      );
                                      setError(
                                        "Failed to delete doctor. Please try again."
                                      );
                                    }
                                  }
                                }}
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="add-new">
                    <button
                      className="button"
                      onClick={() => setIsDoctorModalOpen(true)}
                    >
                      <FiPlus size={20} /> Add New Doctor
                    </button>
                  </div>
                </div>
              )}

              {/* Patients Tab */}
              {activeTab === "patients" && (
                <div className="patients-tab">
                  <h3>Patients List</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Doctor</th>
                          <th>Caretaker</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.map((patient) => {
                          // Calculate age from date of birth
                          const birthDate = new Date(patient.dateOfBirth);
                          const today = new Date();
                          let age =
                            today.getFullYear() - birthDate.getFullYear();
                          const monthDiff =
                            today.getMonth() - birthDate.getMonth();
                          if (
                            monthDiff < 0 ||
                            (monthDiff === 0 &&
                              today.getDate() < birthDate.getDate())
                          ) {
                            age--;
                          }

                          return (
                            <tr key={patient.id}>
                              <td>{patient.id}</td>
                              <td>{patient.fullName}</td>
                              <td>{age} years</td>
                              <td>{getDoctorName(patient.assignedDoctor)}</td>
                              <td>
                                {getCaretakerName(patient.assignedCaretaker)}
                              </td>
                              <td>
                                <button
                                  className="action-btn"
                                  onClick={() => {
                                    // View patient details
                                    console.log("View patient:", patient);
                                    // Here you would typically open a modal with patient details
                                  }}
                                >
                                  <FiEye size={16} />
                                </button>
                                <button
                                  className="action-btn"
                                  onClick={() => {
                                    // Edit patient
                                    console.log("Edit patient:", patient);
                                    // Here you would typically open a form to edit the patient
                                  }}
                                >
                                  <FiEdit size={16} />
                                </button>
                                <button
                                  className="action-btn delete"
                                  onClick={async () => {
                                    // Delete patient
                                    if (
                                      window.confirm(
                                        `Are you sure you want to delete ${patient.fullName}?`
                                      )
                                    ) {
                                      try {
                                        await mockDataService.users.deletePatient(
                                          patient.id
                                        );
                                        // Refresh the patients list
                                        const updatedPatients =
                                          await mockDataService.users.getPatients();
                                        setPatients(updatedPatients);
                                      } catch (error) {
                                        console.error(
                                          "Error deleting patient:",
                                          error
                                        );
                                        setError(
                                          "Failed to delete patient. Please try again."
                                        );
                                      }
                                    }
                                  }}
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="add-new">
                    <button
                      className="button"
                      onClick={() => setIsPatientModalOpen(true)}
                    >
                      <FiPlus size={20} /> Add New Patient
                    </button>
                  </div>
                </div>
              )}

              {/* Caretakers Tab */}
              {activeTab === "caretakers" && (
                <div className="caretakers-tab">
                  <h3>Caretakers List</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Experience</th>
                          <th>Certifications</th>
                          <th>Assigned Patients</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caretakers.map((caretaker) => (
                          <tr key={caretaker.id}>
                            <td>{caretaker.id}</td>
                            <td>{caretaker.fullName}</td>
                            <td>
                              {caretaker.skillsAndExperience.yearsOfExperience}{" "}
                              years
                            </td>
                            <td>
                              {caretaker.skillsAndExperience.certifications.join(
                                ", "
                              )}
                            </td>
                            <td>{caretaker.assignedPatients.length}</td>
                            <td>
                              <button
                                className="action-btn"
                                onClick={() => {
                                  // View caretaker details
                                  console.log("View caretaker:", caretaker);
                                  // Here you would typically open a modal with caretaker details
                                }}
                              >
                                <FiEye /> View
                              </button>
                              <button
                                className="action-btn"
                                onClick={() => {
                                  // Edit caretaker
                                  console.log("Edit caretaker:", caretaker);
                                  // Here you would typically open a form to edit the caretaker
                                }}
                              >
                                <FiEdit /> Edit
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={async () => {
                                  // Delete caretaker
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete ${caretaker.fullName}?`
                                    )
                                  ) {
                                    try {
                                      await mockDataService.users.deleteCaretaker(
                                        caretaker.id
                                      );
                                      // Refresh the caretakers list
                                      const updatedCaretakers =
                                        await mockDataService.users.getCaretakers();
                                      setCaretakers(updatedCaretakers);
                                    } catch (error) {
                                      console.error(
                                        "Error deleting caretaker:",
                                        error
                                      );
                                      setError(
                                        "Failed to delete caretaker. Please try again."
                                      );
                                    }
                                  }
                                }}
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="add-new">
                    <button
                      className="button"
                      onClick={() => setIsCaretakerModalOpen(true)}
                    >
                      <FiPlus size={20} /> Add New Caretaker
                    </button>
                  </div>
                </div>
              )}

              {/* Assignments Tab */}
              {activeTab === "assignments" && (
                <div className="assignments-tab">
                  <h3>Patient Assignments</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Doctor</th>
                          <th>Caretaker</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.map((assignment, index) => (
                          <tr key={index}>
                            <td>{getPatientName(assignment.patientId)}</td>
                            <td>{getDoctorName(assignment.doctorId)}</td>
                            <td>{getCaretakerName(assignment.caretakerId)}</td>
                            <td>
                              {new Date(
                                assignment.startDate
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {assignment.endDate
                                ? new Date(
                                    assignment.endDate
                                  ).toLocaleDateString()
                                : "Ongoing"}
                            </td>
                            <td>
                              <button
                                className="action-btn"
                                onClick={() => {
                                  // Edit assignment
                                  console.log("Edit assignment:", assignment);
                                  // Here you would typically open a form to edit the assignment
                                }}
                              >
                                <FiEdit /> Edit
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={async () => {
                                  // End assignment
                                  if (
                                    window.confirm(
                                      `Are you sure you want to end this assignment?`
                                    )
                                  ) {
                                    try {
                                      // In a real app, you would update the assignment with an end date
                                      // For now, we'll just delete it
                                      await mockDataService.assignments.deleteAssignment(
                                        assignment.id
                                      );
                                      // Refresh the assignments list
                                      const updatedAssignments =
                                        await mockDataService.assignments.getAssignments();
                                      setAssignments(updatedAssignments);
                                    } catch (error) {
                                      console.error(
                                        "Error ending assignment:",
                                        error
                                      );
                                      setError(
                                        "Failed to end assignment. Please try again."
                                      );
                                    }
                                  }
                                }}
                              >
                                <FiTrash2 /> End
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="add-new">
                    <button
                      className="button"
                      onClick={() => setIsAssignmentModalOpen(true)}
                    >
                      <FiPlus size={20} /> Create New Assignment
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        title="Add New Doctor"
      >
        <DoctorForm
          onSubmit={handleDoctorSubmit}
          onCancel={() => setIsDoctorModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        title="Add New Patient"
      >
        <PatientForm
          onSubmit={handlePatientSubmit}
          onCancel={() => setIsPatientModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCaretakerModalOpen}
        onClose={() => setIsCaretakerModalOpen(false)}
        title="Add New Caretaker"
      >
        <CaretakerForm
          onSubmit={handleCaretakerSubmit}
          onCancel={() => setIsCaretakerModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        title="Create New Assignment"
      >
        <AssignmentForm
          onSubmit={handleAssignmentSubmit}
          onCancel={() => setIsAssignmentModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
