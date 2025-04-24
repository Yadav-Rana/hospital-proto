/**
 * Mock Data Service
 * Provides client-side implementations of all API endpoints
 */

import mockData from "../data/mockData";
import storageService from "./storageService";

// Initialize storage with mock data
const initializeData = () => {
  // Clear existing data to ensure we always have the latest mockData
  localStorage.removeItem(storageService.STORAGE_KEYS.DOCTORS);
  localStorage.removeItem(storageService.STORAGE_KEYS.PATIENTS);
  localStorage.removeItem(storageService.STORAGE_KEYS.CARETAKERS);
  localStorage.removeItem(storageService.STORAGE_KEYS.ASSIGNMENTS);
  localStorage.removeItem(storageService.STORAGE_KEYS.MEDICAL_REPORTS);

  // Initialize with fresh data
  storageService.initializeStorage(mockData);
};

// Authentication Services
const authService = {
  /**
   * Login a user
   * @param {string} username - The username
   * @param {string} password - The password
   * @param {string} role - The user role
   * @returns {Promise<Object>} - The user object
   */
  login: (username, password, role) => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        let user = null;

        // Check admin credentials
        if (role === "admin") {
          if (
            username === mockData.admin.username &&
            password === mockData.admin.password
          ) {
            user = {
              id: mockData.admin.id,
              username: mockData.admin.username,
              role: mockData.admin.role,
            };
          }
        }

        // Check doctor credentials
        else if (role === "doctor") {
          // First check if the user exists in mockData (which has complete data)
          const mockDoctor = mockData.doctors.find(
            (doc) => doc.username === username && doc.password === password
          );

          if (mockDoctor) {
            // Include all doctor data except password
            const {password, ...doctorData} = mockDoctor;
            user = doctorData;
          } else {
            // Fallback to storage if not found in mockData
            const doctors = storageService.getAll(
              storageService.STORAGE_KEYS.DOCTORS
            );
            const doctor = doctors.find(
              (doc) => doc.username === username && doc.password === password
            );

            if (doctor) {
              // Include all doctor data except password
              const {password, ...doctorData} = doctor;
              user = doctorData;
            }
          }
        }

        // Check patient credentials
        else if (role === "patient") {
          // First check if the user exists in mockData (which has complete data)
          const mockPatient = mockData.patients.find(
            (pat) => pat.username === username && pat.password === password
          );

          if (mockPatient) {
            // Include all patient data except password
            const {password, ...patientData} = mockPatient;
            user = patientData;
          } else {
            // Fallback to storage if not found in mockData
            const patients = storageService.getAll(
              storageService.STORAGE_KEYS.PATIENTS
            );
            const patient = patients.find(
              (pat) => pat.username === username && pat.password === password
            );

            if (patient) {
              // Include all patient data except password
              const {password, ...patientData} = patient;
              user = patientData;
            }
          }
        }

        // Check caretaker credentials
        else if (role === "caretaker") {
          // First check if the user exists in mockData (which has complete data)
          const mockCaretaker = mockData.caretakers.find(
            (care) => care.username === username && care.password === password
          );

          if (mockCaretaker) {
            // Include all caretaker data except password
            const {password, ...caretakerData} = mockCaretaker;
            user = caretakerData;
          } else {
            // Fallback to storage if not found in mockData
            const caretakers = storageService.getAll(
              storageService.STORAGE_KEYS.CARETAKERS
            );
            const caretaker = caretakers.find(
              (care) => care.username === username && care.password === password
            );

            if (caretaker) {
              // Include all caretaker data except password
              const {password, ...caretakerData} = caretaker;
              user = caretakerData;
            }
          }
        }

        if (user) {
          resolve({success: true, user});
        } else {
          reject({success: false, message: "Invalid credentials"});
        }
      }, 500); // 500ms delay to simulate network
    });
  },

  /**
   * Logout a user
   * @returns {Promise<Object>} - Success message
   */
  logout: () => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve({success: true, message: "Logged out successfully"});
      }, 300);
    });
  },
};

