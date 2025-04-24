import {useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext";
import mockDataService from "../services/mockDataService";
import "../styles/DashboardCommon.css";

// Import tab components
import OverviewTab from "../components/patient/OverviewTab";
import MedicalReportsTab from "../components/patient/MedicalReportsTab";
import ProfileTab from "../components/patient/ProfileTab";

const PatientDashboard = () => {
  const {currentUser} = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [doctor, setDoctor] = useState(null);
  const [caretaker, setCaretaker] = useState(null);
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use the mock data service to fetch data
        // Fetch assigned doctor
        if (currentUser.assignedDoctor) {
          const doctorData = await mockDataService.users.getDoctorById(
            currentUser.assignedDoctor
          );
          setDoctor(doctorData);
        }

        // Fetch assigned caretaker
        if (currentUser.assignedCaretaker) {
          const caretakerData = await mockDataService.users.getCaretakerById(
            currentUser.assignedCaretaker
          );
          setCaretaker(caretakerData);
        }

        // Fetch medical reports
        const reportsData =
          await mockDataService.medicalReports.getMedicalReportsByPatient(
            currentUser.id
          );
        setMedicalReports(reportsData);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [
    currentUser.id,
    currentUser.assignedDoctor,
    currentUser.assignedCaretaker,
  ]);

  return (
    <div className="patient-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Patient Dashboard</h2>
          <p>Welcome, {currentUser.fullName || currentUser.username}</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-tabs">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "medical-reports" ? "active" : ""}
            onClick={() => setActiveTab("medical-reports")}
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
              {activeTab === "overview" && (
                <OverviewTab
                  doctor={doctor}
                  caretaker={caretaker}
                  medicalReports={medicalReports}
                  setActiveTab={setActiveTab}
                  currentUser={currentUser}
                />
              )}

              {activeTab === "medical-reports" && (
                <MedicalReportsTab medicalReports={medicalReports} />
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

export default PatientDashboard;
