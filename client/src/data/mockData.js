// Mock data for client-side implementation
// Based on server/utils/credentials.js

const mockData = {
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    id: 'ADM001'
  },
  doctors: [
    {
      id: 'DOC001',
      username: 'doctor1',
      password: 'doc123',
      role: 'doctor',
      fullName: 'Dr. John Smith',
      dateOfBirth: '1975-05-15',
      gender: 'Male',
      contactInfo: {
        phone: '555-123-4567',
        email: 'john.smith@hospital.com'
      },
      address: {
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      professionalDetails: {
        licenseNumber: 'MED12345',
        specialization: 'Cardiology',
        yearsOfExperience: 15,
        qualifications: ['MD', 'PhD', 'Board Certified'],
        registrationStatus: 'Active'
      },
      employmentDetails: {
        currentHospital: 'City General Hospital',
        workSchedule: 'Mon-Fri, 9AM-5PM',
        employmentType: 'Full-time'
      },
      emergencyContact: {
        name: 'Jane Smith',
        relation: 'Spouse',
        phone: '555-987-6543'
      }
    },
    {
      id: 'DOC002',
      username: 'doctor2',
      password: 'doc456',
      role: 'doctor',
      fullName: 'Dr. Sarah Johnson',
      dateOfBirth: '1980-08-20',
      gender: 'Female',
      contactInfo: {
        phone: '555-234-5678',
        email: 'sarah.johnson@hospital.com'
      },
      address: {
        city: 'Boston',
        state: 'MA',
        zipCode: '02108'
      },
      professionalDetails: {
        licenseNumber: 'MED67890',
        specialization: 'Neurology',
        yearsOfExperience: 10,
        qualifications: ['MD', 'Board Certified'],
        registrationStatus: 'Active'
      },
      employmentDetails: {
        currentHospital: 'City General Hospital',
        workSchedule: 'Tue-Sat, 8AM-4PM',
        employmentType: 'Full-time'
      },
      emergencyContact: {
        name: 'Michael Johnson',
        relation: 'Spouse',
        phone: '555-876-5432'
      }
    }
  ],
  patients: [
    {
      id: 'PAT001',
      username: 'patient1',
      password: 'pat123',
      role: 'patient',
      fullName: 'Robert Williams',
      dateOfBirth: '1985-03-10',
      gender: 'Male',
      maritalStatus: 'Married',
      ssn: '123-45-6789',
      contactInfo: {
        phone: '555-345-6789',
        email: 'robert.williams@email.com'
      },
      address: {
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601'
      },
      healthInfo: {
        currentConditions: ['Hypertension', 'Type 2 Diabetes'],
        pastMedicalHistory: ['Appendectomy (2010)'],
        allergies: ['Penicillin'],
        medications: [
          { name: 'Lisinopril', dosage: '10mg daily' },
          { name: 'Metformin', dosage: '500mg twice daily' }
        ],
        immunizationRecords: ['Flu Shot (2023)', 'COVID-19 Vaccine (2022)']
      },
      insuranceDetails: {
        provider: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS12345',
        groupNumber: 'GRP987'
      },
      emergencyContact: {
        name: 'Mary Williams',
        relation: 'Spouse',
        phone: '555-456-7890'
      },
      primaryCarePhysician: 'DOC001',
      preferredLanguage: 'English',
      assignedDoctor: 'DOC001',
      assignedCaretaker: 'CAR001'
    },
    {
      id: 'PAT002',
      username: 'patient2',
      password: 'pat456',
      role: 'patient',
      fullName: 'Emily Davis',
      dateOfBirth: '1990-11-25',
      gender: 'Female',
      maritalStatus: 'Single',
      ssn: '987-65-4321',
      contactInfo: {
        phone: '555-456-7890',
        email: 'emily.davis@email.com'
      },
      address: {
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001'
      },
      healthInfo: {
        currentConditions: ['Asthma', 'Anxiety'],
        pastMedicalHistory: ['Tonsillectomy (2005)'],
        allergies: ['Pollen', 'Shellfish'],
        medications: [
          { name: 'Albuterol', dosage: 'As needed' },
          { name: 'Sertraline', dosage: '50mg daily' }
        ],
        immunizationRecords: ['Flu Shot (2023)', 'COVID-19 Vaccine (2022)']
      },
      insuranceDetails: {
        provider: 'Aetna',
        policyNumber: 'AET54321',
        groupNumber: 'GRP654'
      },
      emergencyContact: {
        name: 'James Davis',
        relation: 'Brother',
        phone: '555-567-8901'
      },
      primaryCarePhysician: 'DOC002',
      preferredLanguage: 'English',
      assignedDoctor: 'DOC002',
      assignedCaretaker: 'CAR002'
    }
  ],
  caretakers: [
    {
      id: 'CAR001',
      username: 'caretaker1',
      password: 'care123',
      role: 'caretaker',
      fullName: 'Michael Brown',
      dateOfBirth: '1988-07-12',
      gender: 'Male',
      contactInfo: {
        phone: '555-567-8901',
        email: 'michael.brown@email.com'
      },
      address: {
        city: 'Philadelphia',
        state: 'PA',
        zipCode: '19019'
      },
      employmentDetails: {
        relationship: 'Professional Caregiver',
        availabilitySchedule: 'Mon-Fri, 8AM-4PM'
      },
      skillsAndExperience: {
        certifications: ['First Aid', 'CPR', 'Nursing Assistant'],
        yearsOfExperience: 5
      },
      emergencyContact: {
        name: 'Susan Brown',
        relation: 'Spouse',
        phone: '555-678-9012'
      },
      notes: 'Specializes in elderly care and chronic disease management',
      assignedPatients: ['PAT001']
    },
    {
      id: 'CAR002',
      username: 'caretaker2',
      password: 'care456',
      role: 'caretaker',
      fullName: 'Jennifer Wilson',
      dateOfBirth: '1992-04-30',
      gender: 'Female',
      contactInfo: {
        phone: '555-678-9012',
        email: 'jennifer.wilson@email.com'
      },
      address: {
        city: 'Denver',
        state: 'CO',
        zipCode: '80201'
      },
      employmentDetails: {
        relationship: 'Professional Caregiver',
        availabilitySchedule: 'Wed-Sun, 10AM-6PM'
      },
      skillsAndExperience: {
        certifications: ['First Aid', 'CPR', 'Home Health Aide'],
        yearsOfExperience: 3
      },
      emergencyContact: {
        name: 'David Wilson',
        relation: 'Brother',
        phone: '555-789-0123'
      },
      notes: 'Specializes in rehabilitation and physical therapy assistance',
      assignedPatients: ['PAT002']
    }
  ],
  // Assignments between doctors, patients, and caretakers
  assignments: [
    {
      id: 'ASG001',
      doctorId: 'DOC001',
      patientId: 'PAT001',
      caretakerId: 'CAR001',
      assignmentDate: '2023-01-15',
      notes: 'Regular checkups required for hypertension monitoring'
    },
    {
      id: 'ASG002',
      doctorId: 'DOC002',
      patientId: 'PAT002',
      caretakerId: 'CAR002',
      assignmentDate: '2023-02-20',
      notes: 'Weekly therapy sessions recommended'
    }
  ],
  // Medical reports for patients
  medicalReports: [
    {
      id: 'REP001',
      patientId: 'PAT001',
      doctorId: 'DOC001',
      date: '2023-03-15',
      diagnosis: 'Hypertension, well-controlled',
      treatment: 'Continue current medications',
      notes: 'Blood pressure readings have improved. Continue monitoring at home.'
    },
    {
      id: 'REP002',
      patientId: 'PAT002',
      doctorId: 'DOC002',
      date: '2023-04-10',
      diagnosis: 'Mild asthma exacerbation',
      treatment: 'Increased albuterol usage as needed',
      notes: 'Likely triggered by seasonal allergies. Follow up in 2 weeks.'
    }
  ]
};

export default mockData;
