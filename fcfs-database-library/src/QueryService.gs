/**
 * @fileoverview Core filtering logic for querying volunteers and extracting profile metadata[cite: 2].
 */

const QueryService = {
  /**
   * Filters the master dataset by Project and Year to build a list of volunteer names[cite: 2].
   * @param {string} selection - Composite token (e.g., "Sparsh_2")[cite: 2].
   * @returns {Array<string>} List of matching volunteer names[cite: 2].
   */
  findVolunteersBySelection: function (selection) {
    const parsed = SelectionParser.parse(selection);
    if (!parsed.isValid) return [];

    const data = MasterRepository.fetchAllRecords();
    const names = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const dbProject = String(row[DB_SCHEMA.COL.PROJECT]).trim();
      const dbYear = String(row[DB_SCHEMA.COL.YEAR]).trim();

      if (dbProject === parsed.targetProject && dbYear.includes(parsed.targetYear)) {
        names.push(String(row[DB_SCHEMA.COL.NAME]).trim());
      }
    }

    return names;
  },

  /**
   * Finds a specific volunteer within a project and returns their 6 profile attributes[cite: 2].
   * @param {string} selection - Composite token (e.g., "Sparsh_2")[cite: 2].
   * @param {string} volunteerName - Selected volunteer's full name[cite: 2].
   * @returns {Array<*>} [Roll No, Phone, Gender, Domain, Hostel Name, Hostel Email] or [][cite: 2].
   */
  findVolunteerMetadata: function (selection, volunteerName) {
    const parsed = SelectionParser.parse(selection);
    if (!parsed.isValid || !volunteerName) return [];

    const targetName = String(volunteerName).trim();
    const data = MasterRepository.fetchAllRecords();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const dbName = String(row[DB_SCHEMA.COL.NAME]).trim();
      const dbProject = String(row[DB_SCHEMA.COL.PROJECT]).trim();

      if (dbName === targetName && dbProject === parsed.targetProject) {
        return [
          row[DB_SCHEMA.COL.ROLL_NO],
          row[DB_SCHEMA.COL.PHONE],
          row[DB_SCHEMA.COL.GENDER],
          row[DB_SCHEMA.COL.DOMAIN],
          row[DB_SCHEMA.COL.HOSTEL_NAME],
          row[DB_SCHEMA.COL.HOSTEL_EMAIL]
        ];
      }
    }

    return [];
  }
};