// User Services
const userService = {
  /**
   * Get all doctors
   * @returns {Promise<Array>} - Array of doctors
   */
  getDoctors: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctors = storageService.getAll(
          storageService.STORAGE_KEYS.DOCTORS
        );
        // Remove sensitive information like passwords
        const sanitizedDoctors = doctors.map(({password, ...doctor}) => doctor);
        resolve(sanitizedDoctors);
      }, 300);
    });
  },

  /**
   * Get all patients
   * @returns {Promise<Array>} - Array of patients
   */
  getPatients: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patients = storageService.getAll(
          storageService.STORAGE_KEYS.PATIENTS
        );
        // Remove sensitive information like passwords
        const sanitizedPatients = patients.map(
          ({password, ...patient}) => patient
        );
        resolve(sanitizedPatients);
      }, 300);
    });
  },

  /**
   * Get all caretakers
   * @returns {Promise<Array>} - Array of caretakers
   */
  getCaretakers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const caretakers = storageService.getAll(
          storageService.STORAGE_KEYS.CARETAKERS
        );
        // Remove sensitive information like passwords
        const sanitizedCaretakers = caretakers.map(
          ({password, ...caretaker}) => caretaker
        );
        resolve(sanitizedCaretakers);
      }, 300);
    });
  },

  /**
   * Get a doctor by ID
   * @param {string} id - The doctor ID
   * @returns {Promise<Object>} - The doctor object
   */
  getDoctorById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const doctor = storageService.getById(
          storageService.STORAGE_KEYS.DOCTORS,
          id
        );

        if (doctor) {
          // Remove sensitive information
          const {password, ...sanitizedDoctor} = doctor;
          resolve(sanitizedDoctor);
        } else {
          reject({message: "Doctor not found"});
        }
      }, 300);
    });
  },

  /**
   * Get a patient by ID
   * @param {string} id - The patient ID
   * @returns {Promise<Object>} - The patient object
   */
  getPatientById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const patient = storageService.getById(
          storageService.STORAGE_KEYS.PATIENTS,
          id
        );

        if (patient) {
          // Remove sensitive information
          const {password, ...sanitizedPatient} = patient;
          resolve(sanitizedPatient);
        } else {
          reject({message: "Patient not found"});
        }
      }, 300);
    });
  },

  /**
   * Get a caretaker by ID
   * @param {string} id - The caretaker ID
   * @returns {Promise<Object>} - The caretaker object
   */
  getCaretakerById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const caretaker = storageService.getById(
          storageService.STORAGE_KEYS.CARETAKERS,
          id
        );

        if (caretaker) {
          // Remove sensitive information
          const {password, ...sanitizedCaretaker} = caretaker;
          resolve(sanitizedCaretaker);
        } else {
          reject({message: "Caretaker not found"});
        }
      }, 300);
    });
  },

  /**
   * Add a new doctor
   * @param {Object} doctor - The doctor object
   * @returns {Promise<Object>} - The added doctor
   */
  addDoctor: (doctor) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID
        const newId = `DOC${String(Date.now()).slice(-3)}`;
        const newDoctor = {...doctor, id: newId, role: "doctor"};

        // Add to storage
        storageService.add(storageService.STORAGE_KEYS.DOCTORS, newDoctor);

        // Return without password
        const {password, ...sanitizedDoctor} = newDoctor;
        resolve(sanitizedDoctor);
      }, 300);
    });
  },

  /**
   * Add a new patient
   * @param {Object} patient - The patient object
   * @returns {Promise<Object>} - The added patient
   */
  addPatient: (patient) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID
        const newId = `PAT${String(Date.now()).slice(-3)}`;
        const newPatient = {...patient, id: newId, role: "patient"};

        // Add to storage
        storageService.add(storageService.STORAGE_KEYS.PATIENTS, newPatient);

        // Return without password
        const {password, ...sanitizedPatient} = newPatient;
        resolve(sanitizedPatient);
      }, 300);
    });
  },

  /**
   * Add a new caretaker
   * @param {Object} caretaker - The caretaker object
   * @returns {Promise<Object>} - The added caretaker
   */
  addCaretaker: (caretaker) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID
        const newId = `CAR${String(Date.now()).slice(-3)}`;
        const newCaretaker = {...caretaker, id: newId, role: "caretaker"};

        // Add to storage
        storageService.add(
          storageService.STORAGE_KEYS.CARETAKERS,
          newCaretaker
        );

        // Return without password
        const {password, ...sanitizedCaretaker} = newCaretaker;
        resolve(sanitizedCaretaker);
      }, 300);
    });
  },

  /**
   * Update a doctor
   * @param {string} id - The doctor ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated doctor
   */
  updateDoctor: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedDoctor = storageService.update(
          storageService.STORAGE_KEYS.DOCTORS,
          id,
          updates
        );

        if (updatedDoctor) {
          // Return without password
          const {password, ...sanitizedDoctor} = updatedDoctor;
          resolve(sanitizedDoctor);
        } else {
          reject({message: "Doctor not found"});
        }
      }, 300);
    });
  },

  /**
   * Update a patient
   * @param {string} id - The patient ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated patient
   */
  updatePatient: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedPatient = storageService.update(
          storageService.STORAGE_KEYS.PATIENTS,
          id,
          updates
        );

        if (updatedPatient) {
          // Return without password
          const {password, ...sanitizedPatient} = updatedPatient;
          resolve(sanitizedPatient);
        } else {
          reject({message: "Patient not found"});
        }
      }, 300);
    });
  },

  /**
   * Update a caretaker
   * @param {string} id - The caretaker ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated caretaker
   */
  updateCaretaker: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedCaretaker = storageService.update(
          storageService.STORAGE_KEYS.CARETAKERS,
          id,
          updates
        );

        if (updatedCaretaker) {
          // Return without password
          const {password, ...sanitizedCaretaker} = updatedCaretaker;
          resolve(sanitizedCaretaker);
        } else {
          reject({message: "Caretaker not found"});
        }
      }, 300);
    });
  },

  /**
   * Delete a doctor
   * @param {string} id - The doctor ID
   * @returns {Promise<boolean>} - Success status
   */
  deleteDoctor: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = storageService.remove(
          storageService.STORAGE_KEYS.DOCTORS,
          id
        );

        if (success) {
          resolve({success: true});
        } else {
          reject({message: "Doctor not found"});
        }
      }, 300);
    });
  },

  /**
   * Delete a patient
   * @param {string} id - The patient ID
   * @returns {Promise<boolean>} - Success status
   */
  deletePatient: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = storageService.remove(
          storageService.STORAGE_KEYS.PATIENTS,
          id
        );

        if (success) {
          resolve({success: true});
        } else {
          reject({message: "Patient not found"});
        }
      }, 300);
    });
  },

  /**
   * Delete a caretaker
   * @param {string} id - The caretaker ID
   * @returns {Promise<boolean>} - Success status
   */
  deleteCaretaker: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = storageService.remove(
          storageService.STORAGE_KEYS.CARETAKERS,
          id
        );

        if (success) {
          resolve({success: true});
        } else {
          reject({message: "Caretaker not found"});
        }
      }, 300);
    });
  },
};

