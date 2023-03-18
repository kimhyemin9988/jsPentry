let draggedElement;
let prevBox;
let nextBox;

dragula([document.getElementById("food"),
document.getElementById("frozen"),
document.getElementById("refrigerated"),
document.getElementById("roomTemp")], {
    moves: function (el, source, handle, sibling) {
        draggedElement = el;
        prevBox = source.id;
        return true;
    },
}).on("drop", function(el) {
    nextBox = el.closest(".temp-box").id;
    alertKey(draggedElement,prevBox,nextBox);
})
