import React from "react";

const OverviewTab = ({ doctor, caretaker, medicalReports, setActiveTab, currentUser }) => {
  return (
    <div className="overview-tab">
      <div className="care-team-section">
        <h3>Your Care Team</h3>

        <div className="care-team-cards">
          {doctor && (
            <div className="care-team-card">
              <div className="care-team-header">
                <h4>Your Doctor</h4>
              </div>
              <div className="care-team-info">
                <p>
                  <strong>Name:</strong> {doctor.fullName}
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {doctor.professionalDetails.specialization}
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  {doctor.professionalDetails.yearsOfExperience} years
                </p>
                <p>
                  <strong>Contact:</strong> {doctor.contactInfo.phone}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.contactInfo.email}
                </p>
              </div>
            </div>
          )}

          {caretaker && (
            <div className="care-team-card">
              <div className="care-team-header">
                <h4>Your Caretaker</h4>
              </div>
              <div className="care-team-info">
                <p>
                  <strong>Name:</strong> {caretaker.fullName}
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  {caretaker.skillsAndExperience.yearsOfExperience} years
                </p>
                <p>
                  <strong>Certifications:</strong>{" "}
                  {caretaker.skillsAndExperience.certifications.join(", ")}
                </p>
                <p>
                  <strong>Contact:</strong> {caretaker.contactInfo.phone}
                </p>
                <p>
                  <strong>Email:</strong> {caretaker.contactInfo.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="health-summary-section">
        <h3>Health Summary</h3>

        <div className="health-summary-card">
          <div className="health-summary-item">
            <h4>Current Conditions</h4>
            <ul>
              {currentUser.healthInfo.currentConditions.map(
                (condition, index) => (
                  <li key={index}>{condition}</li>
                )
              )}
            </ul>
          </div>

          <div className="health-summary-item">
            <h4>Allergies</h4>
            <ul>
              {currentUser.healthInfo.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          </div>

          <div className="health-summary-item">
            <h4>Current Medications</h4>
            <ul>
              {currentUser.healthInfo.medications.map((medication, index) => (
                <li key={index}>
                  {medication.name} - {medication.dosage}
                </li>
              ))}
            </ul>
          </div>

          <div className="health-summary-item">
            <h4>Immunization Records</h4>
            <ul>
              {currentUser.healthInfo.immunizationRecords.map(
                (record, index) => (
                  <li key={index}>{record}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="recent-reports-section">
        <h3>Recent Medical Reports</h3>

        {medicalReports.length === 0 ? (
          <div className="no-data">No medical reports available.</div>
        ) : (
          <div className="recent-reports-list">
            {medicalReports.slice(0, 3).map((report) => (
              <div className="report-card" key={report.id}>
                <div className="report-header">
                  <h4>Report: {report.id}</h4>
                  <span className="report-date">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="report-content">
                  <p>
                    <strong>Diagnosis:</strong> {report.diagnosis}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {report.treatment}
                  </p>
                  <p>
                    <strong>Notes:</strong> {report.notes}
                  </p>
                </div>
                <button className="button secondary">View Full Report</button>
              </div>
            ))}

            {medicalReports.length > 3 && (
              <button
                className="view-all-button"
                onClick={() => setActiveTab("medical-reports")}
              >
                View All Reports
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