// Assignment Services
const assignmentService = {
  /**
   * Get all assignments
   * @returns {Promise<Array>} - Array of assignments
   */
  getAssignments: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = storageService.getAll(
          storageService.STORAGE_KEYS.ASSIGNMENTS
        );
        resolve(assignments);
      }, 300);
    });
  },

  /**
   * Get assignments by doctor ID
   * @param {string} doctorId - The doctor ID
   * @returns {Promise<Array>} - Array of assignments
   */
  getAssignmentsByDoctor: (doctorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = storageService.filter(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          (assignment) => assignment.doctorId === doctorId
        );
        resolve(assignments);
      }, 300);
    });
  },

  /**
   * Get assignments by patient ID
   * @param {string} patientId - The patient ID
   * @returns {Promise<Array>} - Array of assignments
   */
  getAssignmentsByPatient: (patientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = storageService.filter(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          (assignment) => assignment.patientId === patientId
        );
        resolve(assignments);
      }, 300);
    });
  },

  /**
   * Get assignments by caretaker ID
   * @param {string} caretakerId - The caretaker ID
   * @returns {Promise<Array>} - Array of assignments
   */
  getAssignmentsByCaretaker: (caretakerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = storageService.filter(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          (assignment) => assignment.caretakerId === caretakerId
        );
        resolve(assignments);
      }, 300);
    });
  },

  /**
   * Create a new assignment
   * @param {Object} assignment - The assignment object
   * @returns {Promise<Object>} - The created assignment
   */
  createAssignment: (assignment) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID
        const newId = `ASG${String(Date.now()).slice(-3)}`;
        const newAssignment = {...assignment, id: newId};

        // Add to storage
        storageService.add(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          newAssignment
        );

        // Update patient's assigned doctor and caretaker
        if (assignment.patientId) {
          const patient = storageService.getById(
            storageService.STORAGE_KEYS.PATIENTS,
            assignment.patientId
          );

          if (patient) {
            const updatedPatient = {
              ...patient,
              assignedDoctor: assignment.doctorId,
              assignedCaretaker: assignment.caretakerId,
            };

            storageService.update(
              storageService.STORAGE_KEYS.PATIENTS,
              patient.id,
              updatedPatient
            );
          }
        }

        // Update caretaker's assigned patients
        if (assignment.caretakerId) {
          const caretaker = storageService.getById(
            storageService.STORAGE_KEYS.CARETAKERS,
            assignment.caretakerId
          );

          if (caretaker) {
            const assignedPatients = caretaker.assignedPatients || [];

            if (!assignedPatients.includes(assignment.patientId)) {
              const updatedCaretaker = {
                ...caretaker,
                assignedPatients: [...assignedPatients, assignment.patientId],
              };

              storageService.update(
                storageService.STORAGE_KEYS.CARETAKERS,
                caretaker.id,
                updatedCaretaker
              );
            }
          }
        }

        resolve(newAssignment);
      }, 300);
    });
  },

  /**
   * Update an assignment
   * @param {string} id - The assignment ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated assignment
   */
  updateAssignment: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedAssignment = storageService.update(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          id,
          updates
        );

        if (updatedAssignment) {
          resolve(updatedAssignment);
        } else {
          reject({message: "Assignment not found"});
        }
      }, 300);
    });
  },

  /**
   * Delete an assignment
   * @param {string} id - The assignment ID
   * @returns {Promise<boolean>} - Success status
   */
  deleteAssignment: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const assignment = storageService.getById(
          storageService.STORAGE_KEYS.ASSIGNMENTS,
          id
        );

        if (assignment) {
          // Remove the assignment
          storageService.remove(storageService.STORAGE_KEYS.ASSIGNMENTS, id);

          // Update patient's assigned doctor and caretaker
          if (assignment.patientId) {
            const patient = storageService.getById(
              storageService.STORAGE_KEYS.PATIENTS,
              assignment.patientId
            );

            if (patient) {
              const updatedPatient = {...patient};

              if (patient.assignedDoctor === assignment.doctorId) {
                updatedPatient.assignedDoctor = null;
              }

              if (patient.assignedCaretaker === assignment.caretakerId) {
                updatedPatient.assignedCaretaker = null;
              }

              storageService.update(
                storageService.STORAGE_KEYS.PATIENTS,
                patient.id,
                updatedPatient
              );
            }
          }

          // Update caretaker's assigned patients
          if (assignment.caretakerId) {
            const caretaker = storageService.getById(
              storageService.STORAGE_KEYS.CARETAKERS,
              assignment.caretakerId
            );

            if (caretaker && caretaker.assignedPatients) {
              const updatedCaretaker = {
                ...caretaker,
                assignedPatients: caretaker.assignedPatients.filter(
                  (patientId) => patientId !== assignment.patientId
                ),
              };

              storageService.update(
                storageService.STORAGE_KEYS.CARETAKERS,
                caretaker.id,
                updatedCaretaker
              );
            }
          }

          resolve({success: true});
        } else {
          reject({message: "Assignment not found"});
        }
      }, 300);
    });
  },
};

