/**
 * @fileoverview Manages row color coding by NSS Project while protecting Column 9 (Attendance)[cite: 2].
 */

const ThemeService = {
  /**
   * Applies the project's designated pastel background color across Columns 1 to 8[cite: 2].
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Active worksheet[cite: 2].
   * @param {number} rowNum - 1-based row index[cite: 2].
   * @param {string} selectionString - Project_Year token (e.g., "Bandhutva_2nd")[cite: 2].
   */
  applyRowColor: function (sheet, rowNum, selectionString) {
    const project = String(selectionString).trim().split('_')[0];
    const hexCode = CONFIG.PROJECT_COLORS[project] || null;

    if (hexCode) {
      sheet.getRange(rowNum, 1, 1, CONFIG.COL.DATA_WIDTH).setBackground(hexCode);
    }
  },

  /**
   * Loops through all populated rows and applies project color themes[cite: 2].
   */
  applyColorsToAllRows: function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      ss.toast('No data found.', 'Empty', 3);
      return;
    }

    const projectList = sheet.getRange(2, CONFIG.COL.PROJECT, lastRow - 1, 1).getValues();

    for (let i = 0; i < projectList.length; i++) {
      const rowNum = i + 2;
      const projectSelection = projectList[i][0];
      if (projectSelection) {
        this.applyRowColor(sheet, rowNum, projectSelection);
      }
    }

    ss.toast('Colors have been applied to all rows.', '✅ Success', 3);
  },

  /**
   * Strips background colors from Columns 1–8 for clean documentation exports,
   * leaving Column 9 (Attendance Red/Green) untouched[cite: 2].
   */
  removeColorsFromAllRows: function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    sheet.getRange(2, 1, lastRow - 1, CONFIG.COL.DATA_WIDTH).setBackground(null);
    ss.toast('Colors removed for documentation.', '✅ Success', 3);
  }
};