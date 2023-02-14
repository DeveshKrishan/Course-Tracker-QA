
function obtainResponse(course_num, accesstoken){

    headers = {
      'Authorization' : 'Bearer '+ accesstoken
    }
  
    var url = 'https://canvas.eee.uci.edu/api/v1/courses/' + course_num + '/modules' + "?per_page=100"; //limit to finding a 100 modules in a course. If a course has more than 100 modules, you can increase this number.
    var response = UrlFetchApp.fetch(url, {headers:headers});
    var data =  (response.getHeaders());
  
    //Grabbing all possible links to the modules
    listOfLinks = [];
    responseString = '';
  
    for (var key in data) {
        if (key === 'Link'){
          responseString = data[key];
        }
      }
  
    responseString = responseString.split(",");
  
    for (var i in responseString){
      if (responseString[i].includes('current')){
        responseStringCut = responseString[i].split(";")[0];
        listOfLinks.push(responseStringCut.slice(1, responseStringCut.length - 1));
  
      }
    }
  
    moduleIconArray = [];
  
    for (var url of listOfLinks){
      reply = JSON.parse(UrlFetchApp.fetch(url, {headers:headers}).getContentText()); //GET Request for each link
      //Grabbing all useful items in JSON response such as the name, number of items in each module, and the URL for each
      for (var module of reply){
        tempList = [];
        text = JSON.parse(UrlFetchApp.fetch((module['items_url'] + "?per_page=100"), {headers:headers}).getContentText()); //limit to 100 module items per module. Feel free to increase this ?per+page = x if needed. 
  
        for (var title of text){
          tempList.push(title['title']); //Title for each page inside each module
        }
        moduleIconArray.push([module['name'], module['items_count'], tempList])
  
      }
  
    }
  
    return moduleIconArray
  
  
  }
  
  
  
  
  
  