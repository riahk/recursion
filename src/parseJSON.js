// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
    if(json[0] === '{') { //parse string into an object
      if(json[json.length - 1] != '}') { //check for closing brace
        //throw a parse error
      }
      var parsedObject = {};
      if(json === '{}') {
        return parsedObject; //return an empty object
      }
      
      json = json.replace(/\{\s+\"/g, '{');
      json = json.replace(/\s+\}/g, '}'); 
      var trimmed = json.slice(1, json.length-1);
      trimmed = trimmed.replace(/\":\s+/g, '\":'); 
      trimmed = trimmed.replace(/,\s+\"/g, ',\"');
      var lastIndex = 0;
      var quoteCount = 0;
      var tokens = [];
      for(var i = 0; i < trimmed.length; i++) {
        if(trimmed[i] === "\"") {
          quoteCount++;
        }
        if(trimmed[i] ===',' && (quoteCount % 2 === 0)) {
          var token = trimmed.slice(lastIndex, i);
          tokens.push(token);
          lastIndex = i+1;
        }
        if(i === trimmed.length - 1) {
          var token = trimmed.slice(lastIndex, trimmed.length);
          tokens.push(token);
        }
      }
      for(var i = 0; i < tokens.length; i++) {
        var pair = tokens[i].split(/:/);
        var key = pair[0];
        key = key.slice(1, key.length-1);
        var val = pair[1];
        parsedObject[key] = parseJSON(val);
      }

      return parsedObject;
    }

    //parse array:
    if(json[0] === '[') { //parse string into an array
      if(json[json.length - 1] != ']') {
        //throw a parse error
      }
      var parsedArray = [];
      if(json === '[]') {
        return parsedArray; //return an empty array
      }
      var trimmed = json.slice(1, json.length-1);
      trimmed = trimmed.replace(/,\s+\"/, ',\"');
      var tokens = trimmed.split(/,/); //tokenize elements of the array
      for(var i = 0; i < tokens.length; i++) {
        parsedArray.push(parseJSON(tokens[i]));
      }

      return parsedArray;
    }

    //handle primitives: booleans, null, strings and numbers

    if(json === 'true') {
      return true;
    }

    if(json === 'false') {
      return false;
    }

    if(json === 'null') {
      return null;
    }

    if(json === '""') {
      return '';
    }

    if(json[0] === '"') { //check for string opener
      if(json[json.length - 1] != '"') { //if there is no string closer...
      //throw parse error
      }

      if(json[json.length - 1] === '"' && json[json.length - 2] === "\\") {
      //if it ends with a " but it's escaped...
      //throw a parse error
      }

      return json.slice(1, json.length - 1);
    } else { return Number(json); }
    
  //} //else { //throw a parse error 
};
