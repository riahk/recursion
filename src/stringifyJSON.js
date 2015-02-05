// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  //base cases for primitives (numbers, strings, booleans and null)
  if(typeof obj === 'string') {
    return '"' + obj + '"';
  }
  
  if(obj === null) {
    return 'null';
  }

  if(typeof obj === ('boolean' || 'number')) {
    return obj.toString();
  }

  //recursive cases for arrays and objects
  if(Array.isArray(obj)) {
    if(obj.length === 0) { //base case: the array is empty
      return '[]'; 
    } else {  
        var stringElems = "";
        for(var i = 0; i < obj.length; i++) {
          stringElems += stringifyJSON(obj[i]);
          if( i != obj.length - 1) {
            stringElems += ',';
          }
        }
      return '[' + stringElems + ']';
    }
  }
  
  if(typeof obj === 'object') {
    if(Object.getOwnPropertyNames(obj).length === 0) { //base case: the object is empty
      return '{}';
    } else {
        var stringElems = "";
        for(var key in obj) {
          if((typeof obj[key] === 'function') || (obj[key] === undefined)) {
          } else {
              stringElems += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
          }
        }
        stringElems = stringElems.slice(0, stringElems.length - 1); //remove final comma
        return '{' + stringElems + '}';
      }
  } else { return obj.toString(); } //this code should never be executed
};
