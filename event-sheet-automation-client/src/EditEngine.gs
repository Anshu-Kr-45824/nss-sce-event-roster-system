/**
 * @fileoverview Core event-driven automation controller triggered on spreadsheet edits[cite: 2].
 * Orchestrates cascading dropdowns, library lookups, row coloring, and external auditing[cite: 2].
 */

const EditEngine = {
  /**
   * Handles single and bulk edits across Column A (Project) and Column B (Volunteer Name)[cite: 2].
   * @param {GoogleAppsScript.Events.SheetsOnEdit} e - Installable onEdit event object[cite: 2].
   */
  handleEdit: function (e) {
    try {
      if (!e || !e.range) return;
      const sheet = e.source.getActiveSheet();
      if (sheet.getName() !== CONFIG.TARGET_SHEET_NAME) return;

      const row = e.range.getRow();
      const col = e.range.getColumn();
      const numRows = e.range.getNumRows();

      if (row < 2) return; // Ignore header row[cite: 2]

      const timestamp = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        CONFIG.TIMESTAMP_FORMAT
      );
      const sourceSheetName = e.source.getName();
      const sourceSheetUrl = e.source.getUrl();
      const editorEmail = AuditLogger.resolveEditorEmail(e);
      const logsToAdd = [];

      // --- COLUMN A: PROJECT SELECTION (Supports single edit & bulk copy-paste) ---[cite: 2]
      if (col === CONFIG.COL.PROJECT && numRows >= 1) {
        const values = e.range.getValues();

        for (let i = 0; i < numRows; i++) {
          const currentRow = row + i;
          const projectSelection = values[i][0];
          const nameCell = sheet.getRange(currentRow, CONFIG.COL.NAME);

          nameCell.clearDataValidations();
          nameCell.clearContent();
          sheet.getRange(currentRow, CONFIG.COL.DETAILS_START, 1, CONFIG.COL.DETAILS_COUNT).clearContent();

          if (projectSelection) {
            ThemeService.applyRowColor(sheet, currentRow, projectSelection);
            const volunteers = FCFS_Database_2k26.getVolunteers(projectSelection);

            if (volunteers.length > 0) {
              const rule = SpreadsheetApp.newDataValidation()
                .requireValueInList(volunteers, true)
                .build();
              nameCell.setDataValidation(rule);
            } else {
              nameCell.setValue('No data');
            }

            logsToAdd.push(
              AuditLogger.createEntry(
                timestamp,
                editorEmail,
                'Assigned Project',
                `Row ${currentRow}: Set to '${projectSelection}'`,
                sourceSheetName,
                sourceSheetUrl
              )
            );
          } else {
            sheet.getRange(currentRow, 1, 1, CONFIG.COL.DATA_WIDTH).setBackground(null);
            logsToAdd.push(
              AuditLogger.createEntry(
                timestamp,
                editorEmail,
                'Removed Project',
                `Row ${currentRow}: Cleared Project`,
                sourceSheetName,
                sourceSheetUrl
              )
            );
          }
        }
      }

      // --- COLUMN B: VOLUNTEER NAME SELECTION ---[cite: 2]
      if (col === CONFIG.COL.NAME && numRows === 1) {
        const project = sheet.getRange(row, CONFIG.COL.PROJECT).getValue();
        const name = e.value;

        if (!name) {
          sheet.getRange(row, CONFIG.COL.DETAILS_START, 1, CONFIG.COL.DETAILS_COUNT).clearContent();
          logsToAdd.push(
            AuditLogger.createEntry(
              timestamp,
              editorEmail,
              'Removed Name',
              `Row ${row}: Removed Volunteer`,
              sourceSheetName,
              sourceSheetUrl
            )
          );
        } else if (project) {
          const details = FCFS_Database_2k26.getVolunteerDetails(project, name);

          if (details.length > 0) {
            sheet.getRange(row, CONFIG.COL.DETAILS_START, 1, details.length).setValues([details]);
            logsToAdd.push(
              AuditLogger.createEntry(
                timestamp,
                editorEmail,
                'Added Name',
                `Row ${row}: Assigned '${name}' to ${project}`,
                sourceSheetName,
                sourceSheetUrl
              )
            );
          }
        }
      }

      // --- PUSH AUDIT LOGS TO EXTERNAL SHEET ---[cite: 2]
      AuditLogger.flushLogs(logsToAdd);
    } catch (error) {
      SpreadsheetApp.getActiveSpreadsheet().toast(String(error.message), '❌ CRASH REPORT', 10);
    }
  }
};