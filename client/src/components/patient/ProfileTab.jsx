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
            <p>
              <strong>Marital Status:</strong>{" "}
              {currentUser.maritalStatus || "Not provided"}
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
          <h4>Insurance Information</h4>
          <div className="profile-info">
            <p>
              <strong>Provider:</strong>{" "}
              {currentUser.insuranceDetails?.provider || "Not provided"}
            </p>
            <p>
              <strong>Policy Number:</strong>{" "}
              {currentUser.insuranceDetails?.policyNumber || "Not provided"}
            </p>
            <p>
              <strong>Group Number:</strong>{" "}
              {currentUser.insuranceDetails?.groupNumber || "Not provided"}
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
              {currentUser.emergencyContact?.relation || "Not provided"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {currentUser.emergencyContact?.phone || "Not provided"}
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
