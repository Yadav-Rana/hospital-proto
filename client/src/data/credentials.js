/**
 * Credentials File
 * 
 * This file contains all the hardcoded credentials for the Hospital Management System.
 * These credentials are used for demonstration purposes only.
 * In a real-world application, these would be stored securely in a database.
 */

const credentials = {
  // Admin credentials
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    id: 'ADM001'
  },
  
  // Doctor credentials
  doctors: [
    {
      id: 'DOC001',
      username: 'doctor1',
      password: 'doc123',
      role: 'doctor',
      fullName: 'Dr. John Smith',
      specialization: 'Cardiology'
    },
    {
      id: 'DOC002',
      username: 'doctor2',
      password: 'doc456',
      role: 'doctor',
      fullName: 'Dr. Sarah Johnson',
      specialization: 'Neurology'
    }
  ],
  
  // Patient credentials
  patients: [
    {
      id: 'PAT001',
      username: 'patient1',
      password: 'pat123',
      role: 'patient',
      fullName: 'Robert Williams'
    },
    {
      id: 'PAT002',
      username: 'patient2',
      password: 'pat456',
      role: 'patient',
      fullName: 'Emily Davis'
    }
  ],
  
  // Caretaker credentials
  caretakers: [
    {
      id: 'CAR001',
      username: 'caretaker1',
      password: 'care123',
      role: 'caretaker',
      fullName: 'Michael Brown'
    },
    {
      id: 'CAR002',
      username: 'caretaker2',
      password: 'care456',
      role: 'caretaker',
      fullName: 'Jennifer Wilson'
    }
  ]
};

export default credentials;
