/**
 * @fileoverview Handles user identity resolution and silent external audit logging[cite: 2].
 */

const AuditLogger = {
  /**
   * Extracts the active editor's email address from the trigger event or session[cite: 2].
   * @param {GoogleAppsScript.Events.SheetsOnEdit} e - Edit trigger event payload[cite: 2].
   * @returns {string} Editor's email address or "Unknown User"[cite: 2].
   */
  resolveEditorEmail: function (e) {
    if (e && e.user && e.user.getEmail()) {
      return e.user.getEmail();
    }
    try {
      return Session.getActiveUser().getEmail() || 'Unknown User';
    } catch (err) {
      return 'Unknown User';
    }
  },

  /**
   * Formats a 6-column log entry array[cite: 2].
   * @param {string} timestamp - Formatted timestamp (dd-MM-yyyy HH:mm:ss)[cite: 2].
   * @param {string} editorEmail - User email[cite: 2].
   * @param {string} action - Action category (e.g., "Assigned Project", "Added Name")[cite: 2].
   * @param {string} details - Row and value description[cite: 2].
   * @param {string} sheetName - Source Spreadsheet title[cite: 2].
   * @param {string} sheetUrl - Source Spreadsheet URL[cite: 2].
   * @returns {Array<string>} 6-element row array[cite: 2].
   */
  createEntry: function (timestamp, editorEmail, action, details, sheetName, sheetUrl) {
    return [timestamp, editorEmail, action, details, sheetName, sheetUrl];
  },

  /**
   * Pushes accumulated log entries to the external audit spreadsheet[cite: 2].
   * Fails silently if the user lacks permission, preventing UI interruptions for Reps[cite: 2].
   * @param {Array<Array<string>>} logsToAdd - Matrix of 6-column log rows[cite: 2].
   */
  flushLogs: function (logsToAdd) {
    if (!logsToAdd || logsToAdd.length === 0) return;

    try {
      const auditSheetId = CLIENT_ENV.getAuditSheetId();
      if (!auditSheetId) return;

      const extSheet = SpreadsheetApp.openById(auditSheetId).getSheetByName(CONFIG.AUDIT_LOG_TAB_NAME);
      if (extSheet) {
        extSheet
          .getRange(extSheet.getLastRow() + 1, 1, logsToAdd.length, 6)
          .setValues(logsToAdd);
      }
    } catch (logError) {
      // Fails silently if no access, preventing crashes for Reps[cite: 2]
    }
  }
};