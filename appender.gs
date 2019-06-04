var Appender = (function() {
  // Public members  
  var appender = {};
  appender.append = append;
  return appender;
  
  // Private members
  function append(sheetName, data) {
    var values = buildTable(data.items);
    var sheet = getSheetReference(sheetName);
    sheet.clear();
    sheet.appendRow(data.headers);
    for (var i=0; i<values.length; i++) {
      sheet.appendRow(values[i]);
    }
  }
  
  // Returns a table based on the data specified
  function buildTable(items) {
    var values = [];
    var row = [];
    for (var i=0; i<items.length; i++) {
      row = [];
      for (var j in items[i]) {
        row.push(items[i][j]);
      }
      values.push(row);
    }
    return values;
  }
  
  // Returns a reference to the active sheet
  function getSheetReference(sheetName) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return spreadsheet.getSheetByName(sheetName);
  }
})()