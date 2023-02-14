
function uploadGS() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //Grab current sheet
  
    var accesstoken = sheet.getRange('H4').getValue(); //Hardcoded values for user to enter access token and course number
    var course_num = sheet.getRange('H6').getValue();
  
    listInfo = obtainResponse(course_num, accesstoken);
  
    moduleTitle = 3 //Start after Row 3
  
    for (var i of listInfo){
      var cell = sheet.getRange(moduleTitle, 1)
      cell.setValue(i[0]) //Set the titles
    
      for (var j = 0; j < Math.round(i[1]); j++){
          moduleRow = j + moduleTitle + 1
          var cell = sheet.getRange(moduleRow, 2)
          cell.setValue(i[2][j]) //Loop for the number of items in each module and print the title
        }
  
      moduleTitle += parseInt(i[1]) + 2
  
    }
    
  }
  