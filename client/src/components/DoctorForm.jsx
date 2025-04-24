import React, {useState} from "react";
import {FiSave, FiX} from "react-icons/fi";

const DoctorForm = ({onSubmit, onCancel}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    address: {
      city: "",
      state: "",
      zipCode: "",
    },
    professionalDetails: {
      licenseNumber: "",
      specialization: "",
      yearsOfExperience: "",
      qualifications: "",
      registrationStatus: "Active",
    },
    employmentDetails: {
      currentHospital: "",
      workSchedule: "",
      employmentType: "",
    },
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
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

    // Professional details validation
    if (!formData.professionalDetails.licenseNumber.trim())
      newErrors["professionalDetails.licenseNumber"] =
        "License number is required";
    if (!formData.professionalDetails.specialization.trim())
      newErrors["professionalDetails.specialization"] =
        "Specialization is required";
    if (!formData.professionalDetails.yearsOfExperience)
      newErrors["professionalDetails.yearsOfExperience"] =
        "Years of experience is required";
    if (!formData.professionalDetails.qualifications.trim())
      newErrors["professionalDetails.qualifications"] =
        "Qualifications are required";

    // Employment details validation
    if (!formData.employmentDetails.currentHospital.trim())
      newErrors["employmentDetails.currentHospital"] =
        "Current hospital is required";
    if (!formData.employmentDetails.workSchedule.trim())
      newErrors["employmentDetails.workSchedule"] = "Work schedule is required";
    if (!formData.employmentDetails.employmentType.trim())
      newErrors["employmentDetails.employmentType"] =
        "Employment type is required";

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
      // Convert qualifications string to array
      const formattedData = {
        ...formData,
        professionalDetails: {
          ...formData.professionalDetails,
          qualifications: formData.professionalDetails.qualifications
            .split(",")
            .map((q) => q.trim()),
          yearsOfExperience: parseInt(
            formData.professionalDetails.yearsOfExperience
          ),
        },
        role: "doctor",
      };

      // Remove confirmPassword before submitting
      const {confirmPassword, ...dataToSubmit} = formattedData;

      onSubmit(dataToSubmit);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="doctor-form">
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

      <h3 className="form-section-title">Professional Details</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="professionalDetails.licenseNumber">
            License Number
          </label>
          <input
            type="text"
            id="professionalDetails.licenseNumber"
            name="professionalDetails.licenseNumber"
            value={formData.professionalDetails.licenseNumber}
            onChange={handleChange}
          />
          {errors["professionalDetails.licenseNumber"] && (
            <div className="error-message">
              {errors["professionalDetails.licenseNumber"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="professionalDetails.specialization">
            Specialization
          </label>
          <input
            type="text"
            id="professionalDetails.specialization"
            name="professionalDetails.specialization"
            value={formData.professionalDetails.specialization}
            onChange={handleChange}
          />
          {errors["professionalDetails.specialization"] && (
            <div className="error-message">
              {errors["professionalDetails.specialization"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="professionalDetails.yearsOfExperience">
            Years of Experience
          </label>
          <input
            type="number"
            id="professionalDetails.yearsOfExperience"
            name="professionalDetails.yearsOfExperience"
            value={formData.professionalDetails.yearsOfExperience}
            onChange={handleChange}
            min="0"
          />
          {errors["professionalDetails.yearsOfExperience"] && (
            <div className="error-message">
              {errors["professionalDetails.yearsOfExperience"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="professionalDetails.qualifications">
            Qualifications (comma separated)
          </label>
          <input
            type="text"
            id="professionalDetails.qualifications"
            name="professionalDetails.qualifications"
            value={formData.professionalDetails.qualifications}
            onChange={handleChange}
            placeholder="MD, PhD, Board Certified"
          />
          {errors["professionalDetails.qualifications"] && (
            <div className="error-message">
              {errors["professionalDetails.qualifications"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="professionalDetails.registrationStatus">
            Registration Status
          </label>
          <select
            id="professionalDetails.registrationStatus"
            name="professionalDetails.registrationStatus"
            value={formData.professionalDetails.registrationStatus}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <h3 className="form-section-title">Employment Details</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="employmentDetails.currentHospital">
            Current Hospital
          </label>
          <input
            type="text"
            id="employmentDetails.currentHospital"
            name="employmentDetails.currentHospital"
            value={formData.employmentDetails.currentHospital}
            onChange={handleChange}
          />
          {errors["employmentDetails.currentHospital"] && (
            <div className="error-message">
              {errors["employmentDetails.currentHospital"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employmentDetails.workSchedule">Work Schedule</label>
          <input
            type="text"
            id="employmentDetails.workSchedule"
            name="employmentDetails.workSchedule"
            value={formData.employmentDetails.workSchedule}
            onChange={handleChange}
            placeholder="Mon-Fri, 9AM-5PM"
          />
          {errors["employmentDetails.workSchedule"] && (
            <div className="error-message">
              {errors["employmentDetails.workSchedule"]}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="employmentDetails.employmentType">
            Employment Type
          </label>
          <select
            id="employmentDetails.employmentType"
            name="employmentDetails.employmentType"
            value={formData.employmentDetails.employmentType}
            onChange={handleChange}
          >
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Consultant">Consultant</option>
          </select>
          {errors["employmentDetails.employmentType"] && (
            <div className="error-message">
              {errors["employmentDetails.employmentType"]}
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
          <FiSave /> Save Doctor
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
