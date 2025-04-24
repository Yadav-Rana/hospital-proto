import {useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext";
import mockDataService from "../services/mockDataService";
import "../styles/DashboardCommon.css";

// Import tab components
import PatientsTab from "../components/doctor/PatientsTab";
import ReportsTab from "../components/doctor/ReportsTab";
import ProfileTab from "../components/doctor/ProfileTab";

const DoctorDashboard = () => {
  const {currentUser} = useAuth();
  const [activeTab, setActiveTab] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use the mock data service to fetch data
        // Get assignments for this doctor
        const assignmentsData =
          await mockDataService.assignments.getAssignmentsByDoctor(
            currentUser.id
          );

        // Get patient details for each assignment
        const patientPromises = assignmentsData.map((assignment) =>
          mockDataService.users.getPatientById(assignment.patientId)
        );

        const patientData = await Promise.all(patientPromises);
        setPatients(patientData);

        // Get all caretakers
        const caretakersData = await mockDataService.users.getCaretakers();
        setCaretakers(caretakersData);

        // Get all medical reports
        const reportsData =
          await mockDataService.medicalReports.getMedicalReports();

        // Filter reports for this doctor's patients
        const doctorReports = reportsData.filter(
          (report) => report.doctorId === currentUser.id
        );
        setMedicalReports(doctorReports);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [currentUser.id]);

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
    <div className="doctor-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Doctor Dashboard</h2>
          <p>Welcome, Dr. {currentUser.fullName || currentUser.username}</p>
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
              {/* Render the appropriate tab component based on activeTab */}
              {activeTab === "patients" && (
                <PatientsTab
                  patients={patients}
                  getCaretakerName={getCaretakerName}
                />
              )}

              {activeTab === "reports" && (
                <ReportsTab
                  medicalReports={medicalReports}
                  getPatientName={getPatientName}
                />
              )}

              {activeTab === "profile" && (
                <ProfileTab currentUser={currentUser} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
