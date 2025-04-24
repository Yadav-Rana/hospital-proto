import React from "react";

const MedicalReportsTab = ({ medicalReports }) => {
  return (
    <div className="medical-reports-tab">
      <h3>Your Medical Reports</h3>

      {medicalReports.length === 0 ? (
        <div className="no-data">No medical reports available.</div>
      ) : (
        <div className="reports-list">
          {medicalReports.map((report) => (
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
              <div className="report-actions">
                <button className="button secondary">Print Report</button>
                <button className="button">Request Update</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="add-new">
        <button className="button">Request New Report</button>
      </div>
    </div>
  );
};

export default MedicalReportsTab;
