// Test script to verify login functionality
import mockDataService from '../services/mockDataService';

// Initialize mock data
mockDataService.initializeData();

// Test doctor login
const testDoctorLogin = async () => {
  try {
    const result = await mockDataService.auth.login('doctor1', 'doc123', 'doctor');
    console.log('Doctor login successful:', result.user);
    console.log('Doctor has professionalDetails:', !!result.user.professionalDetails);
    console.log('Doctor has contactInfo:', !!result.user.contactInfo);
    console.log('Doctor has employmentDetails:', !!result.user.employmentDetails);
  } catch (error) {
    console.error('Doctor login failed:', error);
  }
};

// Test patient login
const testPatientLogin = async () => {
  try {
    const result = await mockDataService.auth.login('patient1', 'pat123', 'patient');
    console.log('Patient login successful:', result.user);
    console.log('Patient has healthInfo:', !!result.user.healthInfo);
    console.log('Patient has contactInfo:', !!result.user.contactInfo);
    console.log('Patient has emergencyContact:', !!result.user.emergencyContact);
  } catch (error) {
    console.error('Patient login failed:', error);
  }
};

// Test caretaker login
const testCaretakerLogin = async () => {
  try {
    const result = await mockDataService.auth.login('caretaker1', 'care123', 'caretaker');
    console.log('Caretaker login successful:', result.user);
    console.log('Caretaker has skillsAndExperience:', !!result.user.skillsAndExperience);
    console.log('Caretaker has contactInfo:', !!result.user.contactInfo);
    console.log('Caretaker has employmentDetails:', !!result.user.employmentDetails);
  } catch (error) {
    console.error('Caretaker login failed:', error);
  }
};

// Run tests
const runTests = async () => {
  console.log('Running login tests...');
  await testDoctorLogin();
  await testPatientLogin();
  await testCaretakerLogin();
  console.log('Login tests completed.');
};

export default runTests;
