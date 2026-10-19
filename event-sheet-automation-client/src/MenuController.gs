/**
 * @fileoverview Binds Google Sheets UI menu items and global trigger entry points
 * to their underlying modular services[cite: 2].
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📊 Event Tools')
    .addItem('Sort by Project (A-Z)', 'sortByProject')
    .addItem('Sort by Name (A-Z)', 'sortByName')
    .addItem('🧹 Remove Duplicates', 'removeDuplicates')
    .addSeparator()
    .addItem('🎨 Apply Colors to All Rows', 'applyColorsToAll')
    .addItem('⚪ Remove All Colors', 'removeColorsFromAll')
    .addSeparator()
    .addItem('⚙️ Initialize System (Tech Team Only)', 'setupTrigger')
    .addToUi();
}

// Global Entry Points for Menus & Triggers[cite: 2]
function sortByProject() { DataHygieneService.sortByProject(); }
function sortByName() { DataHygieneService.sortByName(); }
function removeDuplicates() { DataHygieneService.removeDuplicates(); }
function applyColorsToAll() { ThemeService.applyColorsToAllRows(); }
function removeColorsFromAll() { ThemeService.removeColorsFromAllRows(); }
function applyRowColor(sheet, rowNum, selectionString) { ThemeService.applyRowColor(sheet, rowNum, selectionString); }
function setupTrigger() { TriggerInstaller.initializeSystem(); }
function systemOnEdit(e) { EditEngine.handleEdit(e); }