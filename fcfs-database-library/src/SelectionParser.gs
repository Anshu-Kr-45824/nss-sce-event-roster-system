/**
 * @fileoverview Safely parses composite Project_Year dropdown strings (e.g., "Bandhutva_2nd")[cite: 2].
 */

const SelectionParser = {
  /**
   * Splits a selection token like "Dhara_2nd" into project name and year digit[cite: 2].
   * Includes a safety net if an invalid string without an underscore is entered[cite: 2].
   * @param {string} selection - Raw string from Column A dropdown[cite: 2].
   * @returns {{isValid: boolean, targetProject: string, targetYear: string}}
   */
  parse: function (selection) {
    if (!selection) {
      return { isValid: false, targetProject: '', targetYear: '' };
    }

    const parts = String(selection).trim().split('_');

    // SAFETY NET: If someone types a malformed string without an underscore, stop safely[cite: 2]
    if (parts.length < 2 || !parts[0] || !parts[1]) {
      return { isValid: false, targetProject: '', targetYear: '' };
    }

    return {
      isValid: true,
      targetProject: parts[0].trim(),
      targetYear: parts[1].trim().charAt(0) // Extracts '2' or '3'[cite: 2]
    };
  }
};