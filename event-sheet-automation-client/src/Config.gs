/**
 * @fileoverview Centralized configuration, column bounds, and pastel color palette
 * for the Event Sheet Automation Client[cite: 2].
 */

const CLIENT_ENV = {
  /**
   * Retrieves the External Security Audit Sheet ID from Script Properties.
   * @returns {string|null} Spreadsheet ID for the external audit log.
   */
  getAuditSheetId: function () {
    return PropertiesService.getScriptProperties().getProperty('EXTERNAL_LOG_SHEET_ID');
  }
};

const CONFIG = {
  TARGET_SHEET_NAME: 'Sheet1', // Change if your active event tab is named differently[cite: 2]
  AUDIT_LOG_TAB_NAME: 'Logs',  // Destination tab inside the external audit spreadsheet[cite: 2]
  TIMESTAMP_FORMAT: 'dd-MM-yyyy HH:mm:ss', //[cite: 2]

  // 1-Based Column Indices[cite: 2]
  COL: {
    PROJECT: 1,       // Column A: Project_Year Dropdown[cite: 2]
    NAME: 2,          // Column B: Dynamic Volunteer Name Dropdown[cite: 2]
    DETAILS_START: 3, // Column C: Start of 6 auto-filled profile columns (C to H)[cite: 2]
    DETAILS_COUNT: 6, // Columns C, D, E, F, G, H (Roll, Phone, Gender, Domain, Hostel, Email)[cite: 2]
    DATA_WIDTH: 8     // Columns 1–8 (A–H); Column 9 (Attendance) is strictly protected[cite: 2]
  },

  // Material Design Pastel Palette mapped by Project Name[cite: 2]
  PROJECT_COLORS: {
    Bandhutva: '#ffcdd2',
    Dhara:     '#e1bee7',
    Nidaan:    '#c5cae9',
    Riddhi:    '#b3e5fc',
    Sanyukt:   '#b2dfdb',
    Sparsh:    '#c8e6c9',
    Swet:      '#f0f4c3',
    Udaan:     '#ffecb3',
    Urja:      '#ffe0b2',
    Builders:  '#cfd8dc'  // Distinct Silver/Grey for Leaders[cite: 2]
  }
};