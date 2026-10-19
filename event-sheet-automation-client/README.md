# 📊 Event Sheet Automation Client & Security Auditor

![Runtime](https://img.shields.io/badge/Google%20Apps%20Script-V8%20Engine-4285F4?style=for-the-badge&logo=google)
![Library](https://img.shields.io/badge/Linked%20Library-FCFS__Database__2k26-8E24AA?style=for-the-badge)
![Audit](https://img.shields.io/badge/Audit%20Trail-Real--Time%20External%20Log-critical?style=for-the-badge)

The spreadsheet-bound client engine for **NSS SCE, KIIT** event rosters[cite: 2]. It links to the `FCFS_Database_2k26` library to power real-time cascading dropdowns, automatic 6-column volunteer detail hydration, project-specific row coloring, O(N) duplicate cleanup, and silent external security auditing[cite: 2].

---

## 🏗️ Real-Time `systemOnEdit` Workflow

```mermaid
flowchart TD
    A[User Edits Sheet1] --> B{Which Column Changed?}
    B -->|Col A: Project_Year| C[Loop Over Edited Rows]
    C --> D[Clear Col B Validation & Col C-H Details]
    D --> E{Project Selected?}
    E -->|Yes| F[ThemeService.gs: Apply Pastel Row Color Col 1-8]
    F --> G[Call FCFS_Database_2k26.getVolunteers]
    G --> H[Inject Dropdown Validation into Col B]
    H --> I[Queue 'Assigned Project' Audit Log]
    E -->|No: Cleared| J[Reset Row Background & Queue 'Removed Project' Log]

    B -->|Col B: Volunteer Name| K{Name Selected?}
    K -->|Yes| L[Call FCFS_Database_2k26.getVolunteerDetails]
    L --> M[Auto-Fill Col C-H: Roll, Phone, Gender, Domain, Hostel, Email]
    M --> N[Queue 'Added Name' Audit Log]
    K -->|No: Cleared| O[Clear Col C-H & Queue 'Removed Name' Log]

    I --> P[AuditLogger.gs: Flush 6-Column Logs to External Sheet]
    J --> P
    N --> P
    O --> P
```

---

## 🎨 Project Color Palette (`ThemeService.gs`)

| Project Name | Hex Code | Visual Swatch |
| :--- | :--- | :--- |
| **Bandhutva** | `#ffcdd2` | Soft Red[cite: 2] |
| **Dhara** | `#e1bee7` | Lavender Purple[cite: 2] |
| **Nidaan** | `#c5cae9` | Indigo Tint[cite: 2] |
| **Riddhi** | `#b3e5fc` | Sky Blue[cite: 2] |
| **Sanyukt** | `#b2dfdb` | Teal Mint[cite: 2] |
| **Sparsh** | `#c8e6c9` | Pastel Green[cite: 2] |
| **Swet** | `#f0f4c3` | Lime Cream[cite: 2] |
| **Udaan** | `#ffecb3` | Warm Amber[cite: 2] |
| **Urja** | `#ffe0b2` | Soft Orange[cite: 2] |
| **Builders** | `#cfd8dc` | Distinct Silver/Grey (Leaders)[cite: 2] |

---

## 🔐 Required Script Property

In the Google Apps Script editor for the Event Sheet, open **Project Settings (⚙️) → Script Properties** and register:

| Property Key | Description |
| :--- | :--- |
| `EXTERNAL_LOG_SHEET_ID` | The Google Spreadsheet ID of the external security audit workbook containing a `Logs` tab[cite: 2]. |