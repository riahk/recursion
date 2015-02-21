// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var nodes = [];
  var checkChildren = function(element) { //check whether the element has children with the class
    var classes = element.classList;
    if((classes != undefined) && classes.contains(className)) { 
      //check whether element has the class
      nodes.push(element);
    }
    //check all of its children:
    var children = element.childNodes;
    if(children.length > 0) {
      for(var i = 0; i < children.length; i++) {
        var node = children[i];
        checkChildren(node);
      }
    } //else { return; }
  }
  checkChildren(document.body);
  return nodes;
};
