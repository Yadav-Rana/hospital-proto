/**
 * Storage Service
 * Handles localStorage operations for the application
 */

// Storage keys
const STORAGE_KEYS = {
  DOCTORS: 'hms_doctors',
  PATIENTS: 'hms_patients',
  CARETAKERS: 'hms_caretakers',
  ASSIGNMENTS: 'hms_assignments',
  MEDICAL_REPORTS: 'hms_medical_reports',
  USER: 'user' // Keep the existing key for user authentication
};

/**
 * Initialize the local storage with mock data if it doesn't exist
 * @param {Object} mockData - The mock data to initialize with
 */
const initializeStorage = (mockData) => {
  // Only initialize if data doesn't exist
  if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(mockData.doctors));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(mockData.patients));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CARETAKERS)) {
    localStorage.setItem(STORAGE_KEYS.CARETAKERS, JSON.stringify(mockData.caretakers));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(mockData.assignments));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.MEDICAL_REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.MEDICAL_REPORTS, JSON.stringify(mockData.medicalReports));
  }
};

/**
 * Get all items of a specific type
 * @param {string} key - The storage key
 * @returns {Array} - The array of items
 */
const getAll = (key) => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

/**
 * Get a specific item by ID
 * @param {string} key - The storage key
 * @param {string} id - The item ID
 * @returns {Object|null} - The item or null if not found
 */
const getById = (key, id) => {
  const items = getAll(key);
  return items.find(item => item.id === id) || null;
};

/**
 * Add a new item
 * @param {string} key - The storage key
 * @param {Object} item - The item to add
 * @returns {Object} - The added item
 */
const add = (key, item) => {
  const items = getAll(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
  return item;
};

/**
 * Update an existing item
 * @param {string} key - The storage key
 * @param {string} id - The item ID
 * @param {Object} updatedItem - The updated item
 * @returns {Object|null} - The updated item or null if not found
 */
const update = (key, id, updatedItem) => {
  const items = getAll(key);
  const index = items.findIndex(item => item.id === id);
  
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    localStorage.setItem(key, JSON.stringify(items));
    return items[index];
  }
  
  return null;
};

/**
 * Remove an item
 * @param {string} key - The storage key
 * @param {string} id - The item ID
 * @returns {boolean} - True if removed, false otherwise
 */
const remove = (key, id) => {
  const items = getAll(key);
  const filteredItems = items.filter(item => item.id !== id);
  
  if (filteredItems.length !== items.length) {
    localStorage.setItem(key, JSON.stringify(filteredItems));
    return true;
  }
  
  return false;
};

/**
 * Filter items based on a predicate function
 * @param {string} key - The storage key
 * @param {Function} predicate - The filter function
 * @returns {Array} - The filtered items
 */
const filter = (key, predicate) => {
  const items = getAll(key);
  return items.filter(predicate);
};

// Export the storage service
const storageService = {
  STORAGE_KEYS,
  initializeStorage,
  getAll,
  getById,
  add,
  update,
  remove,
  filter
};

export default storageService;
