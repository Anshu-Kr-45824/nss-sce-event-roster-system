/**
 * @fileoverview Tech Team privilege-escalation initializer[cite: 2].
 * Installs the systemOnEdit trigger under the Tech Team's OAuth token so Reps
 * can trigger library lookups and audit logging without direct file permissions[cite: 2].
 */

const TriggerInstaller = {
  /**
   * Registers an installable onEdit trigger bound to systemOnEdit if none exists[cite: 2].
   */
  initializeSystem: function () {
    const ss = SpreadsheetApp.getActive();
    const existingTriggers = ScriptApp.getProjectTriggers();

    if (existingTriggers.length > 0) {
      SpreadsheetApp.getUi().alert(
        'Layout frozen!\n\nNote: You have already initialized the trigger on this sheet.'
      );
      return;
    }

    ScriptApp.newTrigger('systemOnEdit')
      .forSpreadsheet(ss)
      .onEdit()
      .create();

    SpreadsheetApp.getUi().alert(
      '✅ Success!\n1. Layout Frozen.\n2. System initialized under YOUR account.\n\nThe sheet is ready for the Reps.'
    );
  }
};