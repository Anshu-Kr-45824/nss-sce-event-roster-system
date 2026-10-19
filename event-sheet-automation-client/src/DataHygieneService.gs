/**
 * @fileoverview Safe multi-column sorting and O(N) Roll Number duplicate removal[cite: 2].
 */

const DataHygieneService = {
  /**
   * Sorts populated rows primarily by Project (Col 1, A-Z) and secondarily by Name (Col 2, A-Z)[cite: 2].
   */
  sortByProject: function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const range = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
    range.sort([
      { column: CONFIG.COL.PROJECT, ascending: true },
      { column: CONFIG.COL.NAME, ascending: true }
    ]);

    ss.toast('Table sorted by Project.', '✅ Success', 3);
  },

  /**
   * Sorts populated rows primarily by Name (Col 2, A-Z) and secondarily by Project (Col 1, A-Z)[cite: 2].
   */
  sortByName: function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const range = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
    range.sort([
      { column: CONFIG.COL.NAME, ascending: true },
      { column: CONFIG.COL.PROJECT, ascending: true }
    ]);

    ss.toast('Table sorted by Name.', '✅ Success', 3);
  },

  /**
   * Scans Column C (Roll No) using a Set and clears duplicate entries from bottom to top
   * across Columns 1–8 while keeping Column 9 (Attendance Checkbox) intact[cite: 2].
   */
  removeDuplicates: function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    // Grab data from Column A, B, and C (Project, Name, Roll No)[cite: 2]
    const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
    const seenRolls = new Set();
    const rowsToClear = [];

    for (let i = 0; i < data.length; i++) {
      const rollNo = String(data[i][2]).trim();
      if (!rollNo) continue;

      if (seenRolls.has(rollNo)) {
        rowsToClear.push(i + 2);
      } else {
        seenRolls.add(rollNo);
      }
    }

    // Clear duplicate rows from bottom to top[cite: 2]
    for (let j = rowsToClear.length - 1; j >= 0; j--) {
      const rowNum = rowsToClear[j];
      sheet.getRange(rowNum, 1, 1, CONFIG.COL.DATA_WIDTH).clearContent().setBackground(null);
      sheet.getRange(rowNum, CONFIG.COL.NAME).clearDataValidations();
    }

    if (rowsToClear.length > 0) {
      ss.toast(`Removed ${rowsToClear.length} duplicate volunteer(s).`, '🧹 Cleanup Complete', 6);
    } else {
      ss.toast('No duplicate Roll Numbers found.', '✅ Clean', 3);
    }
  }
};