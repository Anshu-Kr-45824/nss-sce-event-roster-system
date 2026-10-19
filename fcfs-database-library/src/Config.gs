/**
 * @fileoverview Configuration and schema mapping for the FCFS_Database_2k26 Library[cite: 2].
 * The Master Database Spreadsheet ID is retrieved securely from Script Properties.
 */

const LIB_ENV = {
  /**
   * Retrieves the restricted Master Volunteer Spreadsheet ID from Script Properties.
   * @returns {string} Google Spreadsheet ID.
   */
  getMasterSheetId: function () {
    const id = PropertiesService.getScriptProperties().getProperty('MASTER_SHEET_ID');
    if (!id) {
      throw new Error('Missing Script Property: MASTER_SHEET_ID in FCFS_Database_2k26 library.');
    }
    return id;
  }
};

const DB_SCHEMA = {
  TOTAL_COLUMNS: 9,
  // 0-Based Column Indices in Master Volunteer Sheet[cite: 2]
  COL: {
    NAME: 0,          // Column A: Volunteer Full Name[cite: 2]
    ROLL_NO: 1,       // Column B: University Roll Number[cite: 2]
    PHONE: 2,         // Column C: Contact Number[cite: 2]
    YEAR: 3,          // Column D: Academic Year (e.g., 2nd Year, 3rd Year)[cite: 2]
    GENDER: 4,        // Column E: Gender[cite: 2]
    DOMAIN: 5,        // Column F: Functional Domain[cite: 2]
    PROJECT: 6,       // Column G: Assigned NSS Project[cite: 2]
    HOSTEL_NAME: 7,   // Column H: Hostel Identifier[cite: 2]
    HOSTEL_EMAIL: 8   // Column I: Warden / Hostel Official Email[cite: 2]
  }
};