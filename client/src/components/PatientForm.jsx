import React, {useState} from "react";
import {FiSave, FiX} from "react-icons/fi";

const PatientForm = ({onSubmit, onCancel}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    ssn: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    address: {
      city: "",
      state: "",
      zipCode: "",
    },
    healthInfo: {
      currentConditions: "",
      pastMedicalHistory: "",
      allergies: "",
      medications: "",
      immunizationRecords: "",
    },
    insuranceDetails: {
      provider: "",
      policyNumber: "",
      groupNumber: "",
    },
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
    preferredLanguage: "English",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;

    // Handle nested objects
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    if (!formData.ssn.trim()) newErrors.ssn = "SSN is required";

    // Contact info validation
    if (!formData.contactInfo.email.trim()) {
      newErrors["contactInfo.email"] = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        formData.contactInfo.email
      )
    ) {
      newErrors["contactInfo.email"] = "Invalid email address";
    }

    if (!formData.contactInfo.phone.trim()) {
      newErrors["contactInfo.phone"] = "Phone number is required";
    } else if (
      !/^\d{10}$/i.test(formData.contactInfo.phone.replace(/[^0-9]/g, ""))
    ) {
      newErrors["contactInfo.phone"] = "Invalid phone number";
    }

    // Address validation
    if (!formData.address.city.trim())
      newErrors["address.city"] = "City is required";
    if (!formData.address.state.trim())
      newErrors["address.state"] = "State is required";
    if (!formData.address.zipCode.trim())
      newErrors["address.zipCode"] = "Zip code is required";

    // Health info validation
    if (!formData.healthInfo.currentConditions.trim())
      newErrors["healthInfo.currentConditions"] =
        "Current conditions are required (or 'None')";
    if (!formData.healthInfo.allergies.trim())
      newErrors["healthInfo.allergies"] = "Allergies are required (or 'None')";

    // Insurance details validation
    if (!formData.insuranceDetails.provider.trim())
      newErrors["insuranceDetails.provider"] = "Insurance provider is required";
    if (!formData.insuranceDetails.policyNumber.trim())
      newErrors["insuranceDetails.policyNumber"] = "Policy number is required";
    if (!formData.insuranceDetails.groupNumber.trim())
      newErrors["insuranceDetails.groupNumber"] = "Group number is required";

    // Emergency contact validation
    if (!formData.emergencyContact.name.trim())
      newErrors["emergencyContact.name"] = "Emergency contact name is required";
    if (!formData.emergencyContact.relation.trim())
      newErrors["emergencyContact.relation"] = "Relationship is required";
    if (!formData.emergencyContact.phone.trim())
      newErrors["emergencyContact.phone"] =
        "Emergency contact phone is required";

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      // Format the data for submission
      const formattedData = {
        ...formData,
        healthInfo: {
          ...formData.healthInfo,
          currentConditions: formData.healthInfo.currentConditions
            .split(",")
            .map((c) => c.trim()),
          pastMedicalHistory: formData.healthInfo.pastMedicalHistory
            .split(",")
            .map((h) => h.trim()),
          allergies: formData.healthInfo.allergies
            .split(",")
            .map((a) => a.trim()),
          medications: formData.healthInfo.medications
            .split("\n")
            .map((med) => {
              const [name, dosage] = med.split("-").map((part) => part.trim());
              return {name, dosage};
            }),
          immunizationRecords: formData.healthInfo.immunizationRecords
            .split(",")
            .map((i) => i.trim()),
        },
        role: "patient",
      };

      // Remove confirmPassword before submitting
      const {confirmPassword, ...dataToSubmit} = formattedData;

      onSubmit(dataToSubmit);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h3 className="form-section-title">Account Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>
      </div>

      <h3 className="form-section-title">Personal Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <div className="error-message">{errors.dateOfBirth}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <div className="error-message">{errors.gender}</div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.maritalStatus && (
            <div className="error-message">{errors.maritalStatus}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ssn">Social Security Number</label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            placeholder="123-45-6789"
          />
          {errors.ssn && <div className="error-message">{errors.ssn}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="preferredLanguage">Preferred Language</label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Chinese">Chinese</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="idProofUpload">Upload ID Proof</label>
          <div className="file-upload-container">
            <input
              type="file"
              id="idProofUpload"
              name="idProofUpload"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                // In a real app, you would handle the file upload here
                console.log("ID Proof selected:", e.target.files[0]);
              }}
            />
            <div className="file-upload-info">
              Accepted formats: JPG, PNG, PDF (Aadhar Card, PAN Card, Driving
              License, etc.)
            </div>
          </div>
        </div>
      </div>

      <h3 className="form-section-title">Contact Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contactInfo.email">Email</label>
          <input
            type="email"
            id="contactInfo.email"
            name="contactInfo.email"
            value={formData.contactInfo.email}
            onChange={handleChange}
          />
          {errors["contactInfo.email"] && (
            <div className="error-message">{errors["contactInfo.email"]}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo.phone">Phone Number</label>
          <input
            type="tel"
            id="contactInfo.phone"
            name="contactInfo.phone"
            value={formData.contactInfo.phone}
            onChange={handleChange}
          />
          {errors["contactInfo.phone"] && (
            <div className="error-message">{errors["contactInfo.phone"]}</div>
          )}
        </div>
      </div>

      <h3 className="form-section-title">Address</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="address.city">City</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
          {errors["address.city"] && (
            <div className="error-message">{errors["address.city"]}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address.state">State</label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
          {errors["address.state"] && (
            <div className="error-message">{errors["address.state"]}</div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="address.zipCode">Zip Code</label>
          <input
            type="text"
            id="address.zipCode"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
          />
          {errors["address.zipCode"] && (
            <div className="error-message">{errors["address.zipCode"]}</div>
          )}
        </div>
      </div>

      <h3 className="form-section-title">Health Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="healthInfo.currentConditions">
            Current Conditions (comma separated)
          </label>
          <input
            type="text"
            id="healthInfo.currentConditions"
            name="healthInfo.currentConditions"
            value={formData.healthInfo.currentConditions}
            onChange={handleChange}
            placeholder="Hypertension, Diabetes, etc. (or None)"
          />
          {errors["healthInfo.currentConditions"] && (
            <div className="error-message">
              {errors["healthInfo.currentConditions"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="healthInfo.allergies">
            Allergies (comma separated)
          </label>
          <input
            type="text"
            id="healthInfo.allergies"
            name="healthInfo.allergies"
            value={formData.healthInfo.allergies}
            onChange={handleChange}
            placeholder="Penicillin, Peanuts, etc. (or None)"
          />
          {errors["healthInfo.allergies"] && (
            <div className="error-message">
              {errors["healthInfo.allergies"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="medicalReportUpload">
          Upload Medical Reports (PDF)
        </label>
        <div className="file-upload-container">
          <input
            type="file"
            id="medicalReportUpload"
            name="medicalReportUpload"
            accept=".pdf"
            onChange={(e) => {
              // In a real app, you would handle the file upload here
              console.log("File selected:", e.target.files[0]);
            }}
            multiple
          />
          <div className="file-upload-info">
            Accepted formats: PDF. Maximum size: 10MB per file.
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="healthInfo.pastMedicalHistory">
            Past Medical History (comma separated)
          </label>
          <input
            type="text"
            id="healthInfo.pastMedicalHistory"
            name="healthInfo.pastMedicalHistory"
            value={formData.healthInfo.pastMedicalHistory}
            onChange={handleChange}
            placeholder="Appendectomy (2010), etc. (or None)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="healthInfo.immunizationRecords">
            Immunization Records (comma separated)
          </label>
          <input
            type="text"
            id="healthInfo.immunizationRecords"
            name="healthInfo.immunizationRecords"
            value={formData.healthInfo.immunizationRecords}
            onChange={handleChange}
            placeholder="Flu Shot (2023), COVID-19 Vaccine (2022), etc."
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="healthInfo.medications">
          Medications (one per line, format: Name - Dosage)
        </label>
        <textarea
          id="healthInfo.medications"
          name="healthInfo.medications"
          value={formData.healthInfo.medications}
          onChange={handleChange}
          placeholder="Lisinopril - 10mg daily\nMetformin - 500mg twice daily"
          rows="3"
        />
      </div>

      <h3 className="form-section-title">Insurance Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="insuranceDetails.provider">Insurance Provider</label>
          <input
            type="text"
            id="insuranceDetails.provider"
            name="insuranceDetails.provider"
            value={formData.insuranceDetails.provider}
            onChange={handleChange}
          />
          {errors["insuranceDetails.provider"] && (
            <div className="error-message">
              {errors["insuranceDetails.provider"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="insuranceDetails.policyNumber">Policy Number</label>
          <input
            type="text"
            id="insuranceDetails.policyNumber"
            name="insuranceDetails.policyNumber"
            value={formData.insuranceDetails.policyNumber}
            onChange={handleChange}
          />
          {errors["insuranceDetails.policyNumber"] && (
            <div className="error-message">
              {errors["insuranceDetails.policyNumber"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="insuranceDetails.groupNumber">Group Number</label>
          <input
            type="text"
            id="insuranceDetails.groupNumber"
            name="insuranceDetails.groupNumber"
            value={formData.insuranceDetails.groupNumber}
            onChange={handleChange}
          />
          {errors["insuranceDetails.groupNumber"] && (
            <div className="error-message">
              {errors["insuranceDetails.groupNumber"]}
            </div>
          )}
        </div>
      </div>

      <h3 className="form-section-title">Emergency Contact</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="emergencyContact.name">Name</label>
          <input
            type="text"
            id="emergencyContact.name"
            name="emergencyContact.name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
          />
          {errors["emergencyContact.name"] && (
            <div className="error-message">
              {errors["emergencyContact.name"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact.relation">Relationship</label>
          <input
            type="text"
            id="emergencyContact.relation"
            name="emergencyContact.relation"
            value={formData.emergencyContact.relation}
            onChange={handleChange}
          />
          {errors["emergencyContact.relation"] && (
            <div className="error-message">
              {errors["emergencyContact.relation"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="emergencyContact.phone">Phone Number</label>
          <input
            type="tel"
            id="emergencyContact.phone"
            name="emergencyContact.phone"
            value={formData.emergencyContact.phone}
            onChange={handleChange}
          />
          {errors["emergencyContact.phone"] && (
            <div className="error-message">
              {errors["emergencyContact.phone"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <FiX /> Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <FiSave /> Save Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
