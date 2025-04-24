import React from "react";

const ProfileTab = ({ currentUser }) => {
  return (
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
              <strong>ID:</strong> {currentUser.id || "Not provided"}
            </p>
            <p>
              <strong>Gender:</strong> {currentUser.gender || "Not provided"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {currentUser.dateOfBirth
                ? new Date(currentUser.dateOfBirth).toLocaleDateString()
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
          <h4>Professional Details</h4>
          <div className="profile-info">
            <p>
              <strong>License Number:</strong>{" "}
              {currentUser.professionalDetails?.licenseNumber || "Not provided"}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {currentUser.professionalDetails?.specialization || "Not provided"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {currentUser.professionalDetails?.yearsOfExperience
                ? `${currentUser.professionalDetails.yearsOfExperience} years`
                : "Not provided"}
            </p>
            <p>
              <strong>Qualifications:</strong>{" "}
              {currentUser.professionalDetails?.qualifications
                ? currentUser.professionalDetails.qualifications.join(", ")
                : "Not provided"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {currentUser.professionalDetails?.registrationStatus ||
                "Not provided"}
            </p>
          </div>
        </div>

        <div className="profile-section">
          <h4>Employment Details</h4>
          <div className="profile-info">
            <p>
              <strong>Current Hospital:</strong>{" "}
              {currentUser.employmentDetails?.currentHospital || "Not provided"}
            </p>
            <p>
              <strong>Work Schedule:</strong>{" "}
              {currentUser.employmentDetails?.workSchedule || "Not provided"}
            </p>
            <p>
              <strong>Employment Type:</strong>{" "}
              {currentUser.employmentDetails?.employmentType || "Not provided"}
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="button">Edit Profile</button>
          <button className="button secondary">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
