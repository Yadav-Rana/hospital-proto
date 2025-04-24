import React, {useState, useEffect} from "react";
import {FiSave, FiX} from "react-icons/fi";

const AssignmentForm = ({onSubmit, onCancel}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    caretakerId: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientId) newErrors.patientId = "Patient is required";
    if (!formData.doctorId) newErrors.doctorId = "Doctor is required";
    if (!formData.caretakerId) newErrors.caretakerId = "Caretaker is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
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
        endDate: formData.endDate || null, // Convert empty string to null
      };

      onSubmit(formattedData);
    } else {
      setErrors(validationErrors);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // In a real app, these would be API calls
        // For now, we'll use mock data based on credentials.js

        // Fetch patients
        const patientsResponse = await fetch(
          "http://localhost:5000/api/users/patients"
        );
        const patientsData = await patientsResponse.json();
        setPatients(patientsData);

        // Fetch doctors
        const doctorsResponse = await fetch(
          "http://localhost:5000/api/users/doctors"
        );
        const doctorsData = await doctorsResponse.json();
        setDoctors(doctorsData);

        // Fetch caretakers
        const caretakersResponse = await fetch(
          "http://localhost:5000/api/users/caretakers"
        );
        const caretakersData = await caretakersResponse.json();
        setCaretakers(caretakersData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Fallback to mock data if API calls fail
        setPatients([
          {id: "PAT001", fullName: "Robert Williams"},
          {id: "PAT002", fullName: "Emily Davis"},
        ]);
        setDoctors([
          {id: "DOC001", fullName: "Dr. John Smith"},
          {id: "DOC002", fullName: "Dr. Sarah Johnson"},
        ]);
        setCaretakers([
          {id: "CAR001", fullName: "Michael Brown"},
          {id: "CAR002", fullName: "Jennifer Wilson"},
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="assignment-form">
      <h3 className="form-section-title">Assignment Details</h3>

      {loading ? (
        <div className="loading-message">Loading user data...</div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="patientId">Patient</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <div className="error-message">{errors.patientId}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="doctorId">Doctor</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <div className="error-message">{errors.doctorId}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="caretakerId">Caretaker</label>
            <select
              id="caretakerId"
              name="caretakerId"
              value={formData.caretakerId}
              onChange={handleChange}
            >
              <option value="">Select Caretaker</option>
              {caretakers.map((caretaker) => (
                <option key={caretaker.id} value={caretaker.id}>
                  {caretaker.fullName}
                </option>
              ))}
            </select>
            {errors.caretakerId && (
              <div className="error-message">{errors.caretakerId}</div>
            )}
          </div>
        </>
      )}

      <h3 className="form-section-title">Schedule</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <div className="error-message">{errors.startDate}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date (Optional)</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
          {errors.endDate && (
            <div className="error-message">{errors.endDate}</div>
          )}
        </div>
      </div>

      <h3 className="form-section-title">Additional Information</h3>
      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any special instructions or notes (e.g., Regular check-ups every 3 months)"
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <FiX /> Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <FiSave /> Create Assignment
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
