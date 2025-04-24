import {useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext";
import mockDataService from "../services/mockDataService";
import "../styles/DashboardCommon.css";

const CaretakerDashboard = () => {
  const {currentUser} = useAuth();
  const [activeTab, setActiveTab] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use the mock data service to fetch data
        // Get all doctors for reference
        const doctorsData = await mockDataService.users.getDoctors();
        setDoctors(doctorsData);

        // Get assigned patients
        if (
          currentUser.assignedPatients &&
          currentUser.assignedPatients.length > 0
        ) {
          // Get details for each assigned patient
          const patientPromises = currentUser.assignedPatients.map(
            (patientId) => mockDataService.users.getPatientById(patientId)
          );

          const patientData = await Promise.all(patientPromises);
          setPatients(patientData);

          // Get medical reports for all assigned patients
          const reportsPromises = currentUser.assignedPatients.map(
            (patientId) =>
              mockDataService.medicalReports
                .getMedicalReportsByPatient(patientId)
                .catch(() => []) // Handle case where patient has no reports
          );

          const reportsData = await Promise.all(reportsPromises);
          // Flatten the array of arrays
          setMedicalReports(reportsData.flat());
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [currentUser.assignedPatients]);

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

  return (
    <div className="caretaker-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Caretaker Dashboard</h2>
          <p>Welcome, {currentUser.fullName || currentUser.username}</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-tabs">
          <button
            className={activeTab === "patients" ? "active" : ""}
            onClick={() => setActiveTab("patients")}
          >
            My Patients
          </button>
          <button
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Medical Reports
          </button>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading data...</div>
          ) : (
            <>
              {/* Patients Tab */}
              {activeTab === "patients" && (
                <div className="patients-tab">
                  <h3>My Patients</h3>

                  {patients.length === 0 ? (
                    <div className="no-data">
                      No patients assigned to you yet.
                    </div>
                  ) : (
                    <div className="patient-cards">
                      {patients.map((patient) => (
                        <div className="patient-card" key={patient.id}>
                          <div className="patient-header">
                            <h4>{patient.fullName}</h4>
                            <span className="patient-id">ID: {patient.id}</span>
                          </div>

                          <div className="patient-info">
                            <p>
                              <strong>Age:</strong>{" "}
                              {new Date().getFullYear() -
                                new Date(
                                  patient.dateOfBirth
                                ).getFullYear()}{" "}
                              years
                            </p>
                            <p>
                              <strong>Gender:</strong> {patient.gender}
                            </p>
                            <p>
                              <strong>Contact:</strong>{" "}
                              {patient.contactInfo.phone}
                            </p>
                            <p>
                              <strong>Assigned Doctor:</strong>{" "}
                              {getDoctorName(patient.assignedDoctor)}
                            </p>
                          </div>

                          <div className="patient-health">
                            <h5>Health Information</h5>
                            <p>
                              <strong>Conditions:</strong>{" "}
                              {patient.healthInfo.currentConditions.join(", ")}
                            </p>
                            <p>
                              <strong>Allergies:</strong>{" "}
                              {patient.healthInfo.allergies.join(", ")}
                            </p>
                            <p>
                              <strong>Medications:</strong>{" "}
                              {patient.healthInfo.medications
                                .map((med) => `${med.name} (${med.dosage})`)
                                .join(", ")}
                            </p>
                          </div>

                          <div className="patient-actions">
                            <button className="button">
                              View Full Details
                            </button>
                            <button className="button secondary">
                              Add Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Medical Reports Tab */}
              {activeTab === "reports" && (
                <div className="reports-tab">
                  <h3>Patient Medical Reports</h3>

                  {medicalReports.length === 0 ? (
                    <div className="no-data">
                      No medical reports available for your patients.
                    </div>
                  ) : (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Report ID</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Diagnosis</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicalReports.map((report) => (
                            <tr key={report.id}>
                              <td>{report.id}</td>
                              <td>{getPatientName(report.patientId)}</td>
                              <td>{getDoctorName(report.doctorId)}</td>
                              <td>
                                {new Date(report.date).toLocaleDateString()}
                              </td>
                              <td>{report.diagnosis}</td>
                              <td>
                                <button className="action-btn">View</button>
                                <button className="action-btn">
                                  Add Notes
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="add-new">
                    <button className="button">Create New Report</button>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="profile-tab">
                  <h3>My Profile</h3>

                  <div className="profile-card">
                    <div className="profile-section">
                      <h4>Personal Information</h4>
                      <div className="profile-info">
                        <p>
                          <strong>Full Name:</strong>{" "}
                          {currentUser.fullName || "Not provided"}
                        </p>
                        <p>
                          <strong>ID:</strong>{" "}
                          {currentUser.id || "Not provided"}
                        </p>
                        <p>
                          <strong>Gender:</strong>{" "}
                          {currentUser.gender || "Not provided"}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong>{" "}
                          {currentUser.dateOfBirth
                            ? new Date(
                                currentUser.dateOfBirth
                              ).toLocaleDateString()
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="profile-section">
                      <h4>Contact Information</h4>
                      <div className="profile-info">
                        <p>
                          <strong>Email:</strong>{" "}
                          {currentUser.contactInfo?.email || "Not provided"}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {currentUser.contactInfo?.phone || "Not provided"}
                        </p>
                        <p>
                          <strong>Address:</strong>{" "}
                          {currentUser.address
                            ? `${currentUser.address.city || ""}, ${
                                currentUser.address.state || ""
                              } ${currentUser.address.zipCode || ""}`
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="profile-section">
                      <h4>Employment Details</h4>
                      <div className="profile-info">
                        <p>
                          <strong>Relationship:</strong>{" "}
                          {currentUser.employmentDetails?.relationship ||
                            "Not provided"}
                        </p>
                        <p>
                          <strong>Availability:</strong>{" "}
                          {currentUser.employmentDetails
                            ?.availabilitySchedule || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="profile-section">
                      <h4>Skills & Experience</h4>
                      <div className="profile-info">
                        <p>
                          <strong>Certifications:</strong>{" "}
                          {currentUser.skillsAndExperience?.certifications
                            ? currentUser.skillsAndExperience.certifications.join(
                                ", "
                              )
                            : "Not provided"}
                        </p>
                        <p>
                          <strong>Years of Experience:</strong>{" "}
                          {currentUser.skillsAndExperience?.yearsOfExperience ||
                            "Not provided"}
                        </p>
                        <p>
                          <strong>Notes:</strong>{" "}
                          {currentUser.notes || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="profile-section">
                      <h4>Emergency Contact</h4>
                      <div className="profile-info">
                        <p>
                          <strong>Name:</strong>{" "}
                          {currentUser.emergencyContact?.name || "Not provided"}
                        </p>
                        <p>
                          <strong>Relation:</strong>{" "}
                          {currentUser.emergencyContact?.relation ||
                            "Not provided"}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {currentUser.emergencyContact?.phone ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="profile-actions">
                      <button className="button">Edit Profile</button>
                      <button className="button secondary">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
