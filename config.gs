var SHEET_CONFIG = "Config";

var Config = (function() {
  // Public members  
  var config = {};
  config = getConfig();
  return config;
  
  // Gets config values from spreadsheet
  function getConfig() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_CONFIG);
    var numRows = sheet.getLastRow();
    if (numRows == 0) return;
    var values = sheet.getRange(1, 1, numRows, 2).getValues();
    var cfg = [];
    values.forEach(function(value) {
      cfg[value[0]] = value[1];
    });
    return cfg;
  }
})()