// Medical Report Services
const medicalReportService = {
  /**
   * Get all medical reports
   * @returns {Promise<Array>} - Array of medical reports
   */
  getMedicalReports: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports = storageService.getAll(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS
        );
        resolve(reports);
      }, 300);
    });
  },

  /**
   * Get medical reports by patient ID
   * @param {string} patientId - The patient ID
   * @returns {Promise<Array>} - Array of medical reports
   */
  getMedicalReportsByPatient: (patientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports = storageService.filter(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS,
          (report) => report.patientId === patientId
        );
        resolve(reports);
      }, 300);
    });
  },

  /**
   * Get medical reports by doctor ID
   * @param {string} doctorId - The doctor ID
   * @returns {Promise<Array>} - Array of medical reports
   */
  getMedicalReportsByDoctor: (doctorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports = storageService.filter(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS,
          (report) => report.doctorId === doctorId
        );
        resolve(reports);
      }, 300);
    });
  },

  /**
   * Create a new medical report
   * @param {Object} report - The medical report object
   * @returns {Promise<Object>} - The created medical report
   */
  createMedicalReport: (report) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID
        const newId = `REP${String(Date.now()).slice(-3)}`;
        const newReport = {...report, id: newId};

        // Add to storage
        storageService.add(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS,
          newReport
        );

        resolve(newReport);
      }, 300);
    });
  },

  /**
   * Update a medical report
   * @param {string} id - The medical report ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated medical report
   */
  updateMedicalReport: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedReport = storageService.update(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS,
          id,
          updates
        );

        if (updatedReport) {
          resolve(updatedReport);
        } else {
          reject({message: "Medical report not found"});
        }
      }, 300);
    });
  },

  /**
   * Delete a medical report
   * @param {string} id - The medical report ID
   * @returns {Promise<boolean>} - Success status
   */
  deleteMedicalReport: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = storageService.remove(
          storageService.STORAGE_KEYS.MEDICAL_REPORTS,
          id
        );

        if (success) {
          resolve({success: true});
        } else {
          reject({message: "Medical report not found"});
        }
      }, 300);
    });
  },
};

// Export the services
const mockDataService = {
  initializeData,
  auth: authService,
  users: userService,
  assignments: assignmentService,
  medicalReports: medicalReportService,
};

export default mockDataService;
