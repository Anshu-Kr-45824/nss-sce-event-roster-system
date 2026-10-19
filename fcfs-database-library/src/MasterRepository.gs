/**
 * @fileoverview Data Access Layer for reading the Master Volunteer Spreadsheet[cite: 2].
 */

const MasterRepository = {
  /**
   * Opens the Master Spreadsheet by ID and fetches all volunteer records[cite: 2].
   * Includes a safety net returning an empty array if the sheet has no data rows[cite: 2].
   * @returns {Array<Array<*>>} 2D matrix of volunteer rows (excluding header row)[cite: 2].
   */
  fetchAllRecords: function () {
    const masterId = LIB_ENV.getMasterSheetId();
    const sheet = SpreadsheetApp.openById(masterId).getActiveSheet();
    const lastRow = sheet.getLastRow();

    // SAFETY NET: If the sheet only has headers or is empty, return [] to prevent range crash[cite: 2]
    if (lastRow <= 1) {
      return [];
    }

    return sheet.getRange(2, 1, lastRow - 1, DB_SCHEMA.TOTAL_COLUMNS).getValues();
  }
};