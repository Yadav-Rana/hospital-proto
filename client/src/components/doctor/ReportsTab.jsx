import React from "react";

const ReportsTab = ({ medicalReports, getPatientName }) => {
  return (
    <div className="reports-tab">
      <h3>Medical Reports</h3>

      {medicalReports.length === 0 ? (
        <div className="no-data">No medical reports created yet.</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Patient</th>
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
                  <td>{new Date(report.date).toLocaleDateString()}</td>
                  <td>{report.diagnosis}</td>
                  <td>
                    <button className="action-btn">View</button>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
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
  );
};

export default ReportsTab;
