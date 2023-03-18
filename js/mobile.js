dragula([document.getElementById("food"),
document.getElementById("frozen"),
document.getElementById("refrigerated"),
document.getElementById("roomTemp")], {
    moves: function (el, source, handle, sibling) {
        //console.log(el); // listBox
        //console.log(source); // temp-box
        //console.log(handle); // 클릭한 것
        return true; // elements are always draggable by default
    },
    accepts: function (el, target, source, sibling) {
        console.log(el); 
        console.log(source); 
        console.log(target); 
        console.log(sibling);
        return true; // elements can be dropped in any of the `containers` by default
      },

});
//alertKey