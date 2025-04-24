import React from "react";

const PatientsTab = ({ patients, getCaretakerName }) => {
  return (
    <div className="patients-tab">
      <h3>My Patients</h3>

      {patients.length === 0 ? (
        <div className="no-data">No patients assigned to you yet.</div>
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
                    new Date(patient.dateOfBirth).getFullYear()}{" "}
                  years
                </p>
                <p>
                  <strong>Gender:</strong> {patient.gender}
                </p>
                <p>
                  <strong>Contact:</strong> {patient.contactInfo.phone}
                </p>
                <p>
                  <strong>Caretaker:</strong>{" "}
                  {getCaretakerName(patient.assignedCaretaker)}
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
                <button className="button">View Full Details</button>
                <button className="button secondary">Add Medical Report</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsTab;
