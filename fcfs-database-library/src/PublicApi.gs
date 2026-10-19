/**
 * @fileoverview Top-level global functions exposed by the FCFS_Database_2k26 library[cite: 2].
 * Client spreadsheets invoke these methods via FCFS_Database_2k26.getVolunteers()
 * and FCFS_Database_2k26.getVolunteerDetails()[cite: 2].
 */

/**
 * Returns an array of volunteer names matching the "Project_Year" selection string[cite: 2].
 * @param {string} selection - Project and year key (e.g., "Udaan_2nd")[cite: 2].
 * @returns {Array<string>} Matching volunteer names for dropdown population[cite: 2].
 */
function getVolunteers(selection) {
  return QueryService.findVolunteersBySelection(selection);
}

/**
 * Returns a 6-element metadata array for a specific volunteer in a project[cite: 2].
 * Output order: [Roll No, Phone, Gender, Domain, Hostel Name, Hostel Email][cite: 2].
 * @param {string} selection - Project and year key[cite: 2].
 * @param {string} volunteerName - Volunteer full name[cite: 2].
 * @returns {Array<*>} 6-column metadata array[cite: 2].
 */
function getVolunteerDetails(selection, volunteerName) {
  return QueryService.findVolunteerMetadata(selection, volunteerName);
}

/**
 * Legacy helper maintained for backward compatibility[cite: 2].
 * @returns {Array<Array<*>>} Raw master dataset[cite: 2].
 */
function fetchMasterData() {
  return MasterRepository.fetchAllRecords();